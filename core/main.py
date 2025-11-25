# core/main.py

import os

import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api_demo import router as demo_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(demo_router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-health")
def db_health():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        return {"db_status": "error", "detail": "DATABASE_URL is not set"}

    try:
        conn = psycopg2.connect(db_url)
        conn.close()
        return {"db_status": "ok"}
    except Exception as e:
        return {"db_status": "error", "detail": str(e)}