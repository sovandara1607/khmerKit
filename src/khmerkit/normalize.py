"""Normalization with a Khmer-specific canonical-ordering dependency."""

from dataclasses import dataclass
import re
import unicodedata

import pheasa


@dataclass(frozen=True)
class NormalizationResult:
    """Normalized text plus the stages used to produce it."""

    text: str
    used_pheasa: bool


_WHITESPACE = re.compile(r"\s+")


def normalize_text(text: str) -> NormalizationResult:
    """Normalize Khmer canonical ordering, Unicode, case, and whitespace.

    Pheasa owns the Khmer-specific reordering rules. NFC and whitespace folding
    keep mixed Khmer/Latin search input predictable without changing punctuation.
    """

    if not isinstance(text, str):
        raise TypeError("text must be a string")

    normalized = pheasa.normalize(text)
    normalized = unicodedata.normalize("NFC", normalized)
    normalized = normalized.casefold()
    normalized = _WHITESPACE.sub(" ", normalized).strip()
    return NormalizationResult(text=normalized, used_pheasa=True)
