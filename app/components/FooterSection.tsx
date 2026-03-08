export default function FooterSection() {
  return (
    <>
      {/* CTA Banner - Yellow background */}
      <section
        id="contact"
        aria-labelledby="cta-heading"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32"
        style={{ backgroundColor: '#FFC940' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-[-60px] right-[-40px] w-56 h-56 rounded-full opacity-30 pointer-events-none"
          style={{ backgroundColor: '#E84BE0' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-40px] left-[10%] w-40 h-40 rounded-full opacity-25 pointer-events-none"
          style={{ backgroundColor: '#8B5CF6' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-[30%] left-[-30px] w-24 h-24 rounded-full opacity-40 pointer-events-none"
          style={{ backgroundColor: '#43E660' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-6"
            style={{ color: '#1A1A2E', opacity: 0.6 }}
          >
            开始你的旅程
          </p>
          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
            style={{ color: '#1A1A2E' }}
          >
            开始你的
            <br />
            AI编程之旅
          </h2>
          <p
            className="text-lg sm:text-xl font-medium max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#1A1A2E', opacity: 0.7 }}
          >
            如果你对AI编程、产品探索感兴趣，欢迎与我交流。相信AI工具能让每个人都成为创造者。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:2069904600@qq.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg cursor-pointer"
              style={{ backgroundColor: '#1A1A2E', color: '#43E660' }}
              aria-label="发送邮件到 2069904600@qq.com"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              发送邮件
            </a>
            <span
              className="text-sm font-semibold"
              style={{ color: '#1A1A2E', opacity: 0.55 }}
            >
              2069904600@qq.com
            </span>
          </div>
        </div>
      </section>

      {/* Dark Footer */}
      <footer
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        style={{ backgroundColor: '#1A1A2E' }}
        aria-label="页脚"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex-shrink-0">
              <p className="text-2xl font-black text-white mb-3">David Li</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '200px' }}>
                AI时代的产品探索者
                <br />
                AI技术实践派
              </p>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  作品
                </p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="https://vibewriting.readark.club/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      AI写作助手
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tai-ping-year.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      太平年介绍页
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  导航
                </p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="#projects"
                      className="text-sm font-medium transition-colors hover:text-white cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      产品实践
                    </a>
                  </li>
                  <li>
                    <a
                      href="#learning"
                      className="text-sm font-medium transition-colors hover:text-white cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      学习心得
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  联系
                </p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="mailto:2069904600@qq.com"
                      className="text-sm font-medium transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      邮件联系
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              &copy; 2026 David Li &middot; 学习成果展示页
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#43E660' }}
                aria-hidden="true"
              />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                用AI构建
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
