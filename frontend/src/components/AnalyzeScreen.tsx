import { Sparkles, TrendingUp, Code, Palette, BarChart3, Cpu, Users, ChevronRight, FileText, Brain, Tag, Plus, X, Briefcase, Award, Target, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { LogoCompact } from "./Logo";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AnalyzeScreenProps {
  onNavigate: (screen: 'home' | 'assessment' | 'results' | 'roadmap' | 'analyze', fileName?: string, step?: string) => void;
  uploadedFileName?: string;
  initialStep?: 'analysis' | 'recommendations';
  onStepChange?: (step: 'analysis' | 'recommendations') => void;
}

export function AnalyzeScreen({ onNavigate, uploadedFileName, initialStep = 'analysis', onStepChange }: AnalyzeScreenProps) {
  const [step, setStep] = useState<'analysis' | 'recommendations'>(initialStep);
  const [additionalKeywords, setAdditionalKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // RIASEC interest test data
  const radarData = [
    { subject: '현실형(R)', score: 75, fullMark: 100 },
    { subject: '탐구형(I)', score: 88, fullMark: 100 },
    { subject: '예술형(A)', score: 65, fullMark: 100 },
    { subject: '사회형(S)', score: 68, fullMark: 100 },
    { subject: '진취형(E)', score: 72, fullMark: 100 },
    { subject: '관습형(C)', score: 78, fullMark: 100 }
  ];

  // Big5 personality test data (with sub-factors)
  const comparisonData = [
    { name: '개방성', score: 82, subFactors: { '상상력': 78, '예술적 감수성': 75, '지적 호기심': 88 } },
    { name: '성실성', score: 88, subFactors: { '책임감': 92, '계획성': 85, '자기 규율': 87 } },
    { name: '외향성', score: 65, subFactors: { '사교성': 70, '활동성': 62, '긍정성': 68 } },
    { name: '우호성', score: 75, subFactors: { '타인에 대한 배려': 85, '협력성': 72, '겸손': 68 } },
    { name: '신경성', score: 45, subFactors: { '스트레스 취약성': 39, '우울': 42, '불안': 48 } }
  ];

  // 생활사 검사 데이터 (Life History Assessment)
  const lifeHistoryData = [
    { area: '학업 성취', score: 78, icon: '📚' },
    { area: '예술적 경험', score: 72, icon: '🎨' },
    { area: '리더십 경험', score: 68, icon: '👥' },
    { area: '봉사 활동', score: 82, icon: '🤝' },
    { area: '기술/IT 경험', score: 85, icon: '💻' }
  ];

  // AI-based Strength-Opportunity Analysis (SWOT style)
  const strengthsAnalysis = [
    {
      title: "데이터 기반의 공감 능력",
      subtitle: "Data-Driven Empathy",
      icon: "🚀",
      evidence: [
        { type: "흥미", detail: "'탐구형(I)' 88점 + '사회형(S)' 68점 결합" },
        { type: "성격", detail: "'우호성'의 '타인에 대한 배려' 85점 (강함)" }
      ],
      insight: "공감형 분석가, 인간 중심의 문제 해결사",
      color: "#00bcd4"
    },
    {
      title: "높은 신뢰성과 안정성",
      subtitle: "High Reliability & Stability",
      icon: "⚡",
      evidence: [
        { type: "성격", detail: "'성실성'의 '책임감' 92점 (강함)" },
        { type: "성격", detail: "'신경성'의 '스트레스 취약성' 39점 (낮음)" }
      ],
      insight: "높은 업무 신뢰도, 강력한 스트레스 내성, 안정적인 성과 유지",
      color: "#7c4dff"
    },
    {
      title: "잠재된 예술적 감수성",
      subtitle: "Aesthetic Potential",
      icon: "🎨",
      evidence: [
        { type: "생활사", detail: "'예술적 경험' 72점 (가장 높음)" }
      ],
      insight: "데이터 시각화, UX/UI 분석 등 융합 분야의 잠재 기회",
      color: "#2196f3"
    }
  ];

  const considerationsAnalysis = [
    {
      title: "실용적 탐구 성향",
      subtitle: '"실용적 탐구" vs "순수 호기심"',
      icon: "🧭",
      evidence: [
        { type: "흥미", detail: "'탐구형(I)' 88점 (매우 높음)" },
        { type: "성격", detail: "'개방성'의 '지적 호기심' 88점" }
      ],
      conclusion: "순수 R&D보다는 검증된 기술을 활용한 '시스템 구축(백엔드)' 또는 '데이터 분석' 같은 실용적 기술/IT 분야에 더 적합",
      color: "#00e5cc"
    },
    {
      title: "집중형 업무 환경 선호",
      subtitle: "선호하는 업무 환경",
      icon: "🎯",
      evidence: [
        { type: "성격", detail: "'외향성' 65점 (보통)" },
        { type: "성격", detail: "'외향성'의 '사교성' 70점" }
      ],
      conclusion: "독립적인 업무 환경에서 높은 성과 기대. 활발한 대외 활동이나 리더십보다는 '탐구형(I)' 또는 '관습형(C)' 직무 적합",
      color: "#1a237e"
    }
  ];

  // RIASEC 기반 성향 유형 (가장 높은 점수)
  const topRiasecType = radarData.reduce((prev, current) => (prev.score > current.score) ? prev : current);
  
  // Big5 기반 발전 잠재력 (성실성과 개방성 기준)
  const conscientiousnessData = comparisonData.find(d => d.name === '성실성');
  const opennessData = comparisonData.find(d => d.name === '개방성');
  const conscientiousness = conscientiousnessData?.score || 0;
  const openness = opennessData?.score || 0;
  const potentialScore = Math.round((conscientiousness + openness) / 2);
  const potentialLevel = potentialScore >= 85 ? "매우 높음" : potentialScore >= 75 ? "높음" : potentialScore >= 60 ? "중상" : "중간";
  
  // Big5 하위 요인 Deep Dive
  const big5DeepDive = [
    {
      factor: '성실성',
      score: conscientiousness,
      subFactors: conscientiousnessData?.subFactors || {},
      description: '목표를 체계적으로 달성하는 성향'
    },
    {
      factor: '개방성',
      score: openness,
      subFactors: opennessData?.subFactors || {},
      description: '새로운 경험과 학습에 대한 개방성'
    }
  ];

  // AI 교차 분석: 핵심 강점 키워드 추출 (흥미 + 성격 + 생활사)
  const coreStrengthKeywords = [
    { 
      tag: "탐구적 분석가", 
      source: "흥미", 
      detail: `'${topRiasecType.subject}' ${topRiasecType.score}점`,
      color: "#00bcd4"
    },
    { 
      tag: "높은 타인 배려", 
      source: "성격", 
      detail: "'우호성'의 하위 요인 '타인에 대한 배려' 85점",
      color: "#7c4dff"
    },
    { 
      tag: "풍부한 예술적 경험", 
      source: "생활사", 
      detail: "'예술적 경험' 72점",
      color: "#2196f3"
    },
    { 
      tag: "높은 스트레스 내성", 
      source: "성격", 
      detail: "'신경성'의 하위 요인 '스트레스 취약성' 39점(낮음)",
      color: "#00e5cc"
    },
    { 
      tag: "성실한 책임감", 
      source: "성격", 
      detail: "'성실성'의 하위 요인 '책임감' 92점",
      color: "#1a237e"
    }
  ];

  const analysisDetails = {
    coreStrengths: coreStrengthKeywords,
    personalityType: topRiasecType.subject, // RIASEC에서 가장 높은 유형
    personalityScore: topRiasecType.score,
    lifeHistoryAreas: lifeHistoryData, // 생활사검사 영역
    developmentPotential: potentialLevel, // Big5 성실성+개방성 기반
    developmentScore: potentialScore,
    careerDirection: "데이터 사이언스 및 AI 엔지니어링",
    recommendations: "분석적 사고와 기술 역량을 활용할 수 있는 IT 분야를 추천합니다."
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !additionalKeywords.includes(keywordInput.trim())) {
      setAdditionalKeywords([...additionalKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setAdditionalKeywords(additionalKeywords.filter(k => k !== keyword));
  };

  const handleProceed = () => {
    setIsProcessing(true);
    // Simulate AI processing with additional keywords
    setTimeout(() => {
      setIsProcessing(false);
      setStep('recommendations');
      onStepChange?.('recommendations');
    }, 1500);
  };

  const recommendedJobs = [
    {
      icon: BarChart3,
      title: "데이터 사이언티스트",
      subtitle: "Data Scientist",
      match: 95,
      description: "데이터를 분석하여 비즈니스 인사이트를 도출하는 전문가",
      skills: ["Python", "머신러닝", "통계", "데이터 시각화"],
      gradient: "from-[#00bcd4] to-[#00e5cc]",
      matchReasons: [
        { type: "RIASEC", value: "탐구형(I) 88점", desc: "데이터 분석과 논리적 사고가 핵심입니다" },
        { type: "Big5", value: "성실성 88점", desc: "정밀한 데이터 처리에 필요한 꼼꼼함" },
        { type: "적성", value: "분석력 85점", desc: "복잡한 데이터에서 인사이트 도출" }
      ]
    },
    {
      icon: Cpu,
      title: "AI 엔지니어",
      subtitle: "AI Engineer",
      match: 92,
      description: "인공지능 모델을 설계하고 구현하는 기술자",
      skills: ["TensorFlow", "딥러닝", "NLP", "컴퓨터 비전"],
      gradient: "from-[#7c4dff] to-[#2196f3]",
      matchReasons: [
        { type: "Big5", value: "개방성 82점", desc: "새로운 AI 기술 습득에 유리합니다" },
        { type: "RIASEC", value: "탐구형(I) 88점", desc: "알고리즘 연구와 실험에 강점" },
        { type: "적성", value: "논리/분석 85점", desc: "모델 최적화와 문제 해결 능력" }
      ]
    },
    {
      icon: Code,
      title: "백엔드 개발자",
      subtitle: "Backend Developer",
      match: 88,
      description: "서버와 데이터베이스를 구축하는 개발자",
      skills: ["Node.js", "Database", "API 설계", "클라우드"],
      gradient: "from-[#1a237e] to-[#2196f3]",
      matchReasons: [
        { type: "RIASEC", value: "관습형(C) 78점", desc: "체계적인 시스템 구축에 적합" },
        { type: "Big5", value: "성실성 88점", desc: "안정적인 서버 운영 관리" },
        { type: "적성", value: "기술/IT 역량", desc: "서버 아키텍처 설계 능력" }
      ]
    },
    {
      icon: Palette,
      title: "UX 디자이너",
      subtitle: "UX Designer",
      match: 85,
      description: "사용자 경험을 최적화하는 디자인 전문가",
      skills: ["Figma", "사용자 리서치", "프로토타이핑", "UI/UX"],
      gradient: "from-[#00bcd4] to-[#7c4dff]",
      matchReasons: [
        { type: "Big5", value: "개방성 82점", desc: "창의적인 디자인 솔루션 제안" },
        { type: "RIASEC", value: "예술형(A) 65점", desc: "사용자 중심의 미적 감각" },
        { type: "적성", value: "사회성 68점", desc: "사용자 니즈 파악과 공감 능력" }
      ]
    },
    {
      icon: Users,
      title: "프로덕트 매니저",
      subtitle: "Product Manager",
      match: 82,
      description: "제품의 전략과 실행을 총괄하는 리더",
      skills: ["전략 수립", "커뮤니케이션", "데이터 분석", "기획"],
      gradient: "from-[#2196f3] to-[#00e5cc]",
      matchReasons: [
        { type: "RIASEC", value: "진취형(E) 72점", desc: "제품 비전 제시와 팀 리딩" },
        { type: "Big5", value: "외향성 65점", desc: "다양한 이해관계자와 협업" },
        { type: "적성", value: "리더십 75점", desc: "프로젝트 전체를 조율하는 능력" }
      ]
    }
  ];

  if (step === 'analysis') {
    return (
      <div className="min-h-screen bg-[#f5f7fa] gradient-mesh">
        {/* Header */}
        <header className="border-b border-[#1a237e]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="mb-4 text-[#1a237e] hover:text-[#00bcd4] hover:bg-[#00bcd4]/5"
            >
              ← 홈으로
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center glow-accent">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/20 mb-2">
                  <span className="text-sm text-[#00e5cc]">AI 분석 완료</span>
                </div>
                <h1 className="text-[#0d1b2a]">직업적성검사 심층 분석 결과</h1>
                {uploadedFileName && (
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="w-4 h-4 text-[#00bcd4]" />
                    <span className="text-sm text-[#5a6c7d]">{uploadedFileName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Summary Cards - Bento Grid */}
          <section className="mb-12">
            <div className="mb-8">
              <h2 className="text-[#0d1b2a] mb-2">
                <span className="text-gradient-primary">요약</span>
              </h2>
              <p className="text-[#5a6c7d]">당신은 <span className="text-gradient-accent">{analysisDetails.personalityType}</span> 유형입니다</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Core Strength Keywords - AI 교차 분석 */}
              <div className="bento-card p-6 glow-accent lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a6c7d]">AI 추출 핵심 강점</p>
                    <p className="text-lg text-gradient-accent">교차 분석 결과</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisDetails.coreStrengths.slice(0, 3).map((strength, index) => (
                    <div
                      key={index}
                      className="group relative"
                    >
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer hover:shadow-medium"
                        style={{ 
                          backgroundColor: `${strength.color}10`,
                          borderColor: `${strength.color}30`,
                          color: strength.color
                        }}
                      >
                        #{strength.tag}
                      </div>
                      <div className="absolute left-0 top-full mt-2 w-64 p-3 rounded-xl bg-white border border-[#1a237e]/10 shadow-strong opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <p className="text-xs text-[#8f9ba8] mb-1">{strength.source} 검사</p>
                        <p className="text-xs text-[#5a6c7d]">{strength.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#8f9ba8] mt-3">
                  * 흥미 + 성격 + 생활사 교차 분석 기반
                </p>
              </div>

              {/* Personality Type - RIASEC */}
              <div className="bento-card p-6 lg:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a6c7d]">성향 유형</p>
                    <p className="text-2xl text-gradient-primary">{analysisDetails.personalityType}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#1a237e]/10">
                  <p className="text-xs text-[#8f9ba8]">RIASEC 흥미검사</p>
                  <p className="text-sm text-[#5a6c7d] mt-1">최고 점수: {analysisDetails.personalityScore}점</p>
                </div>
              </div>

              {/* Life History Areas - 생활사 검사 */}
              <div className="bento-card p-6 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2196f3] to-[#00e5cc] flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a6c7d]">생활사 검사</p>
                    <p className="text-lg text-[#0d1b2a]">경험 영역 분석</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {analysisDetails.lifeHistoryAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-lg">{area.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-[#5a6c7d]">{area.area}</span>
                          <span className="text-xs text-[#00bcd4]">{area.score}점</span>
                        </div>
                        <div className="h-1.5 bg-[#e8ecf1] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2196f3] to-[#00e5cc]"
                            style={{ width: `${area.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Potential - Big5 Deep Dive */}
              <div className="bento-card p-6 glow-violet lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a6c7d]">발전 잠재력</p>
                    <p className="text-2xl text-gradient-violet">{analysisDetails.developmentPotential}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {big5DeepDive.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-[#7c4dff]/5 to-[#00e5cc]/5 border border-[#7c4dff]/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#0d1b2a]">{item.factor}</span>
                        <span className="text-sm text-[#7c4dff]">{item.score}점</span>
                      </div>
                      <p className="text-xs text-[#5a6c7d] mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(item.subFactors).map(([subFactor, score], idx) => (
                          <div 
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/50 border border-[#7c4dff]/20"
                          >
                            <span className="text-xs text-[#5a6c7d]">{subFactor}</span>
                            <span className="text-xs text-[#7c4dff]">{score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-[#8f9ba8] mt-3">
                  * Big5 성격검사 하위 요인 심층 분석
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Analysis - Bento Grid */}
          <section className="mb-12">
            <div className="mb-8">
              <h2 className="text-[#0d1b2a] mb-2">
                <span className="text-gradient-primary">상세</span> 분석
              </h2>
              <p className="text-[#5a6c7d]">AI가 분석한 당신의 적성 데이터</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Radar Chart - RIASEC */}
              <div className="bento-card p-8 glass-card">
                <h3 className="text-[#0d1b2a] mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00bcd4]" />
                  RIASEC 흥미검사
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1a237e" strokeOpacity={0.1} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#5a6c7d', fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ fill: '#8f9ba8', fontSize: 10 }}
                    />
                    <Radar 
                      name="점수" 
                      dataKey="score" 
                      stroke="#00bcd4" 
                      fill="#00bcd4" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Big5 Personality Chart */}
              <div className="bento-card p-8 glass-card">
                <h3 className="text-[#0d1b2a] mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#7c4dff]" />
                  Big5 성격검사
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={comparisonData} barGap={8}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#5a6c7d', fontSize: 12 }}
                      axisLine={{ stroke: '#1a237e', strokeOpacity: 0.1 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: '#8f9ba8', fontSize: 10 }}
                      axisLine={{ stroke: '#1a237e', strokeOpacity: 0.1 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid rgba(26, 35, 126, 0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(26, 35, 126, 0.1)'
                      }}
                    />
                    <Bar dataKey="score" fill="#7c4dff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#7c4dff]"></div>
                    <span className="text-sm text-[#5a6c7d]">나의 점수</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Strength-Opportunity Analysis */}
          <section className="mb-12">
            <div className="mb-8">
              <h3 className="text-[#0d1b2a] mb-2">
                🚀 AI가 발견한 <span className="text-gradient-accent">핵심 강점</span>
              </h3>
              <p className="text-[#5a6c7d]">흥미·성격·생활사 교차 분석 기반</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {strengthsAnalysis.map((strength, index) => (
                <div key={index} className="bento-card p-6 hover:shadow-strong transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{strength.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-[#0d1b2a] mb-1">{strength.title}</h4>
                      <p className="text-xs text-[#8f9ba8] italic">{strength.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-[#5a6c7d] mb-2">AI 분석 근거:</p>
                    {strength.evidence.map((ev, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: strength.color }}
                        ></div>
                        <p className="text-xs text-[#5a6c7d]">
                          <span className="text-[#0d1b2a]">{ev.type}:</span> {ev.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="p-3 rounded-lg border-l-4"
                    style={{ 
                      backgroundColor: `${strength.color}08`,
                      borderColor: strength.color
                    }}
                  >
                    <p className="text-xs text-[#8f9ba8] mb-1">→ 대체 키워드</p>
                    <p className="text-xs" style={{ color: strength.color }}>
                      {strength.insight}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-[#0d1b2a] mb-2">
                🧭 AI가 발견한 <span className="text-gradient-primary">고려사항</span>
              </h3>
              <p className="text-[#5a6c7d]">데이터 모순점 및 경향성 분석</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {considerationsAnalysis.map((consideration, index) => (
                <div key={index} className="bento-card p-6 hover:shadow-strong transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{consideration.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-[#0d1b2a] mb-1">{consideration.title}</h4>
                      <p className="text-xs text-[#8f9ba8] italic">{consideration.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-[#5a6c7d] mb-2">AI 분석 근거:</p>
                    {consideration.evidence.map((ev, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: consideration.color }}
                        ></div>
                        <p className="text-xs text-[#5a6c7d]">
                          <span className="text-[#0d1b2a]">{ev.type}:</span> {ev.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="p-3 rounded-lg border-l-4"
                    style={{ 
                      backgroundColor: `${consideration.color}08`,
                      borderColor: consideration.color
                    }}
                  >
                    <p className="text-xs text-[#8f9ba8] mb-1">→ 분석 결과</p>
                    <p className="text-xs" style={{ color: consideration.color }}>
                      {consideration.conclusion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Keywords Input */}
          <section className="mb-12">
            <div className="mb-8">
              <h3 className="text-[#0d1b2a] mb-2">
                추가 키워드 입력 <span className="text-sm text-[#8f9ba8]">(선택사항)</span>
              </h3>
              <p className="text-[#5a6c7d]">더 정확한 직업 추천을 위해 관심사를 입력하세요</p>
            </div>

            <div className="bento-card p-8 glass-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center flex-shrink-0">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#0d1b2a] mb-2">관심사를 입력하세요</h4>
                  <p className="text-sm text-[#5a6c7d] mb-4">
                    관심 있는 직무, 선호하는 업무 환경, 발전시키고 싶은 스킬 등을 자유롭게 입력하세요
                  </p>

                  {/* Keyword Input */}
                  <div className="flex gap-3 mb-4">
                    <Input
                      placeholder="키워드 입력 (예: 리모트 워크, 창의성, 프론트엔드)"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                      className="flex-1 h-12 bg-white border-2 border-[#1a237e]/10 text-[#0d1b2a] rounded-xl focus:border-[#00bcd4] shadow-soft"
                    />
                    <Button
                      onClick={handleAddKeyword}
                      className="h-12 px-6 gradient-accent text-white rounded-xl glow-accent hover:opacity-90"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Added Keywords */}
                  {additionalKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {additionalKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-accent/10 text-[#00bcd4] border border-[#00bcd4]/20"
                        >
                          {keyword}
                          <button
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="hover:text-[#00e5cc] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Action Button */}
          <section className="flex justify-center">
            <Button
              onClick={handleProceed}
              disabled={isProcessing}
              className="h-16 px-12 gradient-accent text-white hover:opacity-90 rounded-2xl glow-accent transition-all text-lg shadow-strong"
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  맞춤 직업 추천 받기
                  <ArrowRight className="w-6 h-6 ml-3" />
                </>
              )}
            </Button>
          </section>
        </main>
      </div>
    );
  }

  // Recommendations Step
  return (
    <div className="min-h-screen bg-[#f5f7fa] gradient-mesh">
      {/* Header */}
      <header className="border-b border-[#1a237e]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => setStep('analysis')}
            className="mb-4 text-[#1a237e] hover:text-[#00bcd4] hover:bg-[#00bcd4]/5"
          >
            ← 분석 결과로
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center glow-accent pulse-glow-animation">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/20 mb-2">
                <span className="text-sm text-[#00e5cc]">
                  {additionalKeywords.length > 0 ? `${additionalKeywords.length}개 키워드 반영` : 'AI 매칭 완료'}
                </span>
              </div>
              <h1 className="text-[#0d1b2a]">맞춤형 직업 추천</h1>
              <p className="text-sm text-[#5a6c7d]">적성검사 분석 기반 상위 5개 직업</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-[#0d1b2a] mb-2">
            <span className="text-gradient-primary">제안</span>
          </h2>
          <p className="text-[#5a6c7d]">AI가 추천하는 최적의 커리어 경로</p>
        </div>

        <div className="space-y-6">
          {recommendedJobs.map((job, index) => {
            const Icon = job.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate('roadmap')}
                className="bento-card p-4 md:p-8 hover:shadow-strong transition-all group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                  {/* Icon & Match Score */}
                  <div className="flex md:flex-col items-center md:items-center gap-3 w-full md:w-auto">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${job.gradient} flex items-center justify-center glow-accent group-hover:shadow-strong transition-all flex-shrink-0`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="text-center md:text-center">
                      <div className="text-xl md:text-2xl text-gradient-accent">{job.match}%</div>
                      <div className="text-xs text-[#8f9ba8]">매칭도</div>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="mb-2">
                      <h3 className="text-lg md:text-2xl text-[#0d1b2a] group-hover:text-gradient-accent transition-colors break-words">
                        {job.title}
                      </h3>
                      <span className="text-xs md:text-sm text-[#8f9ba8]">{job.subtitle}</span>
                    </div>
                    <p className="text-sm md:text-base text-[#5a6c7d] mb-4 break-words">{job.description}</p>
                    
                    {/* Match Reasons */}
                    <div className="mb-4 p-3 md:p-4 rounded-xl bg-gradient-to-br from-[#00e5cc]/5 to-[#00bcd4]/5 border border-[#00bcd4]/10">
                      <p className="text-xs text-[#8f9ba8] mb-2">💡 이 직업이 당신과 잘 맞는 이유</p>
                      <div className="space-y-1.5">
                        {job.matchReasons.map((reason, ridx) => (
                          <div key={ridx} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#00bcd4] mt-1.5 flex-shrink-0"></div>
                            <p className="text-xs text-[#5a6c7d] break-words">
                              <span className="text-[#00bcd4]">{reason.type}</span> <span className="text-[#0d1b2a]">{reason.value}</span> → {reason.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="px-2 md:px-3 py-1 rounded-lg bg-gradient-primary/5 text-[#1a237e] text-xs md:text-sm border border-[#1a237e]/10 group-hover:bg-gradient-accent/10 group-hover:border-[#00bcd4]/30 transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2 duration-300">
                    <div className="flex flex-col items-center gap-2">
                      <ChevronRight className="w-8 h-8 text-[#00bcd4]" />
                      <span className="text-xs text-[#00bcd4]">로드맵 보기</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Text */}
        <div className="mt-12 text-center">
          <p className="text-[#5a6c7d] mb-2">
            💡 원하는 직업을 클릭하여 맞춤형 커리어 로드맵을 확인하세요
          </p>
          <p className="text-sm text-[#8f9ba8]">
            단계별 성장 경로와 필요한 스킬을 상세하게 안내합니다
          </p>
        </div>
      </main>
    </div>
  );
}
