'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { prepare, layout, prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

// ═══════════════════════════════════════════════════════════════
//  HeroEditorial — 居中布局 + 超大标题 + 装饰光球
//  参考设计: 文字居中叠在光球上层，pretext 做零CLS测量
// ═══════════════════════════════════════════════════════════════

// ── 内容 ──
const BADGE_TEXT = '7节课产出2个实际产品';
const HEADLINE_LINES = ['跟AI共进，', '让每个人', '成为创造者'];
const SUBTITLE = 'AI时代的产品探索者 · AI编程实践派';
const DESC_TEXT = '从传统管理到AI赋能的实践者，致力于AI工具让每个人成为创造者';

// ── 光球定义（装饰用，z-index 在文字下方）──
interface OrbDef { fx: number; fy: number; r: number; vx: number; vy: number; color: [number,number,number] }
interface Orb { x: number; y: number; r: number; vx: number; vy: number; paused: boolean }

const orbDefs: OrbDef[] = [
  { fx: 0.65, fy: 0.45, r: 140, vx: 10, vy: 7, color: [232, 75, 224] },   // 品红大球
  { fx: 0.25, fy: 0.42, r: 70,  vx: -8, vy: 10, color: [120, 120, 120] },  // 灰色
  { fx: 0.50, fy: 0.75, r: 50,  vx: 6, vy: -8, color: [251, 191, 36] },    // 琥珀
];

export default function HeroEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const orbDomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<{ orbIdx: number; startX: number; startY: number; startOX: number; startOY: number } | null>(null);
  const lastTRef = useRef(0);

  // ── Pretext: 测量总高度实现零CLS ──
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const measureContent = useCallback((containerWidth: number) => {
    try {
      const maxW = Math.min(containerWidth * 0.85, 900);
      const fontSize = containerWidth >= 1200 ? 130 : containerWidth >= 768 ? 100 : 60;
      const headlineFont = `900 ${fontSize}px/0.95 "PingFang SC", "Microsoft YaHei", sans-serif`;
      const headlineLH = Math.round(fontSize * 0.95);

      // 测量标题总高度
      let totalHeadlineH = 0;
      for (const line of HEADLINE_LINES) {
        const p = prepare(line, headlineFont);
        totalHeadlineH += layout(p, maxW, headlineLH).height;
      }

      // 测量副标题
      const subP = prepare(SUBTITLE, '500 22px/1.6 "PingFang SC", "Microsoft YaHei", sans-serif');
      const subH = layout(subP, maxW, 35).height;

      // 测量描述
      const descP = prepare(DESC_TEXT, '400 17px/1.7 "PingFang SC", "Microsoft YaHei", sans-serif');
      const descH = layout(descP, maxW, 29).height;

      // badge + gap + headline + gap + subtitle + gap + desc + gap + CTA
      const total = 40 + 24 + totalHeadlineH + 20 + subH + 12 + descH + 40 + 56 + 120;
      setContentHeight(Math.max(total, 700));
    } catch {
      setContentHeight(undefined);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    measureContent(el.offsetWidth);
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) measureContent(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureContent]);

  // ── 光球初始化 ──
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    orbsRef.current = orbDefs.map(d => ({
      x: d.fx * w, y: d.fy * h, r: d.r,
      vx: d.vx, vy: d.vy, paused: false,
    }));
  }, []);

  // ── 光球 DOM 直接更新 ──
  const updateOrbDOM = useCallback(() => {
    const orbs = orbsRef.current;
    for (let i = 0; i < orbs.length; i++) {
      const el = orbDomRefs.current[i];
      if (!el) continue;
      const o = orbs[i];
      el.style.left = `${o.x - o.r}px`;
      el.style.top = `${o.y - o.r}px`;
      el.style.width = `${o.r * 2}px`;
      el.style.height = `${o.r * 2}px`;
      el.style.opacity = o.paused ? '0.4' : '1';
    }
  }, []);

  // ── 物理循环（仅更新光球，文字不做绕排）──
  useEffect(() => {
    let rafId: number;
    const loop = (now: number) => {
      const el = containerRef.current;
      if (!el) { rafId = requestAnimationFrame(loop); return; }
      const pw = el.clientWidth;
      const ph = el.clientHeight;
      const orbs = orbsRef.current;
      if (orbs.length === 0) { rafId = requestAnimationFrame(loop); return; }

      const dt = Math.min((now - lastTRef.current) / 1000, 0.05);
      lastTRef.current = now;
      let stillGoing = false;

      for (const orb of orbs) {
        if (orb.paused) continue;
        stillGoing = true;
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        if (orb.x - orb.r < 0) { orb.x = orb.r; orb.vx = Math.abs(orb.vx); }
        if (orb.x + orb.r > pw) { orb.x = pw - orb.r; orb.vx = -Math.abs(orb.vx); }
        if (orb.y - orb.r < 0) { orb.y = orb.r; orb.vy = Math.abs(orb.vy); }
        if (orb.y + orb.r > ph) { orb.y = ph - orb.r; orb.vy = -Math.abs(orb.vy); }
      }

      // 碰撞
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i], b = orbs[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r + 12;
          if (dist < minDist && dist > 0.1) {
            const force = (minDist - dist) * 0.5;
            const nx = dx / dist, ny = dy / dist;
            if (!a.paused) { a.vx -= nx * force * dt; a.vy -= ny * force * dt; }
            if (!b.paused) { b.vx += nx * force * dt; b.vy += ny * force * dt; }
          }
        }
      }

      updateOrbDOM();

      if (stillGoing) {
        rafId = requestAnimationFrame(loop);
      } else {
        setTimeout(() => { rafId = requestAnimationFrame(loop); }, 100);
      }
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [updateOrbDOM]);

  // ── 拖拽交互 ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const px = e.clientX, py = e.clientY;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = px - rect.left, ry = py - rect.top;
    const orbs = orbsRef.current;
    for (let i = orbs.length - 1; i >= 0; i--) {
      const o = orbs[i];
      if ((rx - o.x) ** 2 + (ry - o.y) ** 2 <= o.r ** 2) {
        e.preventDefault();
        dragRef.current = { orbIdx: i, startX: px, startY: py, startOX: o.x, startOY: o.y };
        return;
      }
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragRef.current) {
      const d = dragRef.current;
      const orb = orbsRef.current[d.orbIdx];
      if (orb) {
        orb.x = d.startOX + (e.clientX - d.startX);
        orb.y = d.startOY + (e.clientY - d.startY);
      }
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragRef.current) {
      const d = dragRef.current;
      const dx = e.clientX - d.startX, dy = e.clientY - d.startY;
      if (dx * dx + dy * dy < 16) {
        const orb = orbsRef.current[d.orbIdx];
        if (orb) orb.paused = !orb.paused;
      }
      dragRef.current = null;
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: 'linear-gradient(160deg, #5BF07A 0%, #43E660 30%, #38D954 60%, #43E660 100%)',
        minHeight: contentHeight ? `${contentHeight}px` : '100vh',
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        color: '#1A1A2E',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      aria-label="Hero"
    >
      {/* ── 装饰光球（z-[1]，在文字下方）── */}
      {orbDefs.map((def, i) => (
        <div
          key={`orb-${i}`}
          ref={el => { orbDomRefs.current[i] = el; }}
          className="absolute rounded-full z-[1] cursor-grab"
          style={{
            background: `radial-gradient(circle at 38% 38%, rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.55), rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.2) 55%, transparent 72%)`,
            boxShadow: `0 0 60px 20px rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.15)`,
          }}
        />
      ))}

      {/* ── 居中内容区（z-[2]，在光球上层）── */}
      <div className="relative z-[2] flex flex-col items-center justify-center px-6 py-20 sm:py-28" style={{ minHeight: contentHeight ? `${contentHeight}px` : '100vh' }}>

        {/* Badge */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A2E]" aria-hidden="true" />
          <span className="text-base sm:text-lg font-semibold tracking-wide">{BADGE_TEXT}</span>
        </div>

        {/* 超大标题 */}
        <h1
          id="hero-heading"
          className="text-center font-black leading-[0.92] tracking-tighter mb-5"
          style={{
            fontSize: 'clamp(60px, 10vw, 140px)',
          }}
        >
          {HEADLINE_LINES.map((line, idx) => (
            <span key={idx} className="block">{line}</span>
          ))}
        </h1>

        {/* 副标题 */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-3 opacity-80 tracking-wide">
          {SUBTITLE}
        </p>

        {/* 描述 */}
        <p className="text-sm sm:text-base md:text-lg text-center max-w-2xl mb-10 opacity-65 leading-relaxed">
          {DESC_TEXT}
        </p>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
            style={{ backgroundColor: '#1A1A2E', color: '#FFFFFF' }}
          >
            查看我的作品
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="mailto:2069904600@qq.com"
            className="px-8 py-4 rounded-full text-base sm:text-lg font-bold border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ borderColor: '#1A1A2E', color: '#1A1A2E' }}
          >
            联系我
          </a>
        </div>
      </div>

      {/* ── 底部波浪过渡 ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
