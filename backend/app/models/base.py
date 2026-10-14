import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import declarative_mixin


def generate_uuid() -> str:
    """Generate a unique UUID string."""
    return str(uuid.uuid4())


class TimestampMixin:
    """Reusable mixin for created_at and updated_at timestamps."""
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )
