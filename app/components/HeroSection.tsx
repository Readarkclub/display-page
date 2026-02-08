'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Draw static particles without animation
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const staticParticles = 30;
      for (let i = 0; i < staticParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.fill();
      }
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles and connections
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.6)'; // CTA color with opacity
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 animate-fade-in">
          David Li
        </h1>

        {/* Tags */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <span className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
            AI时代的产品探索者
          </span>
          <span className="hidden sm:inline text-secondary">·</span>
          <span className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
            AI技术实践派
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          从传统开发到AI编程的实践者，
          <br className="hidden sm:inline" />
          相信AI工具能让每个人成为创造者
        </p>

        {/* Achievement badge */}
        <div className="inline-block px-6 py-3 mb-12 rounded-full bg-white/80 backdrop-blur-sm border border-cta/20 shadow-lg">
          <p className="text-lg sm:text-xl font-semibold text-cta">
            7次课完成2个公网产品
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToProjects}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-cta text-white rounded-full font-medium text-lg hover:bg-cta/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
          aria-label="向下滚动查看作品"
        >
          向下滚动查看作品
          <svg
            className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>
  );
}
