from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text
from app.core.database import Base
from app.models.base import generate_uuid


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    actor_id = Column(String, nullable=True, index=True)  # User ID of performer, or None for system
    action = Column(String, nullable=False, index=True)  # e.g., "MEDICATION_LOGGED", "AUTH_LOGIN"
    entity_type = Column(String, nullable=False, index=True)  # e.g., "MedicationLog", "User"
    entity_id = Column(String, nullable=True, index=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    metadata_json = Column(Text, nullable=True)  # JSON-encoded contextual data
