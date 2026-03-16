from src.processing.watermark_tracker import should_reprocess


def test_incremental_processor_importable():
    assert callable(should_reprocess)

