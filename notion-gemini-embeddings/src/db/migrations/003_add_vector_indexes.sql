CREATE INDEX IF NOT EXISTS idx_embeddings_hnsw
ON embeddings
USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_chunks_document_id
ON chunks (document_id);
