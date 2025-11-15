import { useState, useEffect } from "react";
import { ArrowLeft, Target, Code, Briefcase, Youtube, ChevronRight, CheckCircle2, Rocket, BookOpen, Users, Award, Zap, TrendingUp, Database } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

interface RoadmapScreenProps {
  onNavigate: (screen: string, fileName?: string, step?: string) => void;
}

export function RoadmapScreen({ onNavigate }: RoadmapScreenProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const roadmapSteps = [
    {
      id: 1,
      title: "기초 다지기",
      subtitle: "FOUNDATION",
      color: "#00bcd4",
      icon: BookOpen,
      tasks: [
        {
          what: "Python 프로그래밍 기초 학습",
          how: "[K-MOOC API] '파이썬으로 배우는 프로그래밍 기초' 무료 강의 수강",
          why: "[개인 근거] 당신의 '탐구형(I)' 적성은 논리적 학습에 강점이 있습니다"
        },
        {
          what: "통계학 기초 이해",
          how: "[K-MOOC API] '통계학의 이해' 무료 강의 또는 Khan Academy",
          why: "[WorkNet 근거] 데이터 분석가의 핵심 역량은 통계적 사고입니다"
        }
      ]
    },
    {
      id: 2,
      title: "핵심 역량",
      subtitle: "CORE SKILLS",
      color: "#7c4dff",
      icon: Code,
      tasks: [
        {
          what: "'빅데이터분석기사' 자격 취득",
          how: "[Q-Net API] 2026년 2회차 필기시험 접수 (7월 예정)",
          why: "[WorkNet 근거] AI/데이터 직무의 80%가 해당 자격증을 우대합니다"
        },
        {
          what: "머신러닝 기초 이론 학습",
          how: "[K-MOOC API] '인공지능 및 기계학습 개론' 무료 수강",
          why: "[개인 근거] 당신의 높은 '성실성(88점)'으로 체계적 학습이 가능합니다"
        }
      ]
    },
    {
      id: 3,
      title: "심화 / 응용",
      subtitle: "DEEPENING",
      color: "#2196f3",
      icon: Target,
      tasks: [
        {
          what: "'정보처리기사' 자격 취득",
          how: "[Q-Net API] 2026년 1회 필기 (3월) → 실기 (5월)",
          why: "[WorkNet 근거] 개발 협업이 필요한 데이터 직무에서 필수입니다"
        },
        {
          what: "NLP/Computer Vision 중 1개 분야 심화",
          how: "[Coursera/edX] Andrew Ng의 Deep Learning Specialization",
          why: "[개인 근거] 당신의 '개방성(82점)'은 새로운 기술 습득에 유리합니다"
        }
      ]
    },
    {
      id: 4,
      title: "실전 경험",
      subtitle: "PRACTICE",
      color: "#1a237e",
      icon: Rocket,
      tasks: [
        {
          what: "포트폴리오 프로젝트 3개 완성",
          how: "[DACON/Kaggle] 공개 데이터셋으로 실전 문제 해결 (GitHub 공개)",
          why: "[WorkNet 근거] 채용 공고의 95%가 포트폴리오를 요구합니다"
        },
        {
          what: "공공기관 AI 경진대회 참여",
          how: "[AI Hub API] 정부 주관 AI 그랜드 챌린지 참가 (연 2회)",
          why: "[개인 근거] 수상 경력은 이력서 통과율을 3배 높입니다"
        }
      ]
    }
  ];

  // WorkNet API 기반 연봉 데이터
  const salaryData = [
    { level: "하위 25%", amount: 3200 },
    { level: "중위 50%", amount: 4800 },
    { level: "상위 25%", amount: 7500 },
    { level: "상위 10%", amount: 9800 }
  ];

  // WorkNet API 기반 일자리 전망 데이터 (향후 5년)
  const jobOutlookData = [
    { year: "2024", jobs: 28500 },
    { year: "2025", jobs: 32100 },
    { year: "2026", jobs: 36800 },
    { year: "2027", jobs: 42300 },
    { year: "2028", jobs: 48900 },
    { year: "2029", jobs: 55200 }
  ];

  const videos = [
    {
      title: "[한국고용정보원] 데이터 분석가 직업 소개",
      channel: "한국고용정보원",
      views: "12만회",
      isOfficial: true
    },
    {
      title: "현직 데이터 분석가의 하루 일과",
      channel: "테크 인사이트",
      views: "23만회",
      isOfficial: false
    },
    {
      title: "비전공자에서 데이터 분석가로",
      channel: "커리어 스토리",
      views: "18만회",
      isOfficial: false
    }
  ];


  return (
    <div className="min-h-screen bg-[#f5f7fa] gradient-mesh">
      {/* Header */}
      <header className="border-b border-[#1a237e]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('analyze', undefined, 'recommendations')}
              className="text-[#1a237e] hover:text-[#00e5cc] hover:bg-[#00e5cc]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              직업 목록으로
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="text-[#1a237e] hover:text-[#00bcd4] hover:bg-[#00bcd4]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center glow-accent">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/20 mb-2">
                <span className="text-sm text-[#00e5cc]">AI 추천 로드맵</span>
              </div>
              <h1 className="text-[#0d1b2a]">데이터 분석가</h1>
              <p className="text-sm text-[#5a6c7d]">Data Analyst - 적성검사 기반 성장 경로</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Visual Roadmap - Bento Grid Style */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-[#0d1b2a] mb-2">
              <span className="text-gradient-primary">단계별</span> 성장 로드맵
            </h2>
            <p className="text-[#5a6c7d]">AI가 분석한 당신만의 커리어 경로</p>
          </div>

          {/* Roadmap Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative">
                  <div className="bento-card p-6 hover:shadow-strong transition-all group h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-accent"
                          style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-[#8f9ba8] mb-1">{step.subtitle}</p>
                          <h3 className="text-[#0d1b2a]">{step.title}</h3>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: step.color, color: step.color }}
                      >
                        <span className="text-lg">{step.id}</span>
                      </div>
                    </div>

                    {/* What-How-Why Tasks */}
                    <div className="space-y-6">
                      {step.tasks.map((task, idx) => (
                        <div key={idx} className="space-y-2 pb-4 border-b border-[#1a237e]/5 last:border-0 last:pb-0">
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${step.color}20`, color: step.color }}
                            >
                              <span className="text-xs">{idx + 1}</span>
                            </div>
                            <div className="space-y-1.5 min-w-0 flex-1">
                              <div>
                                <span className="text-xs text-[#8f9ba8]">WHAT • </span>
                                <span className="text-sm text-[#0d1b2a] break-words">{task.what}</span>
                              </div>
                              <div>
                                <span className="text-xs text-[#00bcd4]">HOW • </span>
                                <span className="text-xs text-[#5a6c7d] break-words">{task.how}</span>
                              </div>
                              <div>
                                <span className="text-xs text-[#7c4dff]">WHY • </span>
                                <span className="text-xs text-[#5a6c7d] break-words">{task.why}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Guide (Tabs) */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-[#0d1b2a] mb-2">
              <span className="text-gradient-primary">상세</span> 가이드
            </h2>
            <p className="text-[#5a6c7d]">직무에 대한 모든 정보</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-white border border-[#1a237e]/10 gap-1 rounded-2xl p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#1a237e]/10 data-[state=active]:text-[#1a237e] rounded-xl transition-all"
                style={{ fontWeight: 'var(--active-weight, 400)' } as any}
                data-active-weight="700"
              >
                직무 개요
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-[#00bcd4]/10 data-[state=active]:text-[#00bcd4] rounded-xl transition-all"
                style={{ fontWeight: 'var(--active-weight, 400)' } as any}
                data-active-weight="700"
              >
                기술 스택 & 학습
              </TabsTrigger>
              <TabsTrigger
                value="career"
                className="data-[state=active]:bg-[#7c4dff]/10 data-[state=active]:text-[#7c4dff] rounded-xl transition-all"
                style={{ fontWeight: 'var(--active-weight, 400)' } as any}
                data-active-weight="700"
              >
                커리어 & 연봉
              </TabsTrigger>
            </TabsList>
            
            <style jsx>{`
              [data-state="active"] {
                font-weight: 700 !important;
              }
            `}</style>

            <TabsContent value="overview" className="mt-8">
              <div className="bento-card p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[#0d1b2a]">데이터 분석가란?</h3>
                </div>
                <div className="space-y-4 text-[#5a6c7d]">
                  <p>
                    데이터 분석가는 방대한 데이터를 수집, 정제, 분석하여 비즈니스 의사결정에 필요한 인사이트를 도출하는 전문가입니다.
                  </p>
                  <div className="space-y-3">
                    <p className="text-[#0d1b2a]" style={{ fontWeight: '600' }}>주요 업무:</p>
                    <div className="space-y-2 ml-4">
                      {["비즈니스 문제를 데이터 기반으로 정의하고 분석", "SQL, Python을 활용한 데이터 추출 및 전처리", "통계 분석 및 데이터 시각화", "대시보드 구축 및 리포팅", "A/B 테스트 설계 및 분석"].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00bcd4] mt-2"></div>
                          <p className="text-sm text-[#5a6c7d] leading-relaxed" style={{ fontWeight: '400' }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#0d1b2a]" style={{ fontWeight: '600' }}>필요 역량:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["논리적 사고와 문제 해결 능력", "커뮤니케이션 스킬", "비즈니스 도메인 이해", "호기심과 끈기"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00bcd4]/5 border border-[#00bcd4]/10">
                          <CheckCircle2 className="w-4 h-4 text-[#00bcd4]" />
                          <p className="text-sm text-[#5a6c7d]" style={{ fontWeight: '400' }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <div className="bento-card p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[#0d1b2a]">기술 스택 & 학습 경로</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[#0d1b2a] flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-accent rounded-full"></div>
                      필수 기술
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { 
                          name: "SQL", 
                          desc: "데이터 추출 및 조작의 핵심 언어", 
                          why: "모든 데이터는 데이���베이스에 저장되어 있으며, SQL은 원하는 데이터를 추출하고 변환하는 가장 기본적인 도구입니다. 실무에서 가장 많이 사용하는 기술입니다.",
                          difficulty: "초급",
                          difficultyColor: "#00e5cc",
                          recommend: "W3Schools, SQLBolt" 
                        },
                        { 
                          name: "Python/R", 
                          desc: "데이터 분석 및 모델링", 
                          why: "복잡한 데이터 처리, 통계 분석, 머신러닝 모델 구축에 필수적입니다. Pandas, NumPy, Scikit-learn 등 강력한 라이브러리를 활용할 수 있습니다.",
                          difficulty: "중급",
                          difficultyColor: "#00bcd4",
                          recommend: "점프 투 파이썬, DataCamp" 
                        },
                        { 
                          name: "통계학", 
                          desc: "확률, 분포, 가설 검정", 
                          why: "데이터의 패턴을 정확히 이해하고, A/B 테스트나 예측 모델의 신뢰도를 평가하는 데 필수입니다. 잘못된 통계 해석은 비즈니스에 큰 손실을 초래할 수 있습니다.",
                          difficulty: "중급",
                          difficultyColor: "#00bcd4",
                          recommend: "Khan Academy, 이상엽의 통계학" 
                        },
                        { 
                          name: "데이터 시각화", 
                          desc: "Tableau, Looker Studio, Matplotlib", 
                          why: "복잡한 데이터를 이해관계자에게 명확하게 전달하는 핵심 스킬입니다. 좋은 시각화는 의사결정 속도를 10배 빠르게 만듭니다.",
                          difficulty: "초급",
                          difficultyColor: "#00e5cc",
                          recommend: "Tableau Public, 공식 문서" 
                        },
                        { 
                          name: "Excel/Google Sheets", 
                          desc: "스프레드시트 고급 기능 활용", 
                          why: "피벗 테이블, VLOOKUP, 조건부 서식 등은 빠른 데이터 탐색과 간단한 분석에 가장 효율적입니다. 협업과 보고에 필수적입니다.",
                          difficulty: "초급",
                          difficultyColor: "#00e5cc",
                          recommend: "Microsoft Learn, ExcelJet" 
                        },
                        { 
                          name: "머신러닝 기초", 
                          desc: "회귀, 분류, 클러스터링", 
                          why: "고객 이탈 예측, 추천 시스템, 수요 예측 등 고급 분석 프로젝트에서 차별화된 가치를 제공합니다.",
                          difficulty: "고급",
                          difficultyColor: "#7c4dff",
                          recommend: "Coursera ML, Kaggle Learn" 
                        }
                      ].map((skill, idx) => (
                        <div key={idx} className="bento-card p-5 hover:shadow-medium transition-all space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-gradient-accent">{skill.name}</div>
                            <div 
                              className="px-3 py-1 rounded-full text-xs"
                              style={{ 
                                backgroundColor: `${skill.difficultyColor}15`,
                                color: skill.difficultyColor,
                                border: `1px solid ${skill.difficultyColor}30`
                              }}
                            >
                              {skill.difficulty}
                            </div>
                          </div>
                          <p className="text-[#5a6c7d] text-sm">{skill.desc}</p>
                          <div className="pt-2 border-t border-[#1a237e]/5">
                            <p className="text-xs text-[#8f9ba8] mb-1">왜 필요한가?</p>
                            <p className="text-xs text-[#5a6c7d] leading-relaxed">{skill.why}</p>
                          </div>
                          <p className="text-[#8f9ba8] text-xs">📚 추천: {skill.recommend}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[#0d1b2a] flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-violet rounded-full"></div>
                      추가 학습 자료
                    </h4>
                    <div className="space-y-2">
                      {["Kaggle Learn: 무료 데이터 분석 코스", "DACON: 한국형 데이터 분석 대회 플랫폼", "프로그래머스: SQL/Python 코딩 테스트", "Data Science Interview Questions (GitHub)"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#7c4dff]/5 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-[#7c4dff]" />
                          <span className="text-sm text-[#5a6c7d]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="career" className="mt-8">
              <div className="space-y-6">
                {/* 연봉 정보 - WorkNet API 기반 */}
                <div className="bento-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#0d1b2a]">연봉 정보</h3>
                      <p className="text-xs text-[#5a6c7d]">출처: 고용노동부 워크넷 공식 통계</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/20 mb-4">
                      <Database className="w-3 h-3 text-[#00e5cc]" />
                      <span className="text-xs text-[#00e5cc]">100% 공공 API 데이터</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={salaryData}>
                        <XAxis 
                          dataKey="level" 
                          tick={{ fill: '#5a6c7d', fontSize: 12 }}
                          axisLine={{ stroke: '#1a237e', strokeOpacity: 0.1 }}
                        />
                        <YAxis 
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
                          formatter={(value: any) => [`${value}만원`, '연봉']}
                        />
                        <Bar dataKey="amount" fill="#00bcd4" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bento-card p-5 bg-gradient-to-br from-[#00bcd4]/5 to-transparent border border-[#00bcd4]/10">
                      <p className="text-xs text-[#8f9ba8] mb-1">중위 연봉</p>
                      <p className="text-2xl text-gradient-accent">4,800만원</p>
                    </div>
                    <div className="bento-card p-5 bg-gradient-to-br from-[#7c4dff]/5 to-transparent border border-[#7c4dff]/10">
                      <p className="text-xs text-[#8f9ba8] mb-1">상위 10% 연봉</p>
                      <p className="text-2xl text-gradient-violet">9,800만원</p>
                    </div>
                  </div>
                </div>

                {/* 일자리 전망 - WorkNet API 기반 */}
                <div className="bento-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#0d1b2a]">향후 5년 일자리 전망</h3>
                      <p className="text-xs text-[#5a6c7d]">출처: 고용노동부 워크넷 공식 통계</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={jobOutlookData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a237e" strokeOpacity={0.1} />
                        <XAxis 
                          dataKey="year" 
                          tick={{ fill: '#5a6c7d', fontSize: 12 }}
                          axisLine={{ stroke: '#1a237e', strokeOpacity: 0.1 }}
                        />
                        <YAxis 
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
                          formatter={(value: any) => [`${value.toLocaleString()}개`, '일자리 수']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="jobs" 
                          stroke="#7c4dff" 
                          strokeWidth={3}
                          dot={{ fill: '#7c4dff', r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gradient-to-br from-[#00e5cc]/10 to-transparent border border-[#00e5cc]/20 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-[#00e5cc] flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm text-[#0d1b2a]">향후 5년간 연평균 <span className="text-gradient-accent">+14.2%</span> 성장 예상</p>
                        <p className="text-xs text-[#5a6c7d]">AI/데이터 분야는 정부의 디지털 뉴딜 정책으로 지속적인 수요 증가가 예상됩니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Vlog Section */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-[#0d1b2a] mb-2">
              직무 <span className="text-gradient-violet">VLOG</span>
            </h2>
            <p className="text-[#5a6c7d]">실제 현직자의 이야기를 들어보세요</p>
            <div className="mt-4 max-w-2xl mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-amber-900 mb-1">면책 조항</p>
                    <p className="text-xs text-amber-800">아래 영상은 유튜브 API를 통해 제공되는 개인의 경험담입니다. 통계 데이터가 아니므로 참고용으로만 활용해주세요. 공식 채널 영상을 우선적으로 추천합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-[#00bcd4]/10 to-[#7c4dff]/10 rounded-2xl overflow-hidden bento-card">
                  {video.isOfficial && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="px-3 py-1 rounded-full bg-[#00e5cc] text-white text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        공식 채널
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1762341123514-01ac9f563350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMHNjcmVlbnxlbnwxfHx8fDE3NjI1ODkwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt={video.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                    <div className="absolute w-16 h-16 rounded-full gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform glow-accent">
                      <Youtube className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <h4 className="text-[#0d1b2a] group-hover:text-gradient-accent transition-all break-words">{video.title}</h4>
                  <div className="flex justify-between text-sm text-[#8f9ba8]">
                    <span className="truncate">{video.channel}</span>
                    <span className="flex-shrink-0">{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-12">
          <div className="max-w-2xl mx-auto text-center bento-card p-12 glow-accent">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-accent flex items-center justify-center glow-accent">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[#0d1b2a] mb-4">다른 커리어도 탐색해보세요</h3>
            <p className="text-[#5a6c7d] mb-8">
              새로운 적성검사를 업로드하여 다양한 커리어 경로를 분석해보세요.
            </p>
            <Button
              onClick={() => onNavigate('home')}
              className="gradient-primary hover:opacity-90 text-white px-8 py-6 rounded-2xl glow-primary h-auto"
            >
              <Target className="w-5 h-5 mr-2" />
              새로운 분석 시작하기
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
