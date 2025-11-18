#!/usr/bin/env python
"""
간단한 OpenAI API 테스트 스크립트

사용법:
    python test_openai.py
"""

import os, json
import httpx
from openai import OpenAI
from pathlib import Path

# .env 파일에서 API 키 읽기
from dotenv import load_dotenv
load_dotenv()

# OpenAI 클라이언트 생성 (httpx 0.28+ 호환)
http_client = httpx.Client()
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    http_client=http_client
)

# 추출된 PDF 텍스트 파일 읽기
pdf_text_path = Path(__file__).parent / "extracted" / "20251115_093655_1642d76b.txt"
with open(pdf_text_path, 'r', encoding='utf-8') as f:
    pdf_text = f.read()

# 테스트 프롬프트 (실제 PDF 텍스트 사용)
test_prompt = f"""
다음 직업심리검사 결과를 분석해서 JSON 형식으로 응답해줘:

{pdf_text[:3000]}

다음 형식으로 응답:
{{
    "strengths": ["강점1", "강점2", "강점3"],
    "interests": ["흥미1", "흥미2"],
    "weakness": "약점"
}}
"""

print("🤖 OpenAI API 호출 중...")
print(f"모델: gpt-4o")
print("-" * 60)

# API 호출
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "너는 전문 커리어 카운슬러야. JSON 형식으로만 응답해."},
        {"role": "user", "content": test_prompt}
    ],
    temperature=0.3,
    max_tokens=1000
)

# 결과 출력
result = response.choices[0].message.content
response_dict = response.model_dump()
with open("response.json", "w", encoding="utf-8") as f:
    json.dump(response_dict, f, ensure_ascii=False, indent=2)

print("📝 응답:")
print(result)
print("-" * 60)
print(f"✅ 완료! (토큰 사용: {response.usage.total_tokens})")
