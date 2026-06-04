from fastapi import APIRouter, Query
from models.schemas import AllResponse, NextRequest, StartRequest, StartResponse, NextResponse, PermutationItem
from services.permutation_service import PermutationService
from core.exceptions import InvalidIndexException, InvalidPageException

router = APIRouter()
service = PermutationService()

@router.post("/start", response_model=StartResponse)
def start(req: StartRequest):
    total = service.total_permutations(req.n)
    return StartResponse(total=str(total))

@router.post("/next", response_model=NextResponse)
def get_next(req: NextRequest):
    total = service.total_permutations(req.n)

    if req.index < 0:
        raise InvalidIndexException()

    if req.index >= total:
        return NextResponse(
            index=str(req.index),
            permutation=[],
            has_next=False
        )
    
    perm = service.get_permutation(req.n, req.index)

    return NextResponse(
        index=str(req.index),
        permutation=perm,
        has_next=req.index < total - 1
    )


@router.get("/all", response_model=AllResponse)
def get_all(
    n: int = Query(..., ge=1, le=20),
    start_index: int = Query(0, ge=0),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    total = service.total_permutations(n)
    remaining_items = max(0, total - start_index)
    total_pages = (
        (remaining_items + page_size - 1) // page_size
        if remaining_items > 0
        else 0
    )
    offset = start_index + ((page - 1) * page_size)

    if offset >= total:
        return AllResponse(
            page=str(page),
            page_size=page_size,
            total_pages=str(total_pages),
            total_items=str(remaining_items),
            items=[],
            has_next=False,
            has_prev=page > 1,
        )

    end_index = min(offset + page_size, total)
    items = []

    for i in range(offset, end_index):
        items.append(
            PermutationItem(
                index=str(i + 1),
                permutation=service.get_permutation(n, i),
            )
        )

    return AllResponse(
        page=str(page),
        page_size=page_size,
        total_pages=str(total_pages),
        total_items=str(remaining_items),
        items=items,
        has_next=page < total_pages,
        has_prev=page > 1,
    )
