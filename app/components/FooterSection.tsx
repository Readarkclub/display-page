export default function FooterSection() {
  return (
    <footer className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          联系我 / Get in Touch
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
          如果你对AI编程、产品探索感兴趣
          <br />
          欢迎与我交流
        </p>

        {/* Email Contact */}
        <a
          href="mailto:2069904600@qq.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-medium text-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer group"
          aria-label="发送邮件到 2069904600@qq.com"
        >
          <svg
            className="w-6 h-6"
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
          2069904600@qq.com
        </a>

        {/* Divider */}
        <div className="my-12 border-t border-white/20" />

        {/* Copyright */}
        <p className="text-white/70 text-sm sm:text-base">
          © 2026 David Li · 学习成果展示页
        </p>
      </div>
    </footer>
  );
}
