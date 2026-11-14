from pathlib import Path
import hashlib
import json

from khmerkit.provenance import load_provenance


def test_repository_provenance_record_is_valid():
    records = load_provenance(Path("data/provenance.csv"))
    synthetic = next(record for record in records if record.record_id == "synthetic-starter")
    assert len(records) == 21
    assert synthetic.redistributable is True
    assert synthetic.source_revision_id == ""


def test_real_corpus_rows_match_document_hashes():
    records = load_provenance(Path("data/provenance.csv"))
    real_records = [record for record in records if record.record_id.startswith("wiki-")]
    documents = {
        row["id"]: row
        for row in (
            json.loads(line)
            for line in Path("data/real/documents.jsonl").read_text(encoding="utf-8").splitlines()
        )
    }

    assert len(real_records) == 20
    assert len(documents) == len(real_records)
    for record in real_records:
        document = documents[record.record_id]
        digest = hashlib.sha256(document["text"].encode("utf-8")).hexdigest()
        assert record.content_sha256 == f"sha256:{digest}"
        assert record.redistributable is True
        assert record.source_url.startswith("https://km.wikipedia.org/wiki/")
