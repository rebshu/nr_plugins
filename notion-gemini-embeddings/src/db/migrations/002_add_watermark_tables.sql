CREATE TABLE IF NOT EXISTS watermarks (
  document_id TEXT PRIMARY KEY REFERENCES documents(id) ON DELETE CASCADE,
  last_processed_edited_time TIMESTAMPTZ NOT NULL,
  last_processed_hash TEXT NOT NULL,
  last_embedded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
