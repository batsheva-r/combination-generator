import sys
import pathlib
import pytest

# Skip API tests if httpx/httpx2 is not installed (starlette.testclient requires it)
pytest.importorskip("httpx")

# Ensure the server package root is on sys.path so imports in app work
ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_start_endpoint_valid():
    resp = client.post("/start", json={"n": 3})
    assert resp.status_code == 200
    assert resp.json()["total"] == "6"


def test_start_endpoint_invalid():
    resp = client.post("/start", json={"n": 0})
    assert resp.status_code == 422


def test_next_endpoint_valid():
    resp = client.post("/next", json={"n": 3, "index": 0})
    assert resp.status_code == 200
    assert resp.json()["permutation"] == [1, 2, 3]


def test_all_endpoint_pagination():
    resp = client.get("/all?n=3&page=1&page_size=2")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_items"] == "6"
    assert len(data["items"]) == 2
