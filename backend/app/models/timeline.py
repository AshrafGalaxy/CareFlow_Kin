import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class TimelineEventType(str, enum.Enum):
    MEDICATION = "MEDICATION"
    CHECKIN = "CHECKIN"
    CHECKLIST = "CHECKLIST"
    APPOINTMENT = "APPOINTMENT"
    CARE_UPDATE = "CARE_UPDATE"
    SAFETY = "SAFETY"


class PrivacyLevel(str, enum.Enum):
    CARE_CIRCLE = "CARE_CIRCLE"
    CLINICAL_ONLY = "CLINICAL_ONLY"
    PRIVATE = "PRIVATE"


class TimelineEvent(Base, TimestampMixin):
    __tablename__ = "timeline_events"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    event_type = Column(Enum(TimelineEventType), nullable=False, index=True)
    reference_id = Column(String, nullable=True)  # ID of the underlying medication, appointment, etc.
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    privacy_level = Column(Enum(PrivacyLevel), default=PrivacyLevel.CARE_CIRCLE, nullable=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="timeline_events")
