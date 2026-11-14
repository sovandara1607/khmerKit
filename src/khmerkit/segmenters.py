"""Optional adapters for third-party Khmer segmentation packages."""

from functools import lru_cache


@lru_cache(maxsize=1)
def _load_tokenizer():
    try:
        from khmer_segmenter import Tokenizer
    except ImportError as error:
        raise RuntimeError(
            "install the optional khmer-segmenter package before using this adapter"
        ) from error
    return Tokenizer(seg_type="com")


def segment_with_khmer_segmenter(text: str) -> list[str]:
    """Segment text with the optional `khmer-segmenter` package."""

    return _load_tokenizer().tokenize(text).split()
