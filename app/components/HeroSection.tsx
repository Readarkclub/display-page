export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: '#43E660' }}
      aria-labelledby="hero-heading"
    >
      {/* SVG Gooey fluid background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMidSlice"
        aria-hidden="true"
        style={{ filter: 'url(#gooey)' }}
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>

        <circle cx="200" cy="300" r="80" fill="#43E660" opacity="0.6">
          <animate attributeName="cx" values="200;400;250;150;300;350;200" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;150;350;400;200;250;300" dur="15s" repeatCount="indefinite" />
          <animate attributeName="r" values="80;120;60;100;80;70;80" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="200" r="100" fill="#E84BE0" opacity="0.5">
          <animate attributeName="cx" values="600;500;650;550;600;450;600" dur="14s" repeatCount="indefinite" />
          <animate attributeName="cy" values="200;350;400;250;300;150;200" dur="15s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="450" r="70" fill="#FFC940" opacity="0.4">
          <animate attributeName="cx" values="400;300;500;350;400;450;300;400" dur="16s" repeatCount="indefinite" />
          <animate attributeName="cy" values="450;500;350;300;400;350;450" dur="13s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="90" fill="#8B5CF6" opacity="0.3">
          <animate attributeName="cx" values="150;250;100;200;150;300;150" dur="18s" repeatCount="indefinite" />
          <animate attributeName="cy" values="150;300;100;250;150;200;150" dur="14s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-20">
        {/* Achievement badge - Glass morphism */}
        <div className="glass inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#1A1A2E' }}
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base font-bold" style={{ color: '#1A1A2E' }}>
            7节课产出2个实际产品
          </p>
        </div>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight"
          style={{ color: '#1A1A2E' }}
        >
          跟AI共进，
          <br />
          <span
            className="inline-block px-4 py-1 rounded-2xl mt-2"
            style={{ backgroundColor: '#1A1A2E', color: '#43E660' }}
          >
            让每个人
          </span>
          <br />
          成为创造者
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ color: '#1A1A2E', opacity: 0.75 }}
        >
          AI时代的产品探索者 · AI编程实践派
        </p>
        <p
          className="text-base sm:text-lg font-normal max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#1A1A2E', opacity: 0.65 }}
        >
          从传统管理到AI赋能的实践者，致力于AI工具让每个人成为创造者
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="glass-strong inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg cursor-pointer"
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
            className="glass inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              borderColor: '#1A1A2E',
              color: '#1A1A2E',
            }}
            aria-label="联系我"
          >
            联系我
          </a>
        </div>
      </div>

      {/* Bottom wave - SVG animated */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="white">
            <animate attributeName="d"
              values="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z;M0 80L1440 80L1440 50C1200 30 960 70 720 20C480 40 240 60 0 40L0 80Z;M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z"
              dur="6s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    </section>
  );
}
