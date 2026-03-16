from unittest.mock import patch

from src.orchestration.pipeline_orchestrator import run_pipeline


def test_orchestration_returns_success():
    with patch("src.orchestration.pipeline_orchestrator.run_incremental") as mock_run:
        mock_run.return_value = {"seen": 1, "processed": 1, "skipped": 0}
        result = run_pipeline(database_id="", dry_run=True)
        assert result["status"] == "success"

