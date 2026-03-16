from src.validation.embedding_quality_tester import evaluate_golden_dataset


def test_golden_dataset_eval():
    result = evaluate_golden_dataset("tests/golden_dataset.json")
    assert result["queries"] == 2
    assert result["p_at_5"] >= 0

