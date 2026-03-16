from unittest.mock import patch

from src.db.connection import get_conn


def test_db_connection_uses_settings_dsn():
    with patch("src.db.connection.psycopg2.connect") as mock_connect:
        mock_connect.return_value.close.return_value = None
        with get_conn():
            pass
        assert mock_connect.called

