import argparse
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.express as px
import umap

from src.config import settings
from src.db.connection import get_conn


def _parse_embedding(raw_embedding: object) -> np.ndarray:
    if isinstance(raw_embedding, np.ndarray):
        return raw_embedding.astype(np.float32)
    if isinstance(raw_embedding, (list, tuple)):
        return np.asarray(raw_embedding, dtype=np.float32)
    if isinstance(raw_embedding, str):
        cleaned = raw_embedding.strip().strip("[]")
        if not cleaned:
            raise ValueError("Encountered empty embedding vector.")
        return np.fromstring(cleaned, sep=",", dtype=np.float32)
    raise TypeError(f"Unsupported embedding type: {type(raw_embedding).__name__}")


def _fetch_embedding_rows(limit: int) -> list[dict]:
    query = """
        SELECT
            d.id AS document_id,
            d.title AS document_title,
            c.id AS chunk_id,
            c.content AS chunk_content,
            e.embedding::text AS embedding_text
        FROM embeddings e
        JOIN chunks c ON c.id = e.chunk_id
        JOIN documents d ON d.id = c.document_id
        ORDER BY e.created_at DESC
        LIMIT %s
    """
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(query, (limit,))
            rows = cur.fetchall()
    return [
        {
            "document_id": row[0],
            "document_title": row[1],
            "chunk_id": row[2],
            "chunk_content": row[3],
            "embedding_text": row[4],
        }
        for row in rows
    ]


def _build_dataframe(rows: list[dict], max_hover_chars: int) -> tuple[pd.DataFrame, np.ndarray]:
    vectors = np.vstack([_parse_embedding(row["embedding_text"]) for row in rows])
    df = pd.DataFrame(rows)
    df["chunk_preview"] = df["chunk_content"].fillna("").str.slice(0, max_hover_chars)
    return df, vectors


def _project_umap(
    vectors: np.ndarray,
    n_neighbors: int,
    min_dist: float,
    metric: str,
    random_state: int,
) -> np.ndarray:
    reducer = umap.UMAP(
        n_components=2,
        n_neighbors=n_neighbors,
        min_dist=min_dist,
        metric=metric,
        random_state=random_state,
    )
    return reducer.fit_transform(vectors)


def _build_plot(df: pd.DataFrame, color_by: str, title: str):
    color_column = "document_title" if color_by == "document" else None
    fig = px.scatter(
        df,
        x="x",
        y="y",
        color=color_column,
        hover_data={
            "document_id": True,
            "document_title": True,
            "chunk_id": True,
            "chunk_preview": True,
            "x": False,
            "y": False,
        },
        title=title,
        render_mode="webgl",
    )
    fig.update_traces(marker={"size": 7, "opacity": 0.85})
    fig.update_layout(xaxis_title="UMAP-1", yaxis_title="UMAP-2")
    return fig


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Project pgvector embeddings to 2D with UMAP and render an interactive Plotly HTML file."
    )
    parser.add_argument("--limit", type=int, default=2000, help="Maximum number of embeddings to load from PostgreSQL.")
    parser.add_argument("--n-neighbors", type=int, default=15, help="UMAP neighborhood size.")
    parser.add_argument("--min-dist", type=float, default=0.1, help="UMAP minimum distance.")
    parser.add_argument("--metric", default="cosine", help="UMAP distance metric.")
    parser.add_argument(
        "--color-by",
        choices=["document", "none"],
        default="document",
        help="Color points by document title or disable coloring.",
    )
    parser.add_argument("--random-state", type=int, default=42, help="UMAP random seed for reproducible output.")
    parser.add_argument("--max-hover-chars", type=int, default=180, help="Maximum chunk preview length in hover text.")
    parser.add_argument("--output-html", default="embedding_map.html", help="Path to write the interactive HTML file.")
    args = parser.parse_args()

    if args.limit < 3:
        raise ValueError("--limit must be at least 3 to compute a stable UMAP projection.")
    if args.n_neighbors < 2:
        raise ValueError("--n-neighbors must be at least 2.")

    rows = _fetch_embedding_rows(limit=args.limit)
    if len(rows) < 3:
        raise ValueError(
            f"Need at least 3 embeddings to visualize, found {len(rows)}. Run ingestion first or increase --limit."
        )

    safe_neighbors = min(args.n_neighbors, len(rows) - 1)
    df, vectors = _build_dataframe(rows=rows, max_hover_chars=args.max_hover_chars)
    projection = _project_umap(
        vectors=vectors,
        n_neighbors=safe_neighbors,
        min_dist=args.min_dist,
        metric=args.metric,
        random_state=args.random_state,
    )
    df["x"] = projection[:, 0]
    df["y"] = projection[:, 1]

    fig = _build_plot(
        df=df,
        color_by=args.color_by,
        title=f"Embedding Map ({len(rows)} points, model={settings.embedding_model})",
    )

    output_path = Path(args.output_html)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fig.write_html(output_path, include_plotlyjs="cdn")
    print(f"Wrote embedding map to {output_path.resolve()}")


if __name__ == "__main__":
    main()
