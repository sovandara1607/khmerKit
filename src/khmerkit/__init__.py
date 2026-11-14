"""KhmerKit's small, reproducible text/search building blocks."""

from .normalize import NormalizationResult, normalize_text
from .provenance import ProvenanceRecord, load_provenance
from .search import CharNgramSearch, ExactSearch, SearchResult

__all__ = [
    "CharNgramSearch",
    "ExactSearch",
    "NormalizationResult",
    "ProvenanceRecord",
    "SearchResult",
    "load_provenance",
    "normalize_text",
]
