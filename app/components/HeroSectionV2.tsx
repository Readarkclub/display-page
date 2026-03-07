'use client';

import { useEffect, useRef } from 'react';

export default function HeroSectionV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // CRT monitor effect - horizontal scan lines
    let scanY = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glowing scan line
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.fillRect(0, scanY, canvas.width, 2);
      
      scanY = (scanY + 3) % canvas.height;
      requestAnimationFrame(animate);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden scanlines diagonal-stripes">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50" aria-hidden="true" />
      
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto">
        {/* Asymmetric layout */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left: Main content */}
          <div className="md:col-span-7 space-y-8 animate-slide-in-left">
            {/* Badge */}
            <div className="inline-block brutal-border px-4 py-2 bg-[var(--bg-secondary)]">
              <span className="text-xs font-mono neon-cyan">● ONLINE</span>
              <span className="text-xs text-[var(--text-secondary)] ml-3">7次课 → 2个产品</span>
            </div>

            {/* Name - Huge and bold */}
            <h1 className="text-7xl md:text-9xl font-black leading-none glitch">
              <span className="block neon-cyan">DAVID</span>
              <span className="block neon-magenta">LI</span>
            </h1>

            {/* Subtitle */}
            <div className="space-y-2 font-mono text-sm md:text-base">
              <p className="text-[var(--text-secondary)]">
                <span className="neon-yellow">&gt;</span> AI时代的产品探索者
              </p>
              <p className="text-[var(--text-secondary)]">
                <span className="neon-yellow">&gt;</span> AI技术实践派
              </p>
              <p className="text-[var(--text-muted)] text-xs mt-4 max-w-md">
                从传统开发到AI编程的实践者<br/>
                相信AI工具能让每个人成为创造者
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group brutal-border-magenta px-8 py-4 bg-[var(--bg-primary)] hover:bg-[var(--accent-magenta)] hover:text-black transition-all duration-300 font-mono font-bold hover-lift"
            >
              [查看作品] →
            </button>
          </div>

          {/* Right: ASCII art decoration */}
          <div className="md:col-span-5 hidden md:block animate-slide-in-right">
            <pre className="text-[var(--accent-cyan)] text-xs leading-tight opacity-30 font-mono">
{`    ╔═══════════════════╗
    ║   AI × PRODUCT    ║
    ║                   ║
    ║   ████████████    ║
    ║   ██        ██    ║
    ║   ██  CODE  ██    ║
    ║   ██        ██    ║
    ║   ████████████    ║
    ║                   ║
    ║   BUILDER MODE    ║
    ╚═══════════════════╝`}
            </pre>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center text-xs font-mono text-[var(--text-muted)] animate-fade-up">
          <span>LOCATION: 中国</span>
          <span>STATUS: BUILDING</span>
          <span>UPTIME: 24/7</span>
        </div>
      </div>
    </section>
  );
}
