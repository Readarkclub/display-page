'use client';

export default function HeroSectionV4() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-md w-full">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              DL
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-center mb-2 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
            David Li
          </h1>

          {/* Bio */}
          <p className="text-center text-white/80 text-sm mb-8">
            AI时代的产品探索者 · AI技术实践派
          </p>

          {/* Links */}
          <div className="space-y-3">
            <a
              href="https://readarkclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border border-white/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">📚 读书俱乐部</span>
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a
              href="#"
              className="block bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border border-white/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">🍵 茶经说</span>
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-white/60 text-xs">
            © 2026 David Li
          </div>
        </div>
      </div>
    </section>
  );
}
