from khmerkit.normalize import normalize_text


def test_pheasa_reorders_visually_equivalent_khmer_sequences():
    assert normalize_text("ខែ្មរ").text == normalize_text("ខ្មែរ").text


def test_normalize_folds_whitespace_and_latin_case():
    assert normalize_text("  API\nDocs  ").text == "api docs"

