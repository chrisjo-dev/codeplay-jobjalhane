"""
PDF 컨트롤러 - API 엔드포인트 레이어
"""
from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services import PDFService
from app.models import PDFUploadResponse, SupportedFormatsResponse
from app.core.utils import generate_unique_filename, save_uploaded_file, get_file_size, save_extracted_text
import logging

logger = logging.getLogger(__name__)

# 라우터 생성
router = APIRouter(
    prefix="/api",
    tags=["PDF"]
)

# 서비스 인스턴스
pdf_service = PDFService()


@router.get("/supported-formats", response_model=SupportedFormatsResponse)
async def get_supported_formats():
    """
    지원하는 적성검사 형식 목록을 반환합니다.
    """
    formats = pdf_service.get_supported_formats()
    return SupportedFormatsResponse(
        supported_formats=formats,
        count=len(formats)
    )


@router.post("/upload-pdf", response_model=PDFUploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    """
    PDF 파일을 업로드하고 텍스트를 추출합니다.

    Args:
        file: 업로드된 PDF 파일

    Returns:
        PDFUploadResponse: 추출된 텍스트와 메타데이터
    """
    # 파일 확장자 확인
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="PDF 파일만 업로드 가능합니다."
        )

    # 파일 크기 제한 (10MB)
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes

    try:
        # 파일 읽기
        contents = await file.read()

        # 파일 크기 확인
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="파일 크기는 10MB를 초과할 수 없습니다."
            )

        logger.info(f"Processing PDF file: {file.filename} ({len(contents)} bytes)")

        # 고유한 파일명 생성
        unique_filename = generate_unique_filename(file.filename)

        # 파일 저장
        file_path = save_uploaded_file(contents, unique_filename)
        file_size = get_file_size(file_path)

        logger.info(f"File saved: {file_path} ({file_size} bytes)")

        # PDF 텍스트 추출 (서비스 레이어 호출)
        result = await pdf_service.extract_text_from_pdf(contents)

        if not result["success"]:
            raise HTTPException(
                status_code=500,
                detail=f"PDF 텍스트 추출 실패: {result.get('error', 'Unknown error')}"
            )

        # 형식 감지 결과 확인
        format_detected = result["metadata"]["format_detected"]
        is_supported = pdf_service.is_supported_format(format_detected)

        # 추출된 텍스트를 파일로 저장
        extracted_text_path = save_extracted_text(result["text"], unique_filename)
        logger.info(f"Extracted text saved to: {extracted_text_path}")

        # 응답 데이터 구성
        response_data = {
            "success": True,
            "filename": file.filename,
            "saved_filename": unique_filename,
            "file_path": file_path,
            "file_size": file_size,
            "text": result["text"],
            "total_pages": result["metadata"]["total_pages"],
            "format_detected": format_detected,
            "is_supported_format": is_supported,
            "preview": result["text"][:500] + "..." if len(result["text"]) > 500 else result["text"],
            "extracted_text_path": extracted_text_path
        }

        # 지원하지 않는 형식 경고
        if format_detected == "Unknown":
            logger.warning(f"Unknown PDF format detected for file: {file.filename}")
            response_data["warning"] = "감지된 형식이 지원 목록에 없습니다. 텍스트 추출은 완료되었으나, 정확한 분석이 어려울 수 있습니다."
        elif not is_supported:
            response_data["warning"] = f"'{format_detected}' 형식은 현재 지원되지 않습니다."

        logger.info(f"Successfully processed PDF: {file.filename} - Format: {format_detected}")

        return PDFUploadResponse(**response_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"파일 처리 중 오류가 발생했습니다: {str(e)}"
        )
