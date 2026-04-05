'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { prepare, layout, prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

// ═══════════════════════════════════════════
// Pretext-Powered HeroSection v5
// 零CLS + Shrinkwrap徽章 + 逐行打字机动画
// ═══════════════════════════════════════════

const HEADLINE_LINES = ['跟AI共进，', '让每个人', '成为创造者'];
const SUBTITLE = 'AI时代的产品探索者 · AI编程实践派';
const DESC = '从传统管理到AI赋能的实践者，致力于AI工具让每个人成为创造者';
const BADGE_TEXT = '7节课产出2个实际产品';
const HIGHLIGHT_TEXT = '让每个人';

interface MeasuredText {
  height: number;
  lineCount: number;
  lines?: { text: string; width: number }[];
}

export default function HeroSectionPretext() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [measurements, setMeasurements] = useState<{
    headline: MeasuredText[];
    subtitle: MeasuredText;
    desc: MeasuredText;
    badge: MeasuredText;
    highlight: { width: number; height: number };
  } | null>(null);
  
  // Refs for resize observer
  const headlineRefs = useRef<HTMLHeadingElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // ── Step 1: 用 Pretext 测量所有文本 ──
  const measureAll = useCallback((containerWidth: number) => {
    const headlineWidth = Math.min(containerWidth * 0.85, 900);
    const subtitleWidth = Math.min(containerWidth * 0.6, 650);
    const descWidth = Math.min(containerWidth * 0.5, 550);
    
    try {
      // 测量每行标题
      const headlineMeasurements = HEADLINE_LINES.map(line => {
        const prepared = prepare(line, 'bold 80px/1.05 "PingFang SC", "Microsoft YaHei", sans-serif');
        const result = layout(prepared, headlineWidth, 96);
        return { height: result.height, lineCount: result.lineCount };
      });

      // 测量副标题
      const subPrepared = prepare(SUBTITLE, '500 20px/1.6 "PingFang SC", "Microsoft YaHei", sans-serif');
      const subResult = layout(subPrepared, subtitleWidth, 32);

      // 测量描述
      const descPrepared = prepare(DESC, '400 16px/1.7 "PingFang SC", "Microsoft YaHei", sans-serif');
      const descResult = layout(descPrepared, descWidth, 27);

      // 测量 Badge
      const badgePrepared = prepare(BADGE_TEXT, '600 15px "PingFang SC", "Microsoft YaHei", sans-serif');
      const badgeResult = layout(badgePrepared, 300, 24);

      // ★ Shrinkwalk: 找到高亮文字的最小宽度
      const hlPrepared = prepareWithSegments(HIGHLIGHT_TEXT, 'bold 80px/1.05 "PingFang SC", "Microsoft YaHei", sans-serif');
      const hlLayout = layout(hlPrepared, headlineWidth, 96);
      
      // 用 walkLineRanges 做 shrinkwrap（核心能力！）
      let shrinkWidth = headlineWidth;
      try {
        // ★ Shrinkwalk: 遍历每行，找到实际内容宽度
        let measuredMinWidth = headlineWidth;
        walkLineRanges(hlPrepared, headlineWidth, (lineRange) => {
          // LayoutLineRange.width = 该行的实际像素宽度
          if (lineRange.width > 0 && lineRange.width < measuredMinWidth) {
            measuredMinWidth = lineRange.width;
          }
        });
        shrinkWidth = measuredMinWidth + 16; // +padding
      } catch(e) {
        // fallback: 用文本长度估算
        shrinkWidth = Math.min(HIGHLIGHT_TEXT.length * 48, headlineWidth);
      }

      setMeasurements({
        headline: headlineMeasurements,
        subtitle: { height: subResult.height, lineCount: subResult.lineCount },
        desc: { height: descResult.height, lineCount: descResult.lineCount },
        badge: { height: badgeResult.height, lineCount: badgeResult.lineCount },
        highlight: { width: shrinkWidth, height: hlLayout.height },
      });

      return true;
    } catch(e) {
      console.warn('[Pretext] Measurement fallback:', e);
      return false;
    }
  }, []);

  // ── Step 2: 初始化测量 + 动画 ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const success = measureAll(width);
    
    if (success) {
      // 短暂延迟后开始打字机动画
      requestAnimationFrame(() => setReady(true));
      
      // 逐行显示动画
      HEADLINE_LINES.forEach((_, i) => {
        setTimeout(() => setVisibleLines(v => v + 1), 200 + i * 180);
      });
    } else {
      // Fallback: 直接显示
      setReady(true);
      setVisibleLines(HEADLINE_LINES.length);
    }
  }, [measureAll]);

  // ── Step 3: Resize 时重新测量（不触发重排！）──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        measureAll(entry.contentRect.width);
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [measurements, measureAll]);

  // 计算总高度（零CLS关键！）
  const totalHeight = measurements 
    ? (64 + // badge
       measurements.headline.reduce((s, m) => s + m.height, 0) + 16 + // headlines + gap
       measurements.subtitle.height + 16 + // subtitle + gap
       measurements.desc.height + 48) // desc + CTA gap
    : undefined;

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden pt-16"
      style={{ 
        backgroundColor: '#43E660',
        minHeight: totalHeight ? `${Math.max(totalHeight + 200, 600)}px` : '100vh',
        transition: 'min-height 0.3s ease',
      }}
      aria-labelledby="hero-heading"
    >
      {/* ══ SVG Gooey Fluid Background（保持原设计）══ */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ filter: 'url(#gooey)' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
        <circle cx="200" cy="300" r="80" fill="#43E660" opacity="0.6">
          <animate attributeName="cx" values="200;400;250;150;300;350;200" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;150;350;400;200;250;300" dur="15s" repeatCount="indefinite" />
          <animate attributeName="r" values="80;120;60;100;80;70;80" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="200" r="100" fill="#E84BE0" opacity="0.5">
          <animate attributeName="cx" values="600;500;650;550;600;450;600" dur="14s" repeatCount="indefinite" />
          <animate attributeName="cy" values="200;350;400;250;300;150;200" dur="15s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="450" r="70" fill="#FFC940" opacity="0.4">
          <animate attributeName="cx" values="400;300;500;350;400;450;300;400" dur="16s" repeatCount="indefinite" />
          <animate attributeName="cy" values="450;500;350;300;400;350;450" dur="13s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="90" fill="#8B5CF6" opacity="0.3">
          <animate attributeName="cx" values="150;250;100;200;150;300;150" dur="18s" repeatCount="indefinite" />
          <animate attributeName="cy" values="150;300;100;250;150;200;150" dur="14s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* ══ Main Content（Pretext 驱动）══ */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-20">
        
        {/* ── Achievement Badge（Shrinkwrap 宽度）── */}
        <div 
          className="glass inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full transition-opacity duration-500"
          style={{ 
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#1A1A2E' }} aria-hidden="true" />
          <p className="text-sm sm:text-base font-bold" style={{ color: '#1A1A2E' }}>
            {BADGE_TEXT}
          </p>
          {/* Pretext 技术标识 */}
          <span className="ml-2 text-[10px] font-mono opacity-40" style={{ color: '#1A1A2E' }}>⚡pretext</span>
        </div>

        {/* ── Main Headline（逐行打字机）── */}
        <h1 id="hero-heading" className="font-black leading-none mb-6 tracking-tight" style={{ color: '#1A1A2E' }}>
          {HEADLINE_LINES.map((line, idx) => {
            const isHighlight = line === HIGHLIGHT_TEXT;
            const isVisible = idx < visibleLines;
            
            return (
              <div
                key={idx}
                className="transition-all duration-700 ease-out"
                style={{
                  fontSize: idx === 1 ? '0.85em' : '1em', // 高亮行稍小（有背景padding）
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {isHighlight ? (
                  <span
                    className="inline-block px-4 py-1 rounded-2xl mt-2"
                    style={{ 
                      backgroundColor: '#1A1A2E', 
                      color: '#43E660',
                      // ★ Shrinkwrap: 只占用内容需要的宽度
                      display: 'inline-block',
                      ...(measurements ? { 
                        // Pretext 计算出的精确宽度（可选约束）
                        maxWidth: `${measurements.highlight.width}px`,
                      } : {}),
                    }}
                  >
                    {line}
                  </span>
                ) : (
                  <>
                    {line}
                    {idx === 0 && <br />}
                  </>
                )}
              </div>
            );
          })}
        </h1>

        {/* ── Subtitle（淡入）── */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-4 leading-relaxed transition-opacity duration-700"
          style={{ 
            color: '#1A1A2E', 
            opacity: ready ? 0.75 : 0,
            transitionDelay: '400ms',
          }}
        >
          {SUBTITLE}
        </p>

        {/* ── Description（淡入）── */}
        <p
          className="text-base sm:text-lg font-normal max-w-xl mx-auto mb-12 leading-relaxed transition-opacity duration-700"
          style={{ 
            color: '#1A1A2E', 
            opacity: ready ? 0.65 : 0,
            transitionDelay: '500ms',
          }}
        >
          {DESC}
        </p>

        {/* ── CTA Buttons（滑入）── */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-opacity duration-700"
          style={{ 
            opacity: ready ? 1 : 0,
            transitionDelay: '600ms',
          }}
        >
          <a href="#projects" className="glass-strong inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg cursor-pointer" style={{ backgroundColor: '#1A1A2E', color: '#FFFFFF' }} aria-label="查看我的作品">
            查看我的作品
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="mailto:2069904600@qq.com" className="glass inline-flex items-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold border-2 transition-all duration-300 hover:scale-105 cursor-pointer" style={{ borderColor: '#1A1A2E', color: '#1A1A2E' }} aria-label="联系我">
            联系我
          </a>
        </div>
      </div>

      {/* ══ Bottom Wave（保持原设计）══ */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="white">
            <animate attributeName="d" values="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z;M0 80L1440 80L1440 50C1200 30 960 70 720 20C480 40 240 60 0 40L0 80Z;M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" dur="6s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    </section>
  );
}



