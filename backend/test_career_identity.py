"""
AI 통합 성향 프로파일링 API 테스트
"""
import asyncio
import json
from app.services.llm_service import LLMService


async def test_career_identity():
    """직업정체성 분석 테스트"""

    # 테스트 데이터
    test_data = {
        "riasec_scores": {
            "R": 70,
            "I": 88,
            "A": 52,
            "S": 58,
            "E": 55,
            "C": 78
        },
        "big5_scores": {
            "개방성": {
                "score": 82,
                "subFactors": {
                    "상상력": 78,
                    "예술적 감수성": 75,
                    "지적 호기심": 88
                }
            },
            "성실성": {
                "score": 88,
                "subFactors": {
                    "책임감": 92,
                    "계획성": 85,
                    "자기 규율": 87
                }
            },
            "외향성": {
                "score": 65,
                "subFactors": {
                    "사교성": 70,
                    "활동성": 62,
                    "긍정성": 68
                }
            },
            "우호성": {
                "score": 75,
                "subFactors": {
                    "타인에 대한 배려": 85,
                    "협력성": 72,
                    "겸손": 68
                }
            },
            "신경성": {
                "score": 45,
                "subFactors": {
                    "스트레스 취약성": 39,
                    "우울": 42,
                    "불안": 48
                }
            }
        },
        "life_history_scores": {
            "학업 성취": 78,
            "예술적 경험": 72,
            "리더십 경험": 68,
            "봉사 활동": 82,
            "기술/IT 경험": 85
        }
    }

    # LLM 서비스 초기화
    llm_service = LLMService()

    print("=" * 80)
    print("AI 통합 성향 프로파일링 테스트")
    print("=" * 80)
    print("\n[입력 데이터]")
    print(json.dumps(test_data, ensure_ascii=False, indent=2))
    print("\n" + "=" * 80)

    # 직업정체성 분석 실행
    print("\n[분석 시작]")
    result = await llm_service.analyze_career_identity(test_data)

    print("\n" + "=" * 80)
    print("[분석 결과]")
    print("=" * 80)

    if result["success"]:
        print(f"\n✅ 분석 성공")
        print(f"📊 사용 모델: {result['model_used']}")
        print("\n" + "-" * 80)
        print("직업정체성:")
        print("-" * 80)
        print(result["career_identity"])
        print("\n" + "-" * 80)
        print("근거 및 해석 기준:")
        print("-" * 80)
        print(result["rationale"])
        print("\n" + "=" * 80)
    else:
        print(f"\n❌ 분석 실패: {result.get('error', 'Unknown error')}")

    return result


if __name__ == "__main__":
    asyncio.run(test_career_identity())
