"""
애플리케이션 설정
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """애플리케이션 설정 클래스"""

    # 애플리케이션 정보
    APP_NAME: str = "Job Jal Hada API"
    APP_DESCRIPTION: str = "AI 기반 적성검사 분석 및 직업 추천 서비스"
    APP_VERSION: str = "0.1.0"

    # CORS 설정
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173"
    ]

    # 파일 업로드 설정
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB

    # 로깅 설정
    LOG_LEVEL: str = "INFO"

    # LLM API 설정
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    LLM_PROVIDER: str = "openai"  # openai 또는 anthropic
    LLM_MODEL: str = "gpt-4o"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
