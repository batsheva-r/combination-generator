from fastapi import HTTPException


class InvalidIndexException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail="Index must be >= 0"
        )

class InvalidNException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail="n must be between 1 and 20"
        )

class InvalidPageException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail="Page must be >= 1"
        )