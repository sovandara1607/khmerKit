"""KhmerKit: small, reproducible Khmer text normalization and search toolkit."""

__version__ = "0.1.1"

from .normalize import NormalizationResult, normalize_text
from .provenance import ProvenanceRecord, load_provenance
from .data import load_documents
from .search import CharNgramSearch, ExactSearch, SearchIndex, SearchResult, SegmentedSearch

__all__ = [
    "__version__",
    "CharNgramSearch",
    "ExactSearch",
    "NormalizationResult",
    "ProvenanceRecord",
    "SearchResult",
    "SearchIndex",
    "SegmentedSearch",
    "load_provenance",
    "load_documents",
    "normalize_text",
]
