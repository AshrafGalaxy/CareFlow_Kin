from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class PatientProfile(Base, TimestampMixin):
    __tablename__ = "patient_profiles"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    
    date_of_birth = Column(String, nullable=True)  # YYYY-MM-DD
    blood_group = Column(String, nullable=True)
    emergency_notes = Column(String, nullable=True)
    primary_address = Column(String, nullable=True)
    
    preferred_language = Column(String, default="en", nullable=False)
    timezone = Column(String, default="UTC", nullable=False)
    
    # Accessibility Preferences for Elder Ergonomics
    accessibility_high_contrast = Column(Boolean, default=False, nullable=False)
    accessibility_font_size = Column(Integer, default=18, nullable=False)  # Base font size in px
    accessibility_haptic_feedback = Column(Boolean, default=True, nullable=False)
    accessibility_audio_prompts = Column(Boolean, default=True, nullable=False)

    # Relationships
    user = relationship("User", back_populates="patient_profile")
    medications = relationship("Medication", back_populates="patient", cascade="all, delete-orphan")
    checkins = relationship("DailyCheckIn", back_populates="patient", cascade="all, delete-orphan")
    checklist_items = relationship("DailyChecklistItem", back_populates="patient", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="patient", cascade="all, delete-orphan")
    timeline_events = relationship("TimelineEvent", back_populates="patient", cascade="all, delete-orphan")
