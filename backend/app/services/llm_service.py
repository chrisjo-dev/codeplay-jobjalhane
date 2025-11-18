"""
LLM 서비스 - OpenAI/Anthropic API 통합
"""
import json
import logging
from typing import Dict, Any
from app.core.config import settings
from app.core.prompts import PROFILE_ANALYSIS_PROMPT, CAREER_IDENTITY_PROMPT

logger = logging.getLogger(__name__)


class LLMService:
    """LLM API 호출 서비스"""

    def __init__(self):
        self.provider = settings.LLM_PROVIDER
        self.model = settings.LLM_MODEL

    async def analyze_profile(self, text: str, format_detected: str) -> Dict[str, Any]:
        """
        적성검사 텍스트를 분석하여 프로필 추출

        Args:
            text: PDF에서 추출된 텍스트
            format_detected: 감지된 적성검사 형식

        Returns:
            Dict[str, Any]: 분석 결과
        """
        try:
            # API 키가 없으면 Mock 데이터 반환 (개발/테스트용)
            if not settings.OPENAI_API_KEY and not settings.ANTHROPIC_API_KEY:
                logger.warning("API 키가 설정되지 않음 - Mock 데이터 반환")
                return self._get_mock_profile(format_detected)

            # 프롬프트 생성
            prompt = PROFILE_ANALYSIS_PROMPT.format(
                format_detected=format_detected,
                text=text[:3000]  # 토큰 제한을 위해 처음 3000자만 사용
            )

            # LLM 호출
            if self.provider == "openai":
                response = await self._call_openai(prompt)
            elif self.provider == "anthropic":
                response = await self._call_anthropic(prompt)
            else:
                raise ValueError(f"지원하지 않는 LLM 제공자: {self.provider}")

            # JSON 파싱
            profile_data = self._parse_json_response(response)

            return {
                "success": True,
                "profile": profile_data,
                "raw_response": response,
                "model_used": self.model
            }

        except Exception as e:
            logger.error(f"프로파일 분석 실패: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "profile": None,
                "raw_response": "",
                "model_used": self.model
            }

    async def _call_openai(self, prompt: str) -> str:
        """
        OpenAI API 호출

        Args:
            prompt: 프롬프트

        Returns:
            str: LLM 응답
        """
        try:
            from openai import AsyncOpenAI
            import httpx

            # httpx 0.28+ 버전과의 호환성을 위해 http_client 명시적으로 설정
            http_client = httpx.AsyncClient()
            client = AsyncOpenAI(
                api_key=settings.OPENAI_API_KEY,
                http_client=http_client
            )

            response = await client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "너는 전문 커리어 카운슬러야. JSON 형식으로만 응답해."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_completion_tokens=1000
            )

            await http_client.aclose()
            return response.choices[0].message.content

        except Exception as e:
            logger.error(f"OpenAI API 호출 실패: {str(e)}")
            raise

    async def _call_anthropic(self, prompt: str) -> str:
        """
        Anthropic API 호출

        Args:
            prompt: 프롬프트

        Returns:
            str: LLM 응답
        """
        try:
            from anthropic import AsyncAnthropic

            client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

            response = await client.messages.create(
                model=self.model,
                max_tokens=1000,
                temperature=0.3,
                system="너는 전문 커리어 카운슬러야. JSON 형식으로만 응답해.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            return response.content[0].text

        except Exception as e:
            logger.error(f"Anthropic API 호출 실패: {str(e)}")
            raise

    def _parse_json_response(self, response: str) -> Dict[str, Any]:
        """
        LLM 응답에서 JSON 추출 및 파싱

        Args:
            response: LLM 응답

        Returns:
            Dict[str, Any]: 파싱된 JSON 데이터
        """
        try:
            # JSON 블록 찾기 (```json ... ``` 형식도 처리)
            response = response.strip()

            # 코드 블록 제거
            if response.startswith("```"):
                lines = response.split("\n")
                response = "\n".join(lines[1:-1])

            # JSON 파싱
            data = json.loads(response)

            # 유효성 검증
            if "strengths" not in data or "interests" not in data or "weakness" not in data:
                raise ValueError("필수 필드가 누락되었습니다")

            if len(data["strengths"]) != 3:
                raise ValueError("strengths는 정확히 3개여야 합니다")

            if len(data["interests"]) != 2:
                raise ValueError("interests는 정확히 2개여야 합니다")

            return data

        except json.JSONDecodeError as e:
            logger.error(f"JSON 파싱 실패: {str(e)}\n응답: {response}")
            raise ValueError(f"LLM 응답을 JSON으로 파싱할 수 없습니다: {str(e)}")
        except Exception as e:
            logger.error(f"응답 처리 실패: {str(e)}")
            raise

    def _get_mock_profile(self, format_detected: str) -> Dict[str, Any]:
        """
        Mock 프로필 데이터 반환 (개발/테스트용)

        Args:
            format_detected: 감지된 적성검사 형식

        Returns:
            Dict[str, Any]: Mock 프로필 데이터
        """
        mock_profiles = {
            "직업선호도검사 (L형)": {
                "strengths": ["논리적 사고력", "문제 해결 능력", "분석력"],
                "interests": ["IT/기술", "데이터 분석"],
                "weakness": "대인관계 및 팀워크"
            },
            "워크넷 직업심리검사": {
                "strengths": ["창의력", "커뮤니케이션 능력", "리더십"],
                "interests": ["기획/마케팅", "예술/디자인"],
                "weakness": "시간 관리"
            },
            "커리어넷 진로탐색검사": {
                "strengths": ["꼼꼼함", "책임감", "성실성"],
                "interests": ["행정/사무", "교육/상담"],
                "weakness": "자기주도성"
            },
            "Unknown": {
                "strengths": ["논리적 사고", "창의성", "실행력"],
                "interests": ["기술", "비즈니스"],
                "weakness": "전문성 개발"
            }
        }

        # 형식에 맞는 Mock 데이터 선택
        profile_data = mock_profiles.get(format_detected, mock_profiles["Unknown"])

        mock_response = json.dumps(profile_data, ensure_ascii=False, indent=2)

        return {
            "success": True,
            "profile": profile_data,
            "raw_response": mock_response,
            "model_used": "mock-model (테스트용)"
        }

    async def analyze_career_identity(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        흥미·성격·생활사 데이터를 분석하여 직업정체성 추출

        Args:
            input_data: 흥미, 성격, 생활사 데이터

        Returns:
            Dict[str, Any]: 직업정체성 분석 결과
        """
        try:
            # API 키가 없으면 Mock 데이터 반환 (개발/테스트용)
            if not settings.OPENAI_API_KEY and not settings.ANTHROPIC_API_KEY:
                logger.warning("API 키가 설정되지 않음 - Mock 데이터 반환")
                return self._get_mock_career_identity()

            # 입력 데이터를 텍스트로 변환
            input_text = json.dumps(input_data, ensure_ascii=False, indent=2)

            # 프롬프트 생성
            prompt = CAREER_IDENTITY_PROMPT.format(input_data=input_text)

            # LLM 호출
            if self.provider == "openai":
                response = await self._call_openai_career_identity(prompt)
            elif self.provider == "anthropic":
                response = await self._call_anthropic_career_identity(prompt)
            else:
                raise ValueError(f"지원하지 않는 LLM 제공자: {self.provider}")

            # JSON 파싱
            career_identity_data = self._parse_career_identity_response(response)

            return {
                "success": True,
                "career_identity": career_identity_data["career_identity"],
                "rationale": career_identity_data["rationale"],
                "raw_response": response,
                "model_used": self.model
            }

        except Exception as e:
            logger.error(f"직업정체성 분석 실패: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "career_identity": None,
                "rationale": None,
                "raw_response": "",
                "model_used": self.model
            }

    async def _call_openai_career_identity(self, prompt: str) -> str:
        """
        OpenAI API 호출 (직업정체성 분석용)

        Args:
            prompt: 프롬프트

        Returns:
            str: LLM 응답
        """
        try:
            from openai import AsyncOpenAI
            import httpx

            http_client = httpx.AsyncClient()
            client = AsyncOpenAI(
                api_key=settings.OPENAI_API_KEY,
                http_client=http_client
            )

            response = await client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "너는 전문 커리어심리 분석가야. JSON 형식으로만 응답해."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,  # 창의적인 문장 생성을 위해 temperature 높임
                max_completion_tokens=2000   # 더 긴 응답을 위해 토큰 수 증가
            )

            await http_client.aclose()
            return response.choices[0].message.content

        except Exception as e:
            logger.error(f"OpenAI API 호출 실패: {str(e)}")
            raise

    async def _call_anthropic_career_identity(self, prompt: str) -> str:
        """
        Anthropic API 호출 (직업정체성 분석용)

        Args:
            prompt: 프롬프트

        Returns:
            str: LLM 응답
        """
        try:
            from anthropic import AsyncAnthropic

            client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

            response = await client.messages.create(
                model=self.model,
                max_tokens=2000,
                temperature=0.7,
                system="너는 전문 커리어심리 분석가야. JSON 형식으로만 응답해.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            return response.content[0].text

        except Exception as e:
            logger.error(f"Anthropic API 호출 실패: {str(e)}")
            raise

    def _parse_career_identity_response(self, response: str) -> Dict[str, Any]:
        """
        LLM 응답에서 직업정체성 JSON 추출 및 파싱

        Args:
            response: LLM 응답

        Returns:
            Dict[str, Any]: 파싱된 JSON 데이터
        """
        try:
            # JSON 블록 찾기 (```json ... ``` 형식도 처리)
            response = response.strip()

            # 코드 블록 제거
            if response.startswith("```"):
                lines = response.split("\n")
                response = "\n".join(lines[1:-1])

            # JSON 파싱
            data = json.loads(response)

            # 유효성 검증
            if "career_identity" not in data or "rationale" not in data:
                raise ValueError("필수 필드가 누락되었습니다")

            return data

        except json.JSONDecodeError as e:
            logger.error(f"JSON 파싱 실패: {str(e)}\n응답: {response}")
            raise ValueError(f"LLM 응답을 JSON으로 파싱할 수 없습니다: {str(e)}")
        except Exception as e:
            logger.error(f"응답 처리 실패: {str(e)}")
            raise

    def _get_mock_career_identity(self) -> Dict[str, Any]:
        """
        Mock 직업정체성 데이터 반환 (개발/테스트용)

        Returns:
            Dict[str, Any]: Mock 직업정체성 데이터
        """
        mock_data = {
            "career_identity": "이 사람은 탐구형(I) 성향이 높아 복잡한 문제를 논리적으로 분석하는 일을 선호하며, 마치 퍼즐을 먼저 분석한 뒤 어떻게 완성할지 바로 계획을 세우는 사람에 가깝다. 성실성의 책임감(92점)과 계획성(85점)이 결합되어 체계적으로 목표를 달성하는 성향을 보이며, 정서적으로는 신경성의 스트레스 취약성(39점)이 낮아 압박 상황에서도 안정적으로 업무를 수행할 수 있다. 개방성의 지적 호기심(88점)은 새로운 기술과 지식을 끊임없이 학습하려는 동기로 작용하며, 생활사 검사에서 나타난 기술/IT 경험(85점)은 이러한 성향이 실제 경험으로 축적되어 왔음을 보여준다. 우호성의 타인에 대한 배려(85점)는 팀 내에서 협력적이면서도 분석적인 역할을 수행하는 데 강점으로 작용할 수 있다. 이러한 성향은 데이터 분석, 백엔드 개발, AI/ML 엔지니어링, 연구 개발 등 체계적 분석과 기술 역량이 함께 요구되는 영역에서 흔히 관찰된다.",
            "rationale": "- RIASEC 이론: 탐구형(I) 88점을 중심으로 흥미 패턴 분석\n- Big Five 성격 이론: 성실성, 개방성, 신경성의 하위 요인을 통합적으로 해석\n- 생활사 검사: 기술/IT 경험을 중심으로 실제 경험 패턴 분석\n- 교차 분석: 흥미·성격·생활사 데이터를 통합하여 일관된 성향 패턴 도출\n- 해석 원칙: 관찰 중심의 전문가 톤 유지, 비유와 예시를 통한 이해 증진"
        }

        mock_response = json.dumps(mock_data, ensure_ascii=False, indent=2)

        return {
            "success": True,
            "career_identity": mock_data["career_identity"],
            "rationale": mock_data["rationale"],
            "raw_response": mock_response,
            "model_used": "mock-model (테스트용)"
        }
