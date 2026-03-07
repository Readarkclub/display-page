'use client';

export default function FooterSectionOptimized() {
  return (
    <footer className="py-16 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">让我们一起探索AI的可能性</h3>
        <p className="text-gray-400 mb-8">欢迎交流AI编程和产品创新</p>
        
        <a
          href="mailto:2069904600@qq.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          联系我
        </a>

        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          © 2026 David Li · 学习成果展示页
        </div>
      </div>
    </footer>
  );
}
