'use client';

import { useEffect, useRef } from 'react';

export default function HeroSectionOptimized() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (prefersReducedMotion) {
      // Static gradient mesh
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Stripe-inspired gradient orbs
    interface Orb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    const orbs: Orb[] = [
      { x: canvas.width * 0.3, y: canvas.height * 0.4, radius: 200, vx: 0.3, vy: 0.2, color: 'rgba(59, 130, 246, 0.15)' },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 250, vx: -0.2, vy: 0.3, color: 'rgba(147, 51, 234, 0.12)' },
      { x: canvas.width * 0.5, y: canvas.height * 0.3, radius: 180, vx: 0.25, vy: -0.25, color: 'rgba(236, 72, 153, 0.1)' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-700">7次课完成2个公网产品</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up tracking-tight">
          <span className="gradient-text">David Li</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
          AI时代的产品探索者 · AI技术实践派
        </p>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed" style={{animationDelay: '0.2s'}}>
          从传统开发到AI编程的实践者，相信AI工具能让每个人成为创造者
        </p>

        {/* CTA */}
        <button
          onClick={scrollToProjects}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-scale-in"
          style={{animationDelay: '0.3s'}}
        >
          查看作品
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
