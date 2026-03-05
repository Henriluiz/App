from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.base import get_db
from app.db.models import Usuario
from app.core.security import verify_password, create_access_token
from app.crud.usuario import buscar_usuario_por_email

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginIn(BaseModel):
    email: EmailStr
    senha: str

@router.post("/login")
def login(payload: LoginIn, db: Session = Depends(get_db)):

    user = buscar_usuario_por_email(payload.email, db)

    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token(str(user.id_usuario))

    return {
        "token": token,
        "user": user
    }
    
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.security import SECRET_KEY, ALGORITHM

bearer = HTTPBearer()

def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
    db: Session = Depends(get_db),
):
    token = creds.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    sub = payload.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    # se sub não for número, isso evita crash silencioso
    try:
        user_id = int(sub)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    user = db.query(Usuario).filter(Usuario.id_usuario == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    return user

@router.get("/me")
def me(user: Usuario = Depends(get_current_user)):
    return {
        "id_usuario": user.id_usuario,
        "nome": user.nome,
        "email": user.email,
        "tipo_usuario": user.tipo_usuario,
    }