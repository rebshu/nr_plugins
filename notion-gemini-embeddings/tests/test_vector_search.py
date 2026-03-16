from src.retrieval.similarity_ranker import rank_results


def test_rank_results_desc():
    ranked = rank_results([{"similarity": 0.2}, {"similarity": 0.9}])
    assert ranked[0]["similarity"] == 0.9

