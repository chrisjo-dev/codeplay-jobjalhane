import { Upload, FileText, Sparkles, Brain, Zap, Target, TrendingUp, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { AnimatedHandshake } from "./AnimatedHandshake";
import { uploadPDF } from "../utils/api";

interface HomeScreenProps {
  onNavigate: (screen: string, fileName?: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      alert('먼저 PDF 파일을 업로드해주세요.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      console.log('Uploading PDF:', uploadedFile.name);

      // 백엔드로 PDF 업로드
      const result = await uploadPDF(uploadedFile);

      console.log('PDF Upload Success:', {
        filename: result.filename,
        format: result.format_detected,
        pages: result.total_pages,
        textLength: result.text.length,
        extractedPath: result.extracted_text_path
      });

      // 경고 메시지 표시
      if (result.warning) {
        console.warn('Warning:', result.warning);
      }

      // 성공 시 분석 화면으로 이동
      setIsUploading(false);
      onNavigate('analyze', uploadedFile.name, 'analysis');

    } catch (error: any) {
      console.error('PDF Upload Error:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'PDF 업로드 중 오류가 발생했습니다.';
      setUploadError(errorMsg);
      setIsUploading(false);
      alert(errorMsg);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 188, 212, 0.08) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(0, 229, 204, 0.06) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="px-6 pt-32 pb-32 min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto text-center">
            {/* Small tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00bcd4]/30 bg-[#00bcd4]/10 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00bcd4]" />
              <span className="text-sm text-[#0d1b2a]">AI-Powered Career Intelligence</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl text-[#0d1b2a] leading-tight" style={{ fontWeight: '700' }}>
                잡 - 잘하다
              </h1>
              <p className="text-2xl md:text-3xl mt-3 bg-gradient-to-r from-[#00bcd4] to-[#00e5cc] text-transparent bg-clip-text" style={{ fontWeight: '600' }}>
                Job-Jal-Hada
              </p>
            </motion.div>

            {/* Animated Handshake */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <AnimatedHandshake />
            </motion.div>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-[#5a6c7d] max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              AI와 데이터가 만나는 커리어의 미래.<br />
              직업 적성을 분석하고 최적의 성장 경로를 제시합니다.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                onClick={scrollToFeatures}
                className="h-14 px-10 bg-gradient-to-r from-[#00bcd4] to-[#00e5cc] hover:shadow-[0_0_30px_rgba(0,229,204,0.4)] text-[#0d1b2a] rounded-full text-lg shadow-lg transition-all duration-300"
                style={{ fontWeight: '600' }}
              >
                Explore Your Future
              </Button>
            </motion.div>
          </div>


        </section>

        {/* Features Section */}
        <section id="features-section" className="px-6 py-24 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl text-[#0d1b2a] mb-6" style={{ fontWeight: '700' }}>
                AI 기반 커리어 로드맵
              </h2>
              <p className="text-xl text-[#5a6c7d] max-w-2xl mx-auto">
                직업적성검사 결과를 업로드하면 맞춤형 성장 경로를 제시합니다
              </p>
            </motion.div>

            {/* Main Upload Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 rounded-3xl bg-white border border-[#00bcd4]/20 p-10 md:p-14 shadow-2xl shadow-[#00bcd4]/10"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00bcd4] to-[#00e5cc] flex items-center justify-center shadow-lg shadow-[#00bcd4]/20">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl text-[#0d1b2a]" style={{ fontWeight: '600' }}>
                        AI 정밀 분석
                      </h3>
                      <p className="text-[#5a6c7d]">
                        직업적성검사 PDF
                      </p>
                    </div>
                  </div>

                  <p className="text-[#5a6c7d] leading-relaxed text-lg">
                    업로드한 PDF를 AI가 분석하여 당신에게 최적화된 4단계 커리어 로드맵을 생성합니다. 
                    공공 데이터 기반의 신뢰할 수 있는 정보를 제공합니다.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#00bcd4]/10 border border-[#00bcd4]/20">
                      <Zap className="w-5 h-5 text-[#00bcd4] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[#0d1b2a]" style={{ fontWeight: '500' }}>빠른 분석</p>
                        <p className="text-sm text-[#5a6c7d]">AI 기반 실시간 분석</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#00e5cc]/10 border border-[#00e5cc]/20">
                      <Target className="w-5 h-5 text-[#00e5cc] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[#0d1b2a]" style={{ fontWeight: '500' }}>맞춤형 로드맵</p>
                        <p className="text-sm text-[#5a6c7d]">What-How-Why 초구체적 구조</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Upload Area */}
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-[#00bcd4]/30 rounded-2xl p-12 text-center hover:border-[#00bcd4] hover:bg-[#00bcd4]/5 transition-all cursor-pointer"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00bcd4] to-[#00e5cc] flex items-center justify-center shadow-lg shadow-[#00bcd4]/30">
                          <FileText className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <p className="text-[#0d1b2a]">{uploadedFile.name}</p>
                          <p className="text-sm text-[#5a6c7d] mt-2">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                          }}
                          className="text-[#5a6c7d] hover:text-[#0d1b2a] hover:bg-[#00bcd4]/5"
                        >
                          다른 파일 선택
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-2xl border-2 border-[#00bcd4]/30 flex items-center justify-center">
                          <Upload className="w-10 h-10 text-[#00bcd4]" />
                        </div>
                        <div>
                          <p className="text-[#0d1b2a]">PDF 파일을 드래그하거나 클릭하세요</p>
                          <p className="text-sm text-[#5a6c7d] mt-2">
                            최대 10MB까지 지원
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!uploadedFile || isUploading}
                    className="w-full h-14 bg-gradient-to-r from-[#00bcd4] to-[#00e5cc] hover:shadow-[0_0_30px_rgba(0,229,204,0.4)] text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg"
                    style={{ fontWeight: '600' }}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        분석 중...
                      </>
                    ) : (
                      <>
                        AI 로드맵 생성하기
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {/* Card 1 */}
              <div className="rounded-2xl bg-white border border-[#00bcd4]/20 p-8 hover:shadow-2xl hover:shadow-[#00bcd4]/20 hover:border-[#00bcd4] transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00bcd4] to-[#00e5cc] flex items-center justify-center mb-6 shadow-lg shadow-[#00bcd4]/20 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-[#0d1b2a] mb-3" style={{ fontWeight: '600' }}>
                  4단계 성장 로드맵
                </h3>
                <p className="text-[#5a6c7d] leading-relaxed">
                  기초 다지기부터 실전 경험까지 체계적인 커리어 경로를 제시합니다
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-white border border-[#7c4dff]/20 p-8 hover:shadow-2xl hover:shadow-[#7c4dff]/20 hover:border-[#7c4dff] transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c4dff] to-[#a78bfa] flex items-center justify-center mb-6 shadow-lg shadow-[#7c4dff]/20 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-[#0d1b2a] mb-3" style={{ fontWeight: '600' }}>
                  공공 데이터 기반
                </h3>
                <p className="text-[#5a6c7d] leading-relaxed">
                  Q-Net, K-MOOC, WorkNet 등 신뢰할 수 있는 공공 API 데이터를 활용합니다
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-white border border-[#00e5cc]/20 p-8 hover:shadow-2xl hover:shadow-[#00e5cc]/20 hover:border-[#00e5cc] transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00e5cc] to-[#34d399] flex items-center justify-center mb-6 shadow-lg shadow-[#00e5cc]/20 group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-[#0d1b2a] mb-3" style={{ fontWeight: '600' }}>
                  What-How-Why 구조
                </h3>
                <p className="text-[#5a6c7d] leading-relaxed">
                  초구체적이고 실행 가능한 단계별 학습 경로를 제공합니다
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-white border-t border-[#00bcd4]/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-[#5a6c7d]/60">
              Made by <span className="text-[#00bcd4]" style={{ fontWeight: '500' }}>codeplay</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
