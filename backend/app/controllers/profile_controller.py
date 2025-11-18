"""
프로파일링 컨트롤러 - API 엔드포인트 레이어
"""
from fastapi import APIRouter, HTTPException
from app.services import LLMService
from app.models import (
    ProfileAnalysisRequest,
    ProfileAnalysisResponse,
    UserProfile,
    CareerIdentityRequest,
    CareerIdentityResponse
)
import logging

logger = logging.getLogger(__name__)

# 라우터 생성
router = APIRouter(
    prefix="/api",
    tags=["Profile"]
)

# 서비스 인스턴스
llm_service = LLMService()


@router.post("/analyze-profile", response_model=ProfileAnalysisResponse)
async def analyze_profile(request: ProfileAnalysisRequest):
    """
    적성검사 텍스트를 분석하여 사용자 프로필을 추출합니다.

    Args:
        request: 프로필 분석 요청 (text, format_detected)

    Returns:
        ProfileAnalysisResponse: 추출된 프로필 정보
    """
    try:
        logger.info(f"프로필 분석 시작 - 형식: {request.format_detected}")

        # LLM을 통한 프로필 분석
        result = await llm_service.analyze_profile(
            text=request.text,
            format_detected=request.format_detected
        )

        if not result["success"]:
            raise HTTPException(
                status_code=500,
                detail=f"프로필 분석 실패: {result.get('error', 'Unknown error')}"
            )

        # 응답 데이터 구성
        profile = UserProfile(**result["profile"])

        response = ProfileAnalysisResponse(
            success=True,
            profile=profile,
            raw_response=result["raw_response"],
            model_used=result["model_used"]
        )

        logger.info(f"프로필 분석 완료 - 모델: {result['model_used']}")

        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"프로필 분석 중 오류: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"프로필 분석 중 오류가 발생했습니다: {str(e)}"
        )


@router.post("/analyze-career-identity", response_model=CareerIdentityResponse)
async def analyze_career_identity(request: CareerIdentityRequest):
    """
    흥미·성격·생활사 데이터를 분석하여 직업정체성을 추출합니다.

    Args:
        request: 직업정체성 분석 요청 (riasec_scores, big5_scores, life_history_scores)

    Returns:
        CareerIdentityResponse: 직업정체성 문단 및 근거
    """
    try:
        logger.info("직업정체성 분석 시작")

        # 입력 데이터 구조화
        input_data = {
            "riasec_scores": request.riasec_scores,
            "big5_scores": request.big5_scores,
            "life_history_scores": request.life_history_scores
        }

        # LLM을 통한 직업정체성 분석
        result = await llm_service.analyze_career_identity(input_data=input_data)

        if not result["success"]:
            raise HTTPException(
                status_code=500,
                detail=f"직업정체성 분석 실패: {result.get('error', 'Unknown error')}"
            )

        # 응답 데이터 구성
        response = CareerIdentityResponse(
            success=True,
            career_identity=result["career_identity"],
            rationale=result["rationale"],
            raw_response=result["raw_response"],
            model_used=result["model_used"]
        )

        logger.info(f"직업정체성 분석 완료 - 모델: {result['model_used']}")

        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"직업정체성 분석 중 오류: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"직업정체성 분석 중 오류가 발생했습니다: {str(e)}"
        )
