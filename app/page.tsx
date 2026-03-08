import SkipLink from './components/SkipLink';

export default function Home() {
  return (
    <>
      <SkipLink />
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              DL
            </div>
          </div>

          {/* Name & Bio */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">David Li</h1>
            <p className="text-lg text-gray-600">AI时代的产品探索者</p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <a
              href="https://readarkclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-white/50"
            >
              <div className="font-semibold text-lg text-gray-900">读书俱乐部</div>
              <div className="text-sm text-gray-500 mt-2">图书展示与管理平台</div>
            </a>

            <a
              href="#"
              className="block bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-white/50"
            >
              <div className="font-semibold text-lg text-gray-900">茶经说</div>
              <div className="text-sm text-gray-500 mt-2">茶文化社区网站</div>
            </a>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            © 2026 David Li
          </div>
        </div>
      </main>
    </>
  );
}
