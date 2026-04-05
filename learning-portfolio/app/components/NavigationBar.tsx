'use client';

import { useState, useEffect } from 'react';

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="主导航"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl font-black text-dark tracking-tight hover:opacity-80 transition-opacity"
          aria-label="David Li - 回到顶部"
        >
          David Li
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          <button
            onClick={() => scrollTo('projects')}
            className="text-sm font-semibold text-dark/70 hover:text-dark transition-colors cursor-pointer"
            role="listitem"
          >
            作品
          </button>
          <button
            onClick={() => scrollTo('learning')}
            className="text-sm font-semibold text-dark/70 hover:text-dark transition-colors cursor-pointer"
            role="listitem"
          >
            学习心得
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-sm font-semibold text-dark/70 hover:text-dark transition-colors cursor-pointer"
            role="listitem"
          >
            联系
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:2069904600@qq.com"
            className="inline-flex items-center px-5 py-2.5 bg-dark text-white text-sm font-bold rounded-full hover:bg-dark/80 transition-all duration-200 hover:scale-105"
            aria-label="发送邮件联系"
          >
            联系我
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl text-dark hover:bg-black/5 transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-4 py-4 flex flex-col gap-2">
          <button
            onClick={() => scrollTo('projects')}
            className="text-left w-full px-4 py-3 text-sm font-semibold text-dark/70 hover:text-dark hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
          >
            作品
          </button>
          <button
            onClick={() => scrollTo('learning')}
            className="text-left w-full px-4 py-3 text-sm font-semibold text-dark/70 hover:text-dark hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
          >
            学习心得
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-left w-full px-4 py-3 text-sm font-semibold text-dark/70 hover:text-dark hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
          >
            联系
          </button>
          <a
            href="mailto:2069904600@qq.com"
            className="mt-2 text-center px-5 py-3 bg-dark text-white text-sm font-bold rounded-full hover:bg-dark/80 transition-colors"
          >
            联系我
          </a>
        </div>
      )}
    </header>
  );
}
