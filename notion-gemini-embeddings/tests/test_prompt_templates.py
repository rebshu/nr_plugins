from src.prompts.template_manager import render_template


def test_render_template():
    rendered = render_template("Q: {query}", {"query": "hello"})
    assert rendered == "Q: hello"

