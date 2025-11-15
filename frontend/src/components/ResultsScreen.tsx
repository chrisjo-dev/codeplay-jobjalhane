import { ArrowLeft, Sparkles, TrendingUp, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ResultsScreenProps {
  onNavigate: (screen: string) => void;
}

export function ResultsScreen({ onNavigate }: ResultsScreenProps) {
  const keywords = [
    { text: "#분석적", color: "#0066FF" },
    { text: "#탐구형", color: "#00A8FF" },
    { text: "#현실적", color: "#4DA6FF" },
    { text: "#논리적", color: "#0052CC" },
    { text: "#데이터지향", color: "#0066FF" }
  ];

  const jobRecommendations = [
    {
      title: "데이터 분석가",
      code: "I (탐구형)",
      description: "데이터를 수집, 분석하여 비즈니스 인사이트를 도출하는 전문가",
      match: 95,
      color: "#0066FF"
    },
    {
      title: "소프트웨어 엔지니어",
      code: "I (탐구형)",
      description: "프로그래밍을 통해 소프트웨어 솔루션을 개발하고 구현하는 전문가",
      match: 88,
      color: "#00A8FF"
    },
    {
      title: "AI/머신러닝 엔지니어",
      code: "I (탐구형)",
      description: "인공지능 모델을 설계하고 학습시켜 지능형 시스템을 구축하는 전문가",
      match: 85,
      color: "#4DA6FF"
    }
  ];

  return (
    <div className="min-h-screen bg-white geometric-grid-light">
      {/* Header */}
      <header className="border-b border-[#0066FF]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50 blue-glow">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-[#0066FF] hover:text-[#0066FF]/80 hover:bg-[#0066FF]/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로
          </Button>
          <h1 className="text-gradient-blue">AI 분석 완료</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Section 1: Keywords */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#1a1a2e]">AI 분석 결과: 당신의 코어 퍼스낼리티</h2>
            </div>
            <div className="h-1 w-32 gradient-blue rounded-full"></div>
          </div>

          <div className="flex flex-wrap gap-4">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-xl border-2 text-white transition-all hover:scale-105 cursor-pointer"
                style={{
                  borderColor: keyword.color,
                  backgroundColor: keyword.color,
                  boxShadow: `0 4px 20px ${keyword.color}40`
                }}
              >
                {keyword.text}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: AI Generated Illustration */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DA6FF] to-[#0066FF] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#1a1a2e]">AI 생성 비주얼 프로필</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-[#4DA6FF] to-[#0066FF] rounded-full"></div>
          </div>

          <div className="relative aspect-video max-w-3xl mx-auto rounded-3xl overflow-hidden modern-card p-8 blue-glow-strong">
            {/* Main Content Area */}
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-6 p-8">
                <div className="w-32 h-32 mx-auto rounded-full gradient-blue flex items-center justify-center relative overflow-hidden float-animation">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <Sparkles className="w-16 h-16 text-white relative z-10" />
                </div>
                <div className="space-y-3">
                  <p className="text-[#0066FF]">AI Generated Professional Portrait</p>
                  <p className="text-[#1a1a2e]">당신의 디지털 프로필 초상화</p>
                  <p className="text-gray-500">맞춤형 비주얼 아이덴티티</p>
                </div>
                <div className="flex justify-center gap-3">
                  <div className="w-3 h-3 bg-[#0066FF] rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-[#00A8FF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-[#4DA6FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#0066FF] rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#00A8FF] rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#4DA6FF] rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#0066FF] rounded-br-xl"></div>
          </div>
        </section>

        {/* Section 3: Job Recommendations */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#4DA6FF] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#1a1a2e]">최적화된 직무 OPTIMAL ROLES</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-[#00A8FF] to-[#4DA6FF] rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {jobRecommendations.map((job, index) => (
              <div
                key={index}
                className="modern-card p-6 hover:scale-105 transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => onNavigate('roadmap')}
              >
                {/* Gradient Background on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${job.color}, transparent)` }}
                ></div>

                <div className="relative z-10 space-y-4">
                  {/* Match Percentage */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[#0066FF]/30 text-gray-700 rounded-lg">
                      {job.code}
                    </Badge>
                    <div className="text-right">
                      <div className="text-3xl" style={{ color: job.color }}>
                        {job.match}%
                      </div>
                      <div className="text-xs text-gray-500">매칭률</div>
                    </div>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-[#1a1a2e]">{job.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600">{job.description}</p>

                  {/* CTA */}
                  <div className="pt-4 border-t border-[#0066FF]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">로드맵 보기</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-[#0066FF] transition-colors" style={{ backgroundColor: `${job.color}20` }}>
                        <span className="group-hover:text-white transition-colors" style={{ color: job.color }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-[#0066FF]/10 pt-12">
          <div className="max-w-2xl mx-auto text-center space-y-6 elegant-panel p-12">
            <h3 className="text-[#1a1a2e]">다음 단계: 성장 경로 설계</h3>
            <p className="text-gray-600">
              추천된 직무의 상세한 로드맵을 확인하고, 당신만의 커리어 여정을 시작하세요.
            </p>
            <Button
              onClick={() => onNavigate('roadmap')}
              className="gradient-blue hover:opacity-90 text-white px-8 py-6 rounded-xl blue-glow-strong"
            >
              로드맵 페이지로 이동
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
