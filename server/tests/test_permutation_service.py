import sys
import pathlib
import pytest

# Ensure the server package root is on sys.path so tests can import application modules
ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from services.permutation_service import PermutationService
from core.exceptions import InvalidNException


def test_total_permutations_valid():
    svc = PermutationService()
    assert svc.total_permutations(3) == 6


def test_get_permutation_valid():
    svc = PermutationService()
    assert svc.get_permutation(3, 0) == [1, 2, 3]
    assert svc.get_permutation(3, 5) == [3, 2, 1]


def test_invalid_n_raises():
    svc = PermutationService()
    with pytest.raises(InvalidNException):
        svc.total_permutations(0)
    with pytest.raises(InvalidNException):
        svc.get_permutation(21, 0)
