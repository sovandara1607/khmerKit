from pathlib import Path

from khmerkit.provenance import load_provenance


def test_repository_provenance_record_is_valid():
    records = load_provenance(Path("data/provenance.csv"))
    assert len(records) == 1
    assert records[0].record_id == "synthetic-starter"
    assert records[0].redistributable is True
