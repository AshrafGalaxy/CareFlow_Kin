from typing import Optional
from pydantic import BaseModel


class PatientProfileBase(BaseModel):
    date_of_birth: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_notes: Optional[str] = None
    primary_address: Optional[str] = None
    preferred_language: str = "en"
    timezone: str = "UTC"
    accessibility_high_contrast: bool = False
    accessibility_font_size: int = 18
    accessibility_haptic_feedback: bool = True
    accessibility_audio_prompts: bool = True


class PatientProfileUpdate(BaseModel):
    date_of_birth: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_notes: Optional[str] = None
    primary_address: Optional[str] = None
    preferred_language: Optional[str] = None
    timezone: Optional[str] = None
    accessibility_high_contrast: Optional[bool] = None
    accessibility_font_size: Optional[int] = None
    accessibility_haptic_feedback: Optional[bool] = None
    accessibility_audio_prompts: Optional[bool] = None


class PatientProfileOut(PatientProfileBase):
    id: str
    user_id: str

    class Config:
        from_attributes = True
