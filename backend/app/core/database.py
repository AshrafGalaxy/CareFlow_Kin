from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

# Engine configuration with thread safety for SQLite and connection pooling for PostgreSQL
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy declarative models."""
    pass


def get_db() -> Generator:
    """Yield database session for request lifecycle."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
