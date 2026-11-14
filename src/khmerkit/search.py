"""Two intentionally small retrieval baselines for the feasibility experiment."""

from dataclasses import dataclass
from typing import Iterable, Literal, Sequence

from sklearn.feature_extraction.text import TfidfVectorizer

from .normalize import normalize_text


@dataclass(frozen=True)
class SearchResult:
    doc_id: str
    score: float


def _tokens(text: str) -> set[str]:
    return set(text.split())


class ExactSearch:
    """Whitespace-token overlap baseline over normalized or raw text."""

    def __init__(self, documents: Iterable[tuple[str, str]], *, normalize: bool = False):
        self._documents = list(documents)
        self._normalize = normalize
        self._prepared = {
            doc_id: self._prepare(text) for doc_id, text in self._documents
        }

    def _prepare(self, text: str) -> str:
        return normalize_text(text).text if self._normalize else text.casefold()

    def search(self, query: str, *, k: int = 3) -> list[SearchResult]:
        prepared_query = self._prepare(query)
        query_tokens = _tokens(prepared_query)
        scored = []
        for doc_id, _ in self._documents:
            doc_tokens = _tokens(self._prepared[doc_id])
            overlap = len(query_tokens & doc_tokens)
            score = overlap / len(query_tokens) if query_tokens else 0.0
            scored.append(SearchResult(doc_id, score))
        # Python's stable sort keeps corpus order for ties, making zero-score
        # behavior deterministic without using document IDs as a hidden signal.
        return sorted(scored, key=lambda item: -item.score)[:k]


class CharNgramSearch:
    """Character n-gram TF-IDF retrieval that works across scripts.

    This is a multilingual lexical proxy, not a semantic embedding model. It
    avoids language-specific tokenization and stays reproducible offline.
    """

    def __init__(
        self,
        documents: Sequence[tuple[str, str]],
        *,
        normalize: bool = True,
        ngram_range: tuple[int, int] = (2, 5),
    ):
        self._documents = list(documents)
        self._normalize = normalize
        self._texts = [self._prepare(text) for _, text in self._documents]
        self._vectorizer = TfidfVectorizer(
            analyzer="char",
            ngram_range=ngram_range,
            lowercase=False,
            norm="l2",
        )
        self._matrix = self._vectorizer.fit_transform(self._texts)

    def _prepare(self, text: str) -> str:
        return normalize_text(text).text if self._normalize else text.casefold()

    def search(self, query: str, *, k: int = 3) -> list[SearchResult]:
        query_vector = self._vectorizer.transform([self._prepare(query)])
        scores = (self._matrix @ query_vector.T).toarray().ravel()
        ranked = sorted(
            (
                SearchResult(doc_id, float(score))
                for (doc_id, _), score in zip(self._documents, scores)
            ),
            key=lambda item: (-item.score, item.doc_id),
        )
        return ranked[:k]


class SearchIndex:
    """Stable application-facing wrapper around KhmerKit retrieval backends."""

    def __init__(
        self,
        documents: Sequence[tuple[str, str]],
        *,
        backend: Literal["char_tfidf", "exact"] = "char_tfidf",
        normalize: bool = True,
    ):
        if backend == "char_tfidf":
            self._searcher = CharNgramSearch(documents, normalize=normalize)
        elif backend == "exact":
            self._searcher = ExactSearch(documents, normalize=normalize)
        else:
            raise ValueError(f"unsupported search backend: {backend}")

    def search(self, query: str, *, k: int = 3) -> list[SearchResult]:
        """Return the highest-scoring documents for a query."""

        return self._searcher.search(query, k=k)
