from src.monitoring.alert_manager import Alert, should_alert


def test_alert_triggering():
    assert should_alert(Alert(name="budget", threshold=10, current=10))
    assert not should_alert(Alert(name="budget", threshold=10, current=9))

