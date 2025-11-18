# Job Jal Hada - Backend

FastAPI 기반 백엔드 서버

## 설치 및 실행

### 1. 가상환경 생성 및 활성화

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
# 또는
venv\Scripts\activate  # Windows
```

### 2. 의존성 설치

```bash
pip install -r requirements.txt
```

### 3. 환경변수 설정

```bash
cp .env.example .env
# .env 파일을 필요에 따라 수정
```

### 4. 서버 실행

```bash
# 개발 모드 (자동 재시작)
python main.py

# 또는
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

서버가 실행되면 다음 주소에서 접근 가능합니다:
- API: http://localhost:8000
- API 문서 (Swagger): http://localhost:8000/docs
- API 문서 (ReDoc): http://localhost:8000/redoc

## API 엔드포인트

### 1. 헬스 체크
```bash
# 서버 상태 확인
curl http://localhost:8000/
curl http://localhost:8000/api/health
```

**응답:**
```json
{
  "status": "healthy",
  "message": "Job Jal Hada API is running"
}
```

---

### 2. 지원하는 형식 조회
```bash
# 지원하는 적성검사 형식 목록 조회
curl http://localhost:8000/api/supported-formats
```

**응답:**
```json
{
  "supported_formats": [
    "워크넷 직업심리검사",
    "커리어넷 진로탐색검사",
    "직업선호도검사 (L형)"
  ],
  "count": 3
}
```

---

### 3. PDF 업로드 및 텍스트 추출
```bash
# PDF 파일 업로드 및 텍스트 추출
curl -X POST http://localhost:8000/api/upload-pdf \
  -F "file=@/path/to/your/test.pdf"
```

**요청:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- 파라미터:
  - `file`: PDF 파일 (최대 10MB)

**응답:**
```json
{
  "success": true,
  "filename": "직업심리검사(L형).pdf",
  "saved_filename": "20251115_093655_1642d76b.pdf",
  "file_path": "uploads/20251115_093655_1642d76b.pdf",
  "file_size": 289908,
  "text": "직업심리검사 결과\n직업선호도검사 (L형) 결과...",
  "total_pages": 5,
  "format_detected": "직업선호도검사 (L형)",
  "is_supported_format": true,
  "preview": "직업심리검사 결과\n직업선호도검사...(처음 500자)",
  "extracted_text_path": "extracted/20251115_093655_1642d76b.txt"
}
```

---

### 4. LLM 기반 적성 프로파일 분석
```bash
# 추출된 텍스트를 LLM으로 분석하여 프로파일 생성
curl -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "text": "현실형(R): 70점, 탐구형(I): 83점, 예술형(A): 52점...",
    "format_detected": "직업선호도검사 (L형)"
  }'
```

**요청:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
  - `text` (string, required): PDF에서 추출된 텍스트
  - `format_detected` (string, required): 감지된 적성검사 형식

**응답:**
```json
{
  "success": true,
  "profile": {
    "strengths": [
      "논리적 사고력",
      "문제 해결 능력",
      "분석적 사고"
    ],
    "interests": [
      "과학/연구",
      "기술 개발"
    ],
    "weakness": "창의력"
  },
  "model_used": "gpt-4o",
  "processing_time": 2.15
}
```

---

### 전체 플로우 예제 (PDF 업로드 → 프로파일 분석)

```bash
#!/bin/bash

# Step 1: PDF 업로드 및 텍스트 추출
echo "1. PDF 업로드 중..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:8000/api/upload-pdf \
  -F "file=@직업심리검사.pdf")

echo "$UPLOAD_RESPONSE" | python -m json.tool

# 추출된 텍스트와 형식 가져오기
TEXT=$(echo "$UPLOAD_RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin)['text'])")
FORMAT=$(echo "$UPLOAD_RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin)['format_detected'])")

echo -e "\n2. LLM 프로파일 분석 중..."

# Step 2: LLM 프로파일 분석
PROFILE_RESPONSE=$(curl -s -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": $(echo "$TEXT" | python -c "import sys, json; print(json.dumps(sys.stdin.read()[:3000]))"),
    \"format_detected\": \"$FORMAT\"
  }")

echo "$PROFILE_RESPONSE" | python -m json.tool

echo -e "\n완료!"
```

## 지원하는 적성검사 형식

현재 MVP에서는 다음 형식을 지원합니다:
1. 워크넷 직업심리검사
2. 커리어넷 진로탐색검사
3. 직업선호도검사 (L형)

## LLM 설정

### OpenAI GPT-4o 사용 (기본)

`.env` 파일에 다음 설정을 추가:

```bash
# LLM API 설정
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o
```

### Anthropic Claude 사용 (선택사항)

```bash
# LLM API 설정
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
LLM_PROVIDER=anthropic
LLM_MODEL=claude-3-5-sonnet-20241022
```

### 지원하는 모델

**OpenAI:**
- `gpt-4o` (추천)
- `gpt-4o-mini`
- `gpt-4-turbo`

**Anthropic:**
- `claude-3-5-sonnet-20241022` (추천)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`

## 개발 가이드

### 프로젝트 구조 (MVC 패턴)

```
backend/
├── main.py                     # FastAPI 메인 애플리케이션 (진입점)
├── requirements.txt            # Python 의존성
├── .env                        # 환경변수 (git ignore)
├── app/                        # 애플리케이션 패키지
│   ├── __init__.py
│   ├── controllers/            # 컨트롤러 (라우터/엔드포인트)
│   │   ├── __init__.py
│   │   ├── pdf_controller.py  # PDF 업로드/추출 API
│   │   └── profile_controller.py  # LLM 프로파일 분석 API
│   ├── services/               # 서비스 (비즈니스 로직)
│   │   ├── __init__.py
│   │   ├── pdf_service.py     # PDF 처리 로직
│   │   └── llm_service.py     # LLM API 통합
│   ├── models/                 # 데이터 모델 (Pydantic)
│   │   ├── __init__.py
│   │   ├── pdf_models.py      # PDF 관련 모델
│   │   └── profile_models.py  # 프로파일 관련 모델
│   └── core/                   # 핵심 설정
│       ├── __init__.py
│       ├── config.py           # 설정 관리
│       └── prompts.py          # LLM 프롬프트 템플릿
├── uploads/                    # 업로드된 PDF 저장
├── extracted/                  # 추출된 텍스트 저장
└── README.md                   # 이 파일
```

### MVC 패턴 설명

**Controllers (컨트롤러)**
- API 엔드포인트 정의
- 요청 유효성 검사
- 응답 반환
- 예: `pdf_controller.py`, `profile_controller.py`

**Services (서비스)**
- 비즈니스 로직 구현
- PDF 처리, LLM API 호출 등
- 예: `pdf_service.py`, `llm_service.py`

**Models (모델)**
- 데이터 스키마 정의 (Pydantic)
- 요청/응답 형식 정의
- 예: `pdf_models.py`, `profile_models.py`

**Core (코어)**
- 애플리케이션 설정
- 환경 변수 관리
- LLM 프롬프트 템플릿
- 예: `config.py`, `prompts.py`

### 주요 기능 구현

#### 1. PDF 처리 (`app/services/pdf_service.py`)
- `pdfplumber` 라이브러리를 사용하여 PDF에서 텍스트 추출
- 첫 페이지를 분석하여 적성검사 형식 자동 감지
- 업로드된 파일 저장 (`uploads/`) 및 추출된 텍스트 저장 (`extracted/`)

#### 2. LLM 프로파일 분석 (`app/services/llm_service.py`)
- OpenAI GPT-4o 또는 Anthropic Claude API 통합
- 적성검사 텍스트를 분석하여 구조화된 프로파일 생성
- JSON 응답 파싱 및 유효성 검증

#### 3. 프롬프트 엔지니어링 (`app/core/prompts.py`)
- 20년차 커리어 카운슬러 페르소나
- 강점 3개, 흥미분야 2개, 약점 1개 추출
- JSON 형식으로 구조화된 응답 생성

## 구현 완료된 기능

- [x] PDF 업로드 및 텍스트 추출
- [x] 적성검사 형식 자동 감지
- [x] LLM API 연동 (GPT-4o/Claude 3)
- [x] 적성 프로파일링 기능
- [x] OpenAI httpx 0.28+ 호환성 수정

## 다음 단계

- [ ] 직업 추천 엔진 (RIASEC 기반)
- [ ] 로드맵 생성 기능
- [ ] 데이터베이스 연동 (PostgreSQL)
- [ ] 사용자 인증 시스템
