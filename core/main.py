from fastapi import FastAPI
import os
import psycopg2

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-health")
def db_health():
    db_url = os.getenv("DATABASE_URL")
    try:
        conn = psycopg2.connect(db_url)
        conn.close()
        return {"db_status": "ok"}
    except Exception as e:
        return {"db_status": "error", "detail": str(e)}