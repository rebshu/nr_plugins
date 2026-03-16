from src.processing.incremental_processor import run_incremental


def handle_extract_and_embed(database_id: str, dry_run: bool = False) -> dict[str, int]:
    return run_incremental(database_id=database_id, dry_run=dry_run)

