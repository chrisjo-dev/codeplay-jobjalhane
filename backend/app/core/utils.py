"""
유틸리티 함수 모음
"""
import os
import uuid
from datetime import datetime
from pathlib import Path


def generate_unique_filename(original_filename: str) -> str:
    """
    고유한 파일명 생성

    Args:
        original_filename: 원본 파일명

    Returns:
        str: 타임스탬프와 UUID가 포함된 고유 파일명
    """
    # 파일 확장자 추출
    file_ext = Path(original_filename).suffix

    # 타임스탬프 생성 (YYYYMMDD_HHMMSS)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # 짧은 UUID 생성 (앞 8자리만)
    short_uuid = str(uuid.uuid4())[:8]

    # 고유 파일명 생성
    unique_filename = f"{timestamp}_{short_uuid}{file_ext}"

    return unique_filename


def save_uploaded_file(file_content: bytes, filename: str, upload_dir: str = "uploads") -> str:
    """
    업로드된 파일을 디스크에 저장

    Args:
        file_content: 파일 바이트 내용
        filename: 저장할 파일명
        upload_dir: 업로드 디렉토리 경로

    Returns:
        str: 저장된 파일의 전체 경로
    """
    # 업로드 디렉토리 생성 (존재하지 않는 경우)
    upload_path = Path(upload_dir)
    upload_path.mkdir(parents=True, exist_ok=True)

    # 파일 저장 경로
    file_path = upload_path / filename

    # 파일 저장
    with open(file_path, "wb") as f:
        f.write(file_content)

    return str(file_path)


def get_file_size(file_path: str) -> int:
    """
    파일 크기 반환 (bytes)

    Args:
        file_path: 파일 경로

    Returns:
        int: 파일 크기 (bytes)
    """
    return os.path.getsize(file_path)


def save_extracted_text(text: str, pdf_filename: str, output_dir: str = "extracted") -> str:
    """
    추출된 텍스트를 파일로 저장

    Args:
        text: 추출된 텍스트
        pdf_filename: 원본 PDF 파일명 (확장자 제거용)
        output_dir: 출력 디렉토리 경로

    Returns:
        str: 저장된 텍스트 파일의 전체 경로
    """
    # 출력 디렉토리 생성 (존재하지 않는 경우)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # PDF 파일명에서 확장자 제거하고 .txt로 변경
    base_name = Path(pdf_filename).stem
    text_filename = f"{base_name}.txt"

    # 텍스트 파일 저장 경로
    text_file_path = output_path / text_filename

    # 텍스트 저장
    with open(text_file_path, "w", encoding="utf-8") as f:
        f.write(text)

    return str(text_file_path)
