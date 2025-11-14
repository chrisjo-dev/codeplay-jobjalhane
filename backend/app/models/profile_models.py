"""
프로파일링 관련 데이터 모델
"""
from pydantic import BaseModel, Field
from typing import List


class UserProfile(BaseModel):
    """사용자 적성 프로필 모델"""
    strengths: List[str] = Field(..., description="핵심 강점 3가지", min_length=3, max_length=3)
    interests: List[str] = Field(..., description="흥미 분야 2가지", min_length=2, max_length=2)
    weakness: str = Field(..., description="보완이 필요한 약점 1가지")


class ProfileAnalysisRequest(BaseModel):
    """프로파일 분석 요청 모델"""
    text: str = Field(..., description="PDF에서 추출된 텍스트")
    format_detected: str = Field(..., description="감지된 적성검사 형식")


class ProfileAnalysisResponse(BaseModel):
    """프로파일 분석 응답 모델"""
    success: bool = Field(..., description="성공 여부")
    profile: UserProfile = Field(..., description="추출된 사용자 프로필")
    raw_response: str = Field(..., description="LLM의 원본 응답")
    model_used: str = Field(..., description="사용된 LLM 모델")
