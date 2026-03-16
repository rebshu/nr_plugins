from src.tasks.cloud_tasks_client import create_test_task


def test_create_test_task_shape():
    payload = create_test_task()
    assert "task" in payload
    assert payload["task"]["stage"] == "extract"

