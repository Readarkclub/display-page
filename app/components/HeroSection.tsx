export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: '#43E660' }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-40 pointer-events-none"
        style={{ backgroundColor: '#E84BE0' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-8%] left-[-8%] w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-30 pointer-events-none"
        style={{ backgroundColor: '#FFC940' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[40%] left-[5%] w-24 h-24 rounded-full opacity-50 pointer-events-none"
        style={{ backgroundColor: '#8B5CF6' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full opacity-60 pointer-events-none"
        style={{ backgroundColor: '#1A1A2E' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[25%] right-[8%] w-12 h-12 rounded-full opacity-40 pointer-events-none"
        style={{ backgroundColor: '#FFC940' }}
        aria-hidden="true"
      />

      {/* Decorative squares */}
      <div
        className="absolute top-[15%] left-[12%] w-10 h-10 rounded-xl rotate-12 opacity-50 pointer-events-none"
        style={{ backgroundColor: '#1A1A2E' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[30%] left-[20%] w-8 h-8 rounded-lg rotate-45 opacity-40 pointer-events-none"
        style={{ backgroundColor: '#8B5CF6' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-20">
        {/* Achievement badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/30 backdrop-blur-sm border border-white/40">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#1A1A2E' }}
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base font-bold" style={{ color: '#1A1A2E' }}>
            7次课完成2个公网产品
          </p>
        </div>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight"
          style={{ color: '#1A1A2E' }}
        >
          用AI创造，
          <br />
          <span
            className="inline-block px-4 py-1 rounded-2xl mt-2"
            style={{ backgroundColor: '#1A1A2E', color: '#43E660' }}
          >
            让每个人
          </span>
          <br />
          都是创作者
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ color: '#1A1A2E', opacity: 0.75 }}
        >
          AI时代的产品探索者 · AI技术实践派
        </p>
        <p
          className="text-base sm:text-lg font-normal max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#1A1A2E', opacity: 0.65 }}
        >
          从传统开发到AI编程的实践者，相信AI工具能让每个人成为创造者
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg cursor-pointer"
            style={{ backgroundColor: '#1A1A2E', color: '#FFFFFF' }}
            aria-label="查看我的作品"
          >
            查看我的作品
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="mailto:2069904600@qq.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold border-2 transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              borderColor: '#1A1A2E',
              color: '#1A1A2E',
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
            aria-label="发送邮件联系"
          >
            联系我
          </a>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
