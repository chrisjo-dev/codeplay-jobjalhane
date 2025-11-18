#!/usr/bin/env python
"""
LLM 프로파일 분석 테스트 스크립트

사용법:
    python test_llm.py <PDF_파일_경로>

예제:
    python test_llm.py "직업심리검사(L형).pdf"
"""

import sys
import requests
import json
from pathlib import Path
from datetime import datetime


API_BASE_URL = "http://localhost:8000/api"
OUTPUT_DIR = Path("test_results")


def upload_pdf(pdf_path: str) -> dict:
    """PDF 파일 업로드 및 텍스트 추출"""
    print(f"\n📄 Step 1: PDF 업로드 중... ({pdf_path})")

    with open(pdf_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(f"{API_BASE_URL}/upload-pdf", files=files)

    if response.status_code != 200:
        print(f"❌ 업로드 실패: {response.text}")
        sys.exit(1)

    result = response.json()
    print(f"✅ 업로드 성공!")
    print(f"   - 파일명: {result['filename']}")
    print(f"   - 페이지 수: {result['total_pages']}")
    print(f"   - 감지된 형식: {result['format_detected']}")
    print(f"   - 텍스트 길이: {len(result['text'])} 자")

    return result


def analyze_profile(text: str, format_detected: str) -> dict:
    """LLM을 사용한 프로파일 분석"""
    print(f"\n🤖 Step 2: LLM 프로파일 분석 중...")

    response = requests.post(
        f"{API_BASE_URL}/analyze-profile",
        json={
            "text": text[:3000],  # 처음 3000자만 전송
            "format_detected": format_detected
        }
    )

    if response.status_code != 200:
        print(f"❌ 분석 실패: {response.text}")
        sys.exit(1)

    result = response.json()
    print("result: ", result)
    if not result.get('success'):
        print(f"❌ 프로파일 분석 실패: {result.get('error', 'Unknown error')}")
        sys.exit(1)

    print(f"✅ 분석 성공!")
    print(f"   - 사용 모델: {result['model_used']}")
    print(f"   - 처리 시간: {result.get('processing_time', 'N/A')}초")

    return result


def save_results(profile_data: dict, upload_data: dict) -> str:
    """결과를 파일로 저장"""
    # 출력 디렉토리 생성
    OUTPUT_DIR.mkdir(exist_ok=True)

    # 타임스탬프 기반 파일명
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # 1. JSON 파일 저장 (전체 데이터)
    json_path = OUTPUT_DIR / f"result_{timestamp}.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump({
            'upload': upload_data,
            'profile': profile_data
        }, f, indent=2, ensure_ascii=False)

    # 2. LLM 원본 응답만 별도 저장
    llm_raw_path = OUTPUT_DIR / f"llm_raw_{timestamp}.txt"
    with open(llm_raw_path, 'w', encoding='utf-8') as f:
        f.write(profile_data.get('raw_response', 'N/A'))

    # 3. 읽기 쉬운 텍스트 파일 저장
    txt_path = OUTPUT_DIR / f"result_{timestamp}.txt"
    with open(txt_path, 'w', encoding='utf-8') as f:
        profile = profile_data['profile']

        f.write("="*60 + "\n")
        f.write("📊 프로파일 분석 결과\n")
        f.write("="*60 + "\n\n")

        f.write(f"파일명: {upload_data['filename']}\n")
        f.write(f"감지된 형식: {upload_data['format_detected']}\n")
        f.write(f"분석 모델: {profile_data['model_used']}\n")
        f.write(f"분석 시간: {timestamp}\n\n")

        f.write("💪 핵심 강점 (3개):\n")
        for i, strength in enumerate(profile['strengths'], 1):
            f.write(f"   {i}. {strength}\n")

        f.write("\n🎯 흥미 분야 (2개):\n")
        for i, interest in enumerate(profile['interests'], 1):
            f.write(f"   {i}. {interest}\n")

        f.write(f"\n⚠️  보완이 필요한 부분:\n")
        f.write(f"   - {profile['weakness']}\n")

        f.write("\n" + "="*60 + "\n")

    return str(json_path)


def print_profile(profile_data: dict):
    """프로파일 결과 출력"""
    profile = profile_data['profile']

    print("\n" + "="*60)
    print("📊 프로파일 분석 결과")
    print("="*60)

    print("\n💪 핵심 강점 (3개):")
    for i, strength in enumerate(profile['strengths'], 1):
        print(f"   {i}. {strength}")

    print("\n🎯 흥미 분야 (2개):")
    for i, interest in enumerate(profile['interests'], 1):
        print(f"   {i}. {interest}")

    print(f"\n⚠️  보완이 필요한 부분:")
    print(f"   - {profile['weakness']}")

    print("\n" + "="*60)


def main():
    """메인 함수"""
    if len(sys.argv) < 2:
        print("사용법: python test_llm.py <PDF_파일_경로>")
        print("\n예제:")
        print('  python test_llm.py "직업심리검사(L형).pdf"')
        print('  python test_llm.py uploads/test.pdf')
        sys.exit(1)

    pdf_path = sys.argv[1]

    # PDF 파일 존재 확인
    if not Path(pdf_path).exists():
        print(f"❌ 파일을 찾을 수 없습니다: {pdf_path}")
        sys.exit(1)

    try:
        # Step 1: PDF 업로드
        upload_result = upload_pdf(pdf_path)

        # Step 2: LLM 프로파일 분석
        profile_result = analyze_profile(
            upload_result['text'],
            upload_result['format_detected']
        )

        # Step 3: 결과 출력
        print_profile(profile_result)

        # Step 4: 파일로 저장
        saved_path = save_results(profile_result, upload_result)
        timestamp = saved_path.split('_')[-1].replace('.json', '')
        print(f"\n💾 결과 저장됨:")
        print(f"   - JSON (전체): {saved_path}")
        print(f"   - TXT (요약): test_results/result_{timestamp}.txt")
        print(f"   - LLM 원본: test_results/llm_raw_{timestamp}.txt")

        print("\n✨ 완료!")

    except requests.exceptions.ConnectionError:
        print("\n❌ 백엔드 서버에 연결할 수 없습니다.")
        print("   백엔드 서버가 실행 중인지 확인하세요: http://localhost:8000")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ 오류 발생: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
