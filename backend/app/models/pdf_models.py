"""
PDF 관련 데이터 모델
"""
from pydantic import BaseModel, Field
from typing import Optional


class PDFMetadata(BaseModel):
    """PDF 메타데이터 모델"""
    total_pages: int = Field(..., description="총 페이지 수")
    format_detected: str = Field(..., description="감지된 적성검사 형식")
    success: bool = Field(True, description="처리 성공 여부")


class PDFUploadResponse(BaseModel):
    """PDF 업로드 응답 모델"""
    success: bool = Field(..., description="성공 여부")
    filename: str = Field(..., description="원본 파일명")
    saved_filename: str = Field(..., description="저장된 파일명 (고유)")
    file_path: str = Field(..., description="저장된 파일 경로")
    file_size: int = Field(..., description="파일 크기 (bytes)")
    text: str = Field(..., description="추출된 전체 텍스트")
    total_pages: int = Field(..., description="총 페이지 수")
    format_detected: str = Field(..., description="감지된 형식")
    is_supported_format: bool = Field(..., description="지원하는 형식 여부")
    preview: str = Field(..., description="텍스트 미리보기 (500자)")
    warning: Optional[str] = Field(None, description="경고 메시지")


class SupportedFormatsResponse(BaseModel):
    """지원하는 형식 목록 응답 모델"""
    supported_formats: list[str] = Field(..., description="지원하는 적성검사 형식 목록")
    count: int = Field(..., description="지원하는 형식 개수")
