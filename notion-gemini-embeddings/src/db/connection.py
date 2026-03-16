from contextlib import contextmanager

import psycopg2

from src.config import settings


@contextmanager
def get_conn():
    conn = psycopg2.connect(settings.pg_dsn)
    try:
        yield conn
    finally:
        conn.close()

