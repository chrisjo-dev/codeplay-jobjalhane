"""
PDF 처리 서비스 - 비즈니스 로직 레이어
"""
import pdfplumber
from typing import Dict, Any
import io
import logging

logger = logging.getLogger(__name__)


class PDFService:
    """PDF 파일 처리 서비스"""

    SUPPORTED_FORMATS = [
        "워크넷 직업심리검사",
        "커리어넷 진로탐색검사",
        "직업선호도검사 (L형)"
    ]

    def __init__(self):
        pass

    async def extract_text_from_pdf(self, pdf_file: bytes) -> Dict[str, Any]:
        """
        PDF 파일에서 텍스트를 추출합니다.

        Args:
            pdf_file: PDF 파일 바이트 데이터

        Returns:
            Dict[str, Any]: 추출된 텍스트와 메타데이터
        """
        try:
            # PDF 파일을 메모리에서 읽기
            pdf_stream = io.BytesIO(pdf_file)

            extracted_text = []
            metadata = {
                "total_pages": 0,
                "success": True,
                "format_detected": None
            }

            # pdfplumber를 사용하여 텍스트 추출
            with pdfplumber.open(pdf_stream) as pdf:
                metadata["total_pages"] = len(pdf.pages)

                for page_num, page in enumerate(pdf.pages, start=1):
                    text = page.extract_text()
                    if text:
                        extracted_text.append({
                            "page": page_num,
                            "text": text.strip()
                        })

                # 첫 페이지에서 지원하는 형식인지 확인
                if extracted_text:
                    first_page_text = extracted_text[0]["text"]
                    metadata["format_detected"] = self._detect_format(first_page_text)

            # 전체 텍스트 조합
            full_text = "\n\n".join([page["text"] for page in extracted_text])

            return {
                "success": True,
                "text": full_text,
                "pages": extracted_text,
                "metadata": metadata
            }

        except Exception as e:
            logger.error(f"PDF 텍스트 추출 실패: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "text": "",
                "pages": [],
                "metadata": {
                    "total_pages": 0,
                    "success": False,
                    "format_detected": None
                }
            }

    def _detect_format(self, first_page_text: str) -> str:
        """
        첫 페이지 텍스트를 기반으로 적성검사 형식을 감지합니다.

        Args:
            first_page_text: 첫 페이지의 텍스트

        Returns:
            str: 감지된 형식 또는 "Unknown"
        """
        text_lower = first_page_text.lower()

        if "워크넷" in first_page_text or "worknet" in text_lower:
            return "워크넷 직업심리검사"
        elif "커리어넷" in first_page_text or "careernet" in text_lower:
            return "커리어넷 진로탐색검사"
        elif "직업선호도검사" in first_page_text and "l형" in text_lower:
            return "직업선호도검사 (L형)"
        else:
            return "Unknown"

    def is_supported_format(self, format_name: str) -> bool:
        """
        지원하는 형식인지 확인합니다.

        Args:
            format_name: 형식 이름

        Returns:
            bool: 지원 여부
        """
        return format_name in self.SUPPORTED_FORMATS

    def get_supported_formats(self) -> list[str]:
        """
        지원하는 형식 목록을 반환합니다.

        Returns:
            list[str]: 지원하는 형식 목록
        """
        return self.SUPPORTED_FORMATS
