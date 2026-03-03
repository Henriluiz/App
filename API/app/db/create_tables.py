# create_tables.py
from .base import engine, Base
# importa os models para que o SQLAlchemy os conheça
from . import models  # garante que User seja registrado no metadata

def create_all():
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas (se não existiam).")

if __name__ == "__main__":
    create_all()