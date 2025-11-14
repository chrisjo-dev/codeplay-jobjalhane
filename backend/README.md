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
```
GET /
GET /api/health
```

### 2. 지원하는 형식 조회
```
GET /api/supported-formats
```

### 3. PDF 업로드 및 텍스트 추출
```
POST /api/upload-pdf
Content-Type: multipart/form-data

파라미터:
- file: PDF 파일 (최대 10MB)

응답:
{
  "success": true,
  "filename": "test.pdf",
  "text": "추출된 전체 텍스트...",
  "total_pages": 5,
  "format_detected": "워크넷 직업심리검사",
  "is_supported_format": true,
  "preview": "처음 500자..."
}
```

## 지원하는 적성검사 형식

현재 MVP에서는 다음 형식을 지원합니다:
1. 워크넷 직업심리검사
2. 커리어넷 진로탐색검사

## 개발 가이드

### 프로젝트 구조 (MVC 패턴)

```
backend/
├── main.py                  # FastAPI 메인 애플리케이션 (진입점)
├── requirements.txt         # Python 의존성
├── .env.example            # 환경변수 예제
├── app/                    # 애플리케이션 패키지
│   ├── __init__.py
│   ├── controllers/        # 컨트롤러 (라우터/엔드포인트)
│   │   ├── __init__.py
│   │   └── pdf_controller.py
│   ├── services/           # 서비스 (비즈니스 로직)
│   │   ├── __init__.py
│   │   └── pdf_service.py
│   ├── models/             # 데이터 모델 (Pydantic)
│   │   ├── __init__.py
│   │   └── pdf_models.py
│   └── core/               # 핵심 설정
│       ├── __init__.py
│       └── config.py
└── README.md              # 이 파일
```

### MVC 패턴 설명

**Controllers (컨트롤러)**
- API 엔드포인트 정의
- 요청 유효성 검사
- 응답 반환
- 예: `pdf_controller.py`

**Services (서비스)**
- 비즈니스 로직 구현
- PDF 처리, 데이터 변환 등
- 예: `pdf_service.py`

**Models (모델)**
- 데이터 스키마 정의 (Pydantic)
- 요청/응답 형식 정의
- 예: `pdf_models.py`

**Core (코어)**
- 애플리케이션 설정
- 환경 변수 관리
- 예: `config.py`

### PDF 처리 로직

`app/services/pdf_service.py`의 `PDFService` 클래스는:
- `pdfplumber` 라이브러리를 사용하여 PDF에서 텍스트 추출
- 첫 페이지를 분석하여 적성검사 형식 자동 감지
- 페이지별 텍스트와 메타데이터 반환

## 다음 단계

- [ ] LLM API 연동 (GPT-4o/Claude 3)
- [ ] 적성 프로파일링 기능
- [ ] 직업 추천 엔진
- [ ] 로드맵 생성 기능
