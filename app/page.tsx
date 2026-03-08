import SkipLink from './components/SkipLink';

export default function Home() {
  return (
    <>
      <SkipLink />
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              DL
            </div>
          </div>

          {/* Name & Bio */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">David Li</h1>
            <p className="text-gray-600">AI时代的产品探索者</p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <a
              href="https://readarkclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="font-medium text-gray-900">读书俱乐部</div>
              <div className="text-sm text-gray-500 mt-1">图书展示与管理平台</div>
            </a>

            <a
              href="#"
              className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="font-medium text-gray-900">茶经说</div>
              <div className="text-sm text-gray-500 mt-1">茶文化社区网站</div>
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
