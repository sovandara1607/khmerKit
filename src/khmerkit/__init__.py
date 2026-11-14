"""KhmerKit's small, reproducible text/search building blocks."""

from .normalize import NormalizationResult, normalize_text
from .search import CharNgramSearch, ExactSearch, SearchResult

__all__ = [
    "CharNgramSearch",
    "ExactSearch",
    "NormalizationResult",
    "SearchResult",
    "normalize_text",
]
