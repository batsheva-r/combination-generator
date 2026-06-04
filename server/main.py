from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.permutations_router import router

app = FastAPI(
    title="Permutations Generator"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)