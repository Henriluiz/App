from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.base import get_db
from app.db.models import Usuario
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginIn(BaseModel):
    email: EmailStr
    senha: str

@router.post("/login")
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == payload.email).first()

    # não vazar se email existe ou não
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    # se seu campo senha já for hash:
    if not verify_password(payload.senha, user.senha):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    token = create_access_token(str(user.id_usuario))

    return {
        "token": token,
        "user": {
            "id_usuario": user.id_usuario,
            "nome": user.nome,
            "email": user.email,
            "tipo_usuario": user.tipo_usuario,
        }
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
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(Usuario).filter(Usuario.id_usuario == int(sub)).first()
    if not user:
        raise HTTPException(status_code=401, detail="Token inválido")

    return user

@router.get("/me")
def me(user: Usuario = Depends(get_current_user)):
    return {
        "id_usuario": user.id_usuario,
        "nome": user.nome,
        "email": user.email,
        "tipo_usuario": user.tipo_usuario,
    }