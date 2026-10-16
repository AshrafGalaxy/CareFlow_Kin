import os
from pathlib import Path
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Careflow API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Cryptographic Configuration
    SECRET_KEY: str = os.getenv("SECRET_KEY", "careflow_development_secret_key_change_in_production_32b")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days for elder session persistence
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30  # 30 days
    
    # Persistence Configuration - Canonical absolute database path to prevent CWD split-brain
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{(Path(__file__).resolve().parent.parent.parent / 'elderly_careflow.db').as_posix()}"
    )
    
    # Cross-Origin Resource Sharing
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:8081",
        "http://localhost:19006",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:8081",
        "http://127.0.0.1:3000",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
