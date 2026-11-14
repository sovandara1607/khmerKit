"""Evaluation helpers for small ranked-retrieval datasets."""

from dataclasses import dataclass
from typing import Iterable, Mapping

from .search import SearchResult


@dataclass(frozen=True)
class QueryCase:
    query_id: str
    query: str
    relevant: frozenset[str]


@dataclass(frozen=True)
class Evaluation:
    hit_rate_at_3: float
    mean_reciprocal_rank: float
    per_query: Mapping[str, list[SearchResult]]


def evaluate(
    cases: Iterable[QueryCase],
    searcher,
    *,
    k: int = 3,
) -> Evaluation:
    case_list = list(cases)
    per_query = {}
    hits = 0
    reciprocal_ranks = []
    for case in case_list:
        results = searcher.search(case.query, k=k)
        per_query[case.query_id] = results
        ranks = [index + 1 for index, item in enumerate(results) if item.doc_id in case.relevant]
        if ranks:
            hits += 1
            reciprocal_ranks.append(1 / ranks[0])
        else:
            reciprocal_ranks.append(0.0)
    count = len(case_list)
    return Evaluation(
        hit_rate_at_3=hits / count if count else 0.0,
        mean_reciprocal_rank=sum(reciprocal_ranks) / count if count else 0.0,
        per_query=per_query,
    )
