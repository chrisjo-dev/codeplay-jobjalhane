"""
FastAPI 백엔드 메인 애플리케이션 (MVC 패턴 적용)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.controllers import pdf_router, profile_router
import logging

# 로깅 설정
logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

# FastAPI 앱 생성
app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(pdf_router)
app.include_router(profile_router)


@app.get("/")
async def root():
    """헬스 체크 엔드포인트"""
    return {
        "message": f"{settings.APP_NAME} is running",
        "version": settings.APP_VERSION,
        "status": "healthy"
    }


@app.get("/api/health")
async def health_check():
    """서비스 상태 확인"""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
