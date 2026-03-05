# app/db/models.py
from sqlalchemy import Column, Integer, String, Date
from .base import Base

class Usuario(Base):
    __tablename__ = "usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, index=True)
    senha = Column(String(255), nullable=False)
    cpf = Column(String(11), nullable=False)
    tipo_usuario = Column(String(20), nullable=False)
    data_criacao_usuario = Column(Date, nullable=False)
    