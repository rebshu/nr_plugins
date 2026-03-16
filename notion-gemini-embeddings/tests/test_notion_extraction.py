from src.notion.extractor import content_hash


def test_content_hash_is_deterministic():
    assert content_hash("abc") == content_hash("abc")
    assert content_hash("abc") != content_hash("abcd")

