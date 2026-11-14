from khmerkit.evaluate import QueryCase, evaluate
from khmerkit.search import CharNgramSearch, ExactSearch, SearchIndex


DOCS = [
    ("a", "ខ្មែរ សាលា"),
    ("b", "ខ្មែរ បណ្ណាល័យ"),
    ("c", "English library"),
]


def test_exact_normalized_search_returns_relevant_document():
    results = ExactSearch(DOCS, normalize=True).search("បណ្ណាល័យ", k=1)
    assert results[0].doc_id == "b"


def test_char_search_handles_mixed_script():
    results = CharNgramSearch(DOCS).search("library", k=1)
    assert results[0].doc_id == "c"


def test_evaluation_reports_hit_rate_and_mrr():
    cases = [QueryCase("q", "បណ្ណាល័យ", frozenset({"b"}))]
    report = evaluate(cases, ExactSearch(DOCS, normalize=True))
    assert report.hit_rate_at_3 == 1.0
    assert report.mean_reciprocal_rank == 1.0


def test_search_index_defaults_to_normalized_character_retrieval():
    results = SearchIndex(DOCS).search("library", k=1)
    assert results[0].doc_id == "c"
