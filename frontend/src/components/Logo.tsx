export function Logo() {
  return (
    <div className="relative inline-block group cursor-pointer">
      {/* Subtle glow effect for dark background */}
      <div 
        className="absolute inset-0 blur-2xl opacity-40 transition-all duration-300 group-hover:opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 204, 0.3) 0%, rgba(0, 188, 212, 0.3) 100%)',
        }}
      />
      
      {/* Text Content */}
      <div className="relative flex items-center gap-0.5 flex-nowrap">
        <span 
          className="whitespace-nowrap text-5xl md:text-7xl"
          style={{ 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #00e5cc 50%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          JOB
        </span>
        <span 
          className="whitespace-nowrap text-5xl md:text-7xl"
          style={{ 
            fontWeight: '600',
            background: 'linear-gradient(135deg, #ffffff 0%, #00e5cc 50%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.08em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          잘하다
        </span>
      </div>
    </div>
  );
}

export function LogoCompact() {
  return (
    <div className="relative inline-block">
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 blur-xl opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 204, 0.2) 0%, rgba(0, 188, 212, 0.2) 100%)',
        }}
      />
      
      {/* Text Content */}
      <div className="relative flex items-baseline gap-0.5 flex-nowrap">
        <span 
          className="whitespace-nowrap"
          style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #00e5cc 50%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          JOB
        </span>
        <span 
          className="whitespace-nowrap"
          style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #ffffff 0%, #00e5cc 50%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.08em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          잘하다
        </span>
      </div>
    </div>
  );
}
