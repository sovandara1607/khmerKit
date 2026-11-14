"""Validation for dataset provenance records."""

from dataclasses import dataclass
import csv
from pathlib import Path


REQUIRED_COLUMNS = frozenset(
    {
        "record_id",
        "asset_path",
        "source_url",
        "source_title",
        "source_revision_id",
        "publisher",
        "license",
        "license_url",
        "rights_status",
        "collected_at",
        "content_sha256",
        "redistributable",
        "notes",
    }
)


@dataclass(frozen=True)
class ProvenanceRecord:
    record_id: str
    asset_path: str
    source_url: str
    source_title: str
    source_revision_id: str
    publisher: str
    license: str
    license_url: str
    rights_status: str
    collected_at: str
    content_sha256: str
    redistributable: bool
    notes: str


def load_provenance(path: Path) -> list[ProvenanceRecord]:
    """Load and validate a provenance CSV before a dataset is published."""

    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        columns = frozenset(reader.fieldnames or ())
        missing = REQUIRED_COLUMNS - columns
        if missing:
            raise ValueError(f"missing provenance columns: {', '.join(sorted(missing))}")

        records = []
        seen_ids = set()
        for line_number, row in enumerate(reader, start=2):
            record_id = row["record_id"].strip()
            if not record_id:
                raise ValueError(f"line {line_number}: record_id is required")
            if record_id in seen_ids:
                raise ValueError(f"line {line_number}: duplicate record_id {record_id}")
            seen_ids.add(record_id)

            required_values = [
                row[column].strip()
                for column in REQUIRED_COLUMNS
                if column not in {"redistributable", "notes", "source_revision_id"}
            ]
            if any(not value for value in required_values):
                raise ValueError(f"line {line_number}: required provenance value is empty")

            redistributable = row["redistributable"].strip().lower()
            if redistributable not in {"true", "false"}:
                raise ValueError(
                    f"line {line_number}: redistributable must be true or false"
                )

            records.append(
                ProvenanceRecord(
                    record_id=record_id,
                    asset_path=row["asset_path"].strip(),
                    source_url=row["source_url"].strip(),
                    source_title=row["source_title"].strip(),
                    source_revision_id=row["source_revision_id"].strip(),
                    publisher=row["publisher"].strip(),
                    license=row["license"].strip(),
                    license_url=row["license_url"].strip(),
                    rights_status=row["rights_status"].strip(),
                    collected_at=row["collected_at"].strip(),
                    content_sha256=row["content_sha256"].strip(),
                    redistributable=redistributable == "true",
                    notes=row["notes"].strip(),
                )
            )
        return records


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Validate a KhmerKit provenance CSV")
    parser.add_argument("path", type=Path)
    args = parser.parse_args()
    records = load_provenance(args.path)
    print(f"validated {len(records)} provenance record(s)")
