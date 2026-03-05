from sqlalchemy.orm import Session
from app.db.models import Usuario

def buscar_usuario_por_email(email: str, db: Session):
    user = db.query(Usuario).filter(Usuario.email == email).first()
    return user