import enum
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "SCHEDULED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    RESCHEDULED = "RESCHEDULED"


class Appointment(Base, TimestampMixin):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    title = Column(String, nullable=False)  # e.g., "Cardiology Consultation"
    doctor_name = Column(String, nullable=False)  # e.g., "Dr. Sarah Chen"
    clinic_name = Column(String, nullable=True)  # e.g., "Metro Health Center"
    scheduled_at = Column(DateTime, nullable=False, index=True)
    location = Column(String, nullable=True)  # e.g., "Room 304, Building B"
    notes = Column(Text, nullable=True)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED, nullable=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="appointments")
