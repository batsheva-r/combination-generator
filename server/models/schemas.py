from pydantic import BaseModel, Field

class StartRequest(BaseModel):
    n: int = Field(..., ge=1, le=20)

class StartResponse(BaseModel):
    total: str

class NextRequest(BaseModel):
    n: int = Field(..., ge=1, le=20)
    index: int = Field(..., ge=0)

class NextResponse(BaseModel):
    index: str
    permutation: list[int]
    has_next: bool

class AllRequest(BaseModel):
    n: int = Field(..., ge=1, le=20)
    start_index: int = Field(..., ge=0)
    page: int = Field(..., ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

class PermutationItem(BaseModel):
    index: str
    permutation: list[int]

class AllResponse(BaseModel):
    page: str
    page_size: int
    total_pages: str
    total_items: str
    items: list[PermutationItem]
    has_next: bool
    has_prev: bool