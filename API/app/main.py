from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db.base import get_db
from app.routes.auth import router as auth_router

app = FastAPI()

# suas rotas antigas continuam
@app.get("/")
def home():
    return {"status": "API funcionando"}

@app.get("/db-ping")
def db_ping(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()
    return {"mysql": "ok", "result": result}

# ADICIONA ISSO
app.include_router(auth_router)