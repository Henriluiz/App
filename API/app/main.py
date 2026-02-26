from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from db import get_db

app = FastAPI()

@app.get("/")
def home():
    return {"status": "API funcionando"}

@app.get("/db-ping")
def db_ping(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()
    return {"mysql": "ok", "result": result}