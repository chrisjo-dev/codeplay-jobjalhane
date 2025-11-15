import { motion } from "motion/react";
import { Code2, Palette, TrendingUp, BarChart3, Lightbulb, BookOpen } from "lucide-react";

const jobCards = [
  { name: "개발자", icon: Code2, position: { top: "10%", left: "5%" }, delay: 0 },
  { name: "디자이너", icon: Palette, position: { top: "15%", right: "8%" }, delay: 0.2 },
  { name: "마케터", icon: TrendingUp, position: { bottom: "20%", left: "3%" }, delay: 0.4 },
  { name: "데이터 분석가", icon: BarChart3, position: { bottom: "15%", right: "5%" }, delay: 0.6 },
  { name: "기획자", icon: Lightbulb, position: { top: "45%", left: "0%" }, delay: 0.3 },
  { name: "교육자", icon: BookOpen, position: { top: "48%", right: "2%" }, delay: 0.5 },
];

export function AnimatedHandshake() {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex items-center justify-center">
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Human Hand (Left) - Handshake position */}
      <motion.svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        className="absolute"
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: [-200, -40, -40, -40],
          y: [0, 0, -5, 5, 0, -5, 5, 0],
          opacity: [0, 1, 1, 1],
          rotate: [0, 90, 90, 90]
        }}
        transition={{
          x: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Human hand - simple and clear 5 fingers */}
        <defs>
          <linearGradient id="humanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="humanGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wrist/Forearm */}
        <rect x="48" y="88" width="28" height="20" rx="4" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Palm */}
        <ellipse cx="62" cy="70" rx="16" ry="22" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Thumb (1st finger) */}
        <ellipse cx="44" cy="65" rx="6" ry="16" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" transform="rotate(-35 44 65)" />
        
        {/* Index finger (2nd finger) */}
        <rect x="50" y="35" width="7" height="20" rx="3.5" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Middle finger (3rd finger) */}
        <rect x="58" y="30" width="7" height="25" rx="3.5" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Ring finger (4th finger) */}
        <rect x="66" y="34" width="7" height="21" rx="3.5" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Pinky finger (5th finger) */}
        <rect x="74" y="40" width="6" height="16" rx="3" fill="url(#humanGradient)" filter="url(#humanGlow)" opacity="0.95" />
        
        {/* Subtle knuckle details */}
        <circle cx="53.5" cy="48" r="1.5" fill="#f59e0b" opacity="0.3" />
        <circle cx="61.5" cy="45" r="1.5" fill="#f59e0b" opacity="0.3" />
        <circle cx="69.5" cy="47" r="1.5" fill="#f59e0b" opacity="0.3" />
        <circle cx="77" cy="50" r="1.5" fill="#f59e0b" opacity="0.3" />
        

      </motion.svg>

      {/* Robot Hand (Right) - Handshake position */}
      <motion.svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        className="absolute"
        initial={{ x: 200, opacity: 0 }}
        animate={{
          x: [200, 40, 40, 40],
          y: [0, 0, -5, 5, 0, -5, 5, 0],
          opacity: [0, 1, 1, 1],
          rotate: [0, -90, -90, -90],
          scaleY: [1, -1, -1, -1]
        }}
        transition={{
          x: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, times: [0, 0.3, 0.5, 1], repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Robot hand - mechanical segments */}
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="robotGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wrist/Forearm - mechanical */}
        <rect x="50" y="90" width="30" height="18" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
        <line x1="50" y1="95" x2="80" y2="95" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
        <line x1="50" y1="100" x2="80" y2="100" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
        <circle cx="55" cy="99" r="2" fill="#1e3a8a" opacity="0.5" />
        <circle cx="75" cy="99" r="2" fill="#1e3a8a" opacity="0.5" />
        
        {/* Palm - segmented */}
        <rect x="45" y="60" width="35" height="30" rx="3" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
        <line x1="45" y1="70" x2="80" y2="70" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
        <line x1="45" y1="80" x2="80" y2="80" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
        <circle cx="50" cy="65" r="2" fill="#1e3a8a" opacity="0.5" />
        <circle cx="50" cy="75" r="2" fill="#1e3a8a" opacity="0.5" />
        <circle cx="50" cy="85" r="2" fill="#1e3a8a" opacity="0.5" />
        
        {/* Thumb - mechanical */}
        <g transform="rotate(-30 39.5 60)">
          <rect x="36" y="48" width="7" height="24" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
          <line x1="36" y1="56" x2="43" y2="56" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="36" y1="64" x2="43" y2="64" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <circle cx="39.5" cy="52" r="1.5" fill="#1e3a8a" opacity="0.5" />
          <circle cx="39.5" cy="60" r="1.5" fill="#1e3a8a" opacity="0.5" />
        </g>
        
        {/* Index finger */}
        <g>
          <rect x="48" y="28" width="8" height="32" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
          <line x1="48" y1="40" x2="56" y2="40" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="48" y1="48" x2="56" y2="48" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <circle cx="52" cy="36" r="1.5" fill="#1e3a8a" opacity="0.5" />
          <circle cx="52" cy="44" r="1.5" fill="#1e3a8a" opacity="0.5" />
        </g>
        
        {/* Middle finger */}
        <g>
          <rect x="58" y="22" width="8" height="38" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
          <line x1="58" y1="36" x2="66" y2="36" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="58" y1="46" x2="66" y2="46" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <circle cx="62" cy="32" r="1.5" fill="#1e3a8a" opacity="0.5" />
          <circle cx="62" cy="42" r="1.5" fill="#1e3a8a" opacity="0.5" />
        </g>
        
        {/* Ring finger */}
        <g>
          <rect x="68" y="26" width="8" height="34" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
          <line x1="68" y1="38" x2="76" y2="38" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="68" y1="48" x2="76" y2="48" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <circle cx="72" cy="34" r="1.5" fill="#1e3a8a" opacity="0.5" />
          <circle cx="72" cy="44" r="1.5" fill="#1e3a8a" opacity="0.5" />
        </g>
        
        {/* Pinky finger */}
        <g>
          <rect x="78" y="32" width="7" height="28" rx="2" fill="url(#robotGradient)" filter="url(#robotGlow)" opacity="0.9" />
          <line x1="78" y1="42" x2="85" y2="42" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="78" y1="50" x2="85" y2="50" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <circle cx="81.5" cy="38" r="1.5" fill="#1e3a8a" opacity="0.5" />
          <circle cx="81.5" cy="46" r="1.5" fill="#1e3a8a" opacity="0.5" />
        </g>
      </motion.svg>

      {/* Center connection sparkle */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 0, 1, 1.2, 1, 1.2, 1],
          opacity: [0, 0, 1, 0.8, 1, 0.8, 1],
        }}
        transition={{
          duration: 4,
          times: [0, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7],
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-md" />
          <div className="absolute inset-2 bg-blue-200 rounded-full" />
        </div>
      </motion.div>

      {/* Subtle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-300/30 rounded-full blur-sm"
          style={{
            left: `${35 + i * 10}%`,
            top: `${45 + (i % 2) * 10}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Floating Job Cards */}
      {jobCards.map((job, i) => {
        const Icon = job.icon;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={job.position}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.9, 0.9],
              scale: [0.8, 1, 1],
              y: [0, -8, 0, -8, 0]
            }}
            transition={{
              opacity: { duration: 1, times: [0, 0.5, 1], delay: job.delay },
              scale: { duration: 1, times: [0, 0.5, 1], delay: job.delay },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: job.delay + 1 }
            }}
          >
            <div className="px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#00bcd4]/20 shadow-lg hover:shadow-xl hover:border-[#00bcd4]/40 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00bcd4] to-[#00e5cc] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-[#0d1b2a] whitespace-nowrap" style={{ fontWeight: '500' }}>
                  {job.name}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
