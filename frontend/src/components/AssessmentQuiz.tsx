import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ArrowLeft, Send } from "lucide-react";

interface AssessmentQuizProps {
  onNavigate: (screen: string) => void;
}

interface Question {
  id: number;
  text: string;
  category: string;
}

export function AssessmentQuiz({ onNavigate }: AssessmentQuizProps) {
  const [responses, setResponses] = useState<Record<number, number>>({});

  const questions: Question[] = [
    { id: 1, text: "손이나 도구를 사용해 무언가를 만들거나 수리하는 일", category: "R" },
    { id: 2, text: "기계나 장비를 다루고 조작하는 활동", category: "R" },
    { id: 3, text: "야외에서 신체를 활발히 움직이는 작업", category: "R" },
    { id: 4, text: "실험을 설계하고 데이터를 수집하여 분석하는 일", category: "I" },
    { id: 5, text: "복잡한 문제를 논리적으로 해결하는 활동", category: "I" },
    { id: 6, text: "새로운 지식을 탐구하고 연구하는 일", category: "I" },
    { id: 7, text: "그림, 음악, 글 등 예술 작품을 창작하는 활동", category: "A" },
    { id: 8, text: "독창적이고 자유로운 방식으로 아이디어를 표현하는 일", category: "A" },
    { id: 9, text: "심미적 감각을 발휘하여 디자인하는 활동", category: "A" },
    { id: 10, text: "다른 사람을 돕고 지원하는 봉사 활동", category: "S" },
    { id: 11, text: "사람들을 가르치거나 교육하는 일", category: "S" },
    { id: 12, text: "타인의 문제를 듣고 상담해주는 활동", category: "S" },
    { id: 13, text: "사람들을 설득하고 영향력을 행사하는 일", category: "E" },
    { id: 14, text: "조직이나 프로젝트를 관리하고 리드하는 활동", category: "E" },
    { id: 15, text: "비즈니스 기회를 포착하고 판매하는 일", category: "E" },
    { id: 16, text: "정해진 절차에 따라 데이터를 정리하고 기록하는 활동", category: "C" },
    { id: 17, text: "세밀하게 문서를 작성하고 관리하는 일", category: "C" },
    { id: 18, text: "체계적으로 정보를 분류하고 보관하는 활동", category: "C" },
    { id: 19, text: "컴퓨터 프로그램을 코딩하고 개발하는 일", category: "I" },
    { id: 20, text: "수학적 모델을 만들어 시뮬레이션하는 활동", category: "I" },
    { id: 21, text: "팀원들과 협력하여 공동 목표를 달성하는 일", category: "S" },
    { id: 22, text: "고객의 요구사항을 파악하고 맞춤 솔루션을 제공하는 활동", category: "E" },
    { id: 23, text: "시각적 콘텐츠를 기획하고 제작하는 일", category: "A" },
    { id: 24, text: "물리적 환경을 설계하고 구축하는 활동", category: "R" },
    { id: 25, text: "데이터를 시각화하고 인사이트를 도출하는 일", category: "I" },
    { id: 26, text: "사회적 이슈에 관심을 갖고 개선 방안을 모색하는 활동", category: "S" },
    { id: 27, text: "예산을 계획하고 재무를 관리하는 일", category: "C" },
    { id: 28, text: "전략을 수립하고 의사결정을 내리는 활동", category: "E" },
    { id: 29, text: "창의적인 스토리를 구성하고 전달하는 일", category: "A" },
    { id: 30, text: "규칙과 표준을 준수하며 품질을 검사하는 활동", category: "C" }
  ];

  const scaleOptions = [
    { value: 1, label: "매우 싫음" },
    { value: 2, label: "싫음" },
    { value: 3, label: "보통" },
    { value: 4, label: "좋음" },
    { value: 5, label: "매우 좋음" }
  ];

  const handleResponse = (questionId: number, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length === questions.length) {
      onNavigate('results');
    } else {
      alert(`모든 문항에 응답해주세요. (${Object.keys(responses).length}/30 완료)`);
    }
  };

  const progress = (Object.keys(responses).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#0066FF]/10 blue-glow">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="text-[#0066FF] hover:text-[#0066FF]/80 hover:bg-[#0066FF]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Button>
          </div>
          
          <h1 className="text-[#1a1a2e] mb-2">직업 데이터 수집 (30문항)</h1>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-[#f0f4ff]" />
            <div className="flex justify-between">
              <p className="text-gray-600">진행률: {Math.round(progress)}%</p>
              <p className="text-[#0066FF]">{Object.keys(responses).length}/30 완료</p>
            </div>
          </div>
        </div>
      </header>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="elegant-panel p-6 mb-12">
          <p className="text-[#1a1a2e]">
            <span className="text-[#0066FF]">데이터 입력:</span> 각 문항은 어떠한 활동이나 상황을 설명합니다. 
            당신이 그 활동을 <span className="text-[#00A8FF]">얼마나 좋아하거나 싫어하는지</span> 솔직하게 응답해 주세요.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8 mb-12">
          {questions.map((question) => (
            <div
              key={question.id}
              className="modern-card p-6 hover:blue-glow-strong transition-all"
            >
              {/* Question Number and Text */}
              <div className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF]">
                    {question.id}
                  </div>
                  <p className="text-[#1a1a2e] pt-2">{question.text}</p>
                </div>
              </div>

              {/* Response Scale */}
              <div className="grid grid-cols-5 gap-3">
                {scaleOptions.map((option) => {
                  const isSelected = responses[question.id] === option.value;
                  const getColor = () => {
                    if (option.value <= 2) return '#ef4444';
                    if (option.value === 3) return '#6b7280';
                    return '#0066FF';
                  };
                  const color = getColor();

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleResponse(question.id, option.value)}
                      className={`py-4 px-2 border-2 rounded-xl transition-all ${
                        isSelected
                          ? 'text-white shadow-lg'
                          : 'bg-white text-[#1a1a2e] hover:bg-gray-50'
                      }`}
                      style={{
                        borderColor: isSelected ? color : 'rgba(0, 102, 255, 0.2)',
                        backgroundColor: isSelected ? color : undefined,
                      }}
                    >
                      <div className="text-center">
                        <div className="mb-1">{option.value}</div>
                        <div className="text-xs opacity-80">{option.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-6 z-40">
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length < questions.length}
            className="w-full h-16 gradient-blue hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group rounded-xl blue-glow-strong"
          >
            <Send className="w-5 h-5 mr-3" />
            <span className="relative z-10">데이터 전송 (검사 결과 제출)</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </Button>
        </div>
      </div>
    </div>
  );
}
