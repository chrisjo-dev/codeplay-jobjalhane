# Job Jal Hada - Frontend

React + Vite 기반 프론트엔드

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 http://localhost:3000 에서 접근 가능합니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 4. 프로덕션 미리보기

```bash
npm run preview
```

## 기능

### MVP 1단계: PDF 업로드 및 텍스트 추출

- PDF 파일 드래그 앤 드롭 지원
- PDF 파일 선택 및 업로드
- 실시간 업로드 상태 표시
- 추출된 텍스트 미리보기
- 지원하는 적성검사 형식 표시
- 에러 처리 및 사용자 피드백

## 프로젝트 구조

```
frontend/
├── src/
│   ├── components/
│   │   ├── PDFUploader.jsx      # PDF 업로드 컴포넌트
│   │   └── PDFUploader.css      # 스타일
│   ├── App.jsx                  # 메인 앱 컴포넌트
│   ├── App.css                  # 앱 스타일
│   ├── main.jsx                 # 진입점
│   └── index.css                # 글로벌 스타일
├── index.html                   # HTML 템플릿
├── package.json                 # 의존성 및 스크립트
├── vite.config.js              # Vite 설정
└── README.md                    # 이 파일
```

## 기술 스택

- **React 18**: UI 라이브러리
- **Vite**: 빌드 도구 및 개발 서버
- **Axios**: HTTP 클라이언트
- **CSS3**: 스타일링

## API 연동

백엔드 API (http://localhost:8000)와 연동:

- `GET /api/supported-formats`: 지원하는 적성검사 형식 조회
- `POST /api/upload-pdf`: PDF 업로드 및 텍스트 추출

Vite의 프록시 설정을 통해 CORS 문제를 해결했습니다.

## 다음 단계

- [ ] 적성 프로파일 분석 결과 표시
- [ ] 직업 추천 UI
- [ ] 로드맵 시각화
- [ ] 사용자 인증
- [ ] 히스토리 관리
