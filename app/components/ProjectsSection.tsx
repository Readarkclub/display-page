'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { prepare, layout } from '@chenglou/pretext';

interface ProjectData {
  title: string;
  subtitle: string;
  images: string[];
  productUrl: string;
  problem: string;
  solution: string[];
  challenges: { title: string; solution: string }[];
  learnings: string[];
  bgColor: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
}

const projects: ProjectData[] = [
  {
    title: 'AI写作助手',
    subtitle: 'Vibe Writing',
    images: ['/images/vibe-writing-1.png', '/images/vibe-writing-2.png'],
    productUrl: 'https://vibewriting.readark.club/',
    problem:
      '很多内容创作者（公众号作者、博主）在写作时主要卡在三点：写得慢、灵感断档、成稿"没味道"。更关键的是，市面上一些AI写作工具生成内容"AI味"很重（套话多、句式过于工整、缺少个人感受），影响可读性甚至会被AI检测识别出来。',
    solution: [
      '多种输入方式：链接抓取、Markdown上传、直接粘贴',
      '多模型支持：OpenAI、Claude、DeepSeek可自由切换',
      '三遍审校机制：内容审校 → 风格优化（降AI味）→ 细节打磨',
    ],
    challenges: [
      {
        title: '输入来源复杂，内容拿不到/拿不干净',
        solution: '统一校验层（文件类型、URL合法性、可访问性判断）+ 异常兜底提示',
      },
      {
        title: 'AI润色质量不稳定，"降AI味"容易过度',
        solution:
          '拆成三遍审校流程（专门做去套话、拆句、替换词、加入态度、短句化）+ UI按步骤展示进度',
      },
      {
        title: '状态管理混乱（可编辑+AI改写+历史版本）',
        solution: '单一数据源 + 版本栈管理（所有改动记录为版本节点，撤销/前进在版本栈上移动）',
      },
    ],
    learnings: [
      'Prompt/流程工程：把"写作润色"拆成稳定可控步骤，把"必删清单/替换规则/短句化阈值/标点规范"做成可执行规则集',
      '富文本/Markdown编辑：可编辑标题 + Markdown编辑器 + 字数统计 + 导出/复制的一体化编辑闭环',
      '健壮的输入与错误处理：多输入源统一校验、异常兜底提示、可重试的失败处理',
    ],
    bgColor: '#E84BE0',
    accentColor: '#FFFFFF',
    textColor: '#FFFFFF',
    badgeBg: 'rgba(255,255,255,0.25)',
    badgeText: '#FFFFFF',
  },
  {
    title: '太平年介绍页',
    subtitle: '一站式剧集信息平台',
    images: ['/images/taiping-1.png', '/images/taiping-2.png'],
    productUrl: 'https://tai-ping-year.netlify.app/',
    problem:
      '追剧观众、历史爱好者、海外观众和媒体从业者在查《太平年》资料时，信息分散在百科/短视频/新闻/讨论区，缺少"一站式、结构化、可浏览可搜索"的官方介绍页。尤其是这类现象级剧集，需要同时覆盖剧情、角色关系、口碑数据、海外传播、历史科普等内容，单一平台很难完整承载。',
    solution: [
      '多维度内容：剧情、角色、口碑数据、海外传播、历史科普',
      '交互可视化：全球播出地图、五代十国时间线、角色关系图',
      'SEO优化：结构化数据、TVSeries Schema、关键词布局',
    ],
    challenges: [
      {
        title: '信息架构大而全，页面容易"堆内容"导致阅读崩溃',
        solution:
          '按IA分模块拆解（首屏抓注意力，中段用卡片/表格快速扫读，长内容用折叠/分页/搜索降低阅读成本）',
      },
      {
        title: 'SEO与性能目标同时达标困难',
        solution:
          '技术选型倾向SSR/SSG（Next.js App Router），图片做WebP + 懒加载 + 多分辨率，首屏资源严格控制',
      },
      {
        title: '交互组件（地图/时间线/关系图）数据表达难',
        solution:
          '把交互组件当"解释工具"设计（地图突出覆盖国家/平台入口，时间线突出关键节点并可交互查看，关系图按阵营分区并标注关系类型）',
      },
    ],
    learnings: [
      'Next.js SSR/SSG + SEO工程化：理解内容型站点为什么要优先考虑SSG/SSR、结构化数据、模块级meta管理',
      '性能优化方法论：图片WebP/懒加载/多分辨率、首屏加载<3秒目标的拆解与落地',
      '内容可视化组件选型：地图/时间线适合用D3/ECharts或自定义组件，理解"交互是为信息服务"的设计原则',
    ],
    bgColor: '#FFC940',
    accentColor: '#1A1A2E',
    textColor: '#1A1A2E',
    badgeBg: 'rgba(26,26,46,0.12)',
    badgeText: '#1A1A2E',
  },
];

// ── Pretext 字体配置（与 CSS 对齐）──
const CARD_TITLE_FONT = '700 16px/1.4 "PingFang SC", "Microsoft YaHei", sans-serif';
const CARD_TITLE_LH = 24;
const CARD_BODY_FONT = '400 14px/1.625 "PingFang SC", "Microsoft YaHei", sans-serif';
const CARD_BODY_LH = 23;
const CHALLENGE_TITLE_FONT = '600 14px/1.4 "PingFang SC", "Microsoft YaHei", sans-serif';
const CHALLENGE_TITLE_LH = 20;
const CHALLENGE_BODY_FONT = '400 14px/1.625 "PingFang SC", "Microsoft YaHei", sans-serif';
const CHALLENGE_BODY_LH = 23;
const CARD_PADDING = 48; // p-5/p-6 ≈ 24*2
const CARD_TITLE_MB = 12;

/** 用 pretext 测量一张 DetailCard 的内容高度 */
function measureDetailCard(items: string[], cardWidth: number): number {
  const innerW = cardWidth - CARD_PADDING;
  if (innerW <= 0) return 0;
  const titleH = CARD_TITLE_LH + CARD_TITLE_MB;
  let totalItemH = 0;
  for (const item of items) {
    const p = prepare(item, CARD_BODY_FONT);
    const h = layout(p, innerW - 14, CARD_BODY_LH).height; // 14px = dot + gap
    totalItemH += h + 8; // space-y-2
  }
  return titleH + totalItemH;
}

/** 用 pretext 测量一张 ChallengesCard 的内容高度 */
function measureChallengesCard(challenges: { title: string; solution: string }[], cardWidth: number): number {
  const innerW = cardWidth - CARD_PADDING;
  if (innerW <= 0) return 0;
  const titleH = CARD_TITLE_LH + CARD_TITLE_MB;
  let totalH = 0;
  for (const ch of challenges) {
    const tP = prepare(`[${challenges.indexOf(ch) + 1}] ${ch.title}`, CHALLENGE_TITLE_FONT);
    const tH = layout(tP, innerW, CHALLENGE_TITLE_LH).height;
    const sP = prepare(ch.solution, CHALLENGE_BODY_FONT);
    const sH = layout(sP, innerW - 12, CHALLENGE_BODY_LH).height; // pl-3
    totalH += tH + sH + 20; // mb + space-y-4
  }
  return titleH + totalH;
}

interface DetailCardProps {
  title: string;
  items: string[];
  accentColor: string;
  textColor: string;
  minHeight?: number;
}

function DetailCard({ title, items, accentColor, textColor, minHeight }: DetailCardProps) {
  return (
    <div
      className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(67,230,96,0.15)]"
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      <h4
        className="text-base sm:text-lg font-bold mb-3"
        style={{ color: textColor }}
      >
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span
              className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.85 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ChallengesCardProps {
  challenges: { title: string; solution: string }[];
  accentColor: string;
  textColor: string;
  minHeight?: number;
}

function ChallengesCard({ challenges, accentColor, textColor, minHeight }: ChallengesCardProps) {
  return (
    <div
      className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(67,230,96,0.15)]"
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      <h4
        className="text-base sm:text-lg font-bold mb-3"
        style={{ color: textColor }}
      >
        遇到的坑
      </h4>
      <div className="space-y-4">
        {challenges.map((challenge, idx) => (
          <div key={idx}>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: textColor }}
            >
              [{idx + 1}] {challenge.title}
            </p>
            <p
              className="text-sm leading-relaxed pl-3 border-l-2"
              style={{ color: textColor, opacity: 0.75, borderColor: accentColor }}
            >
              {challenge.solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectSection({ project, index }: { project: ProjectData; index: number }) {
  const isEven = index % 2 === 0;
  const gridRef = useRef<HTMLDivElement>(null);
  const [cardMinH, setCardMinH] = useState<number | undefined>(undefined);

  // ── Pretext: 测量三栏卡片，取最大高度做等高 ──
  const measureCards = useCallback((containerWidth: number) => {
    try {
      // 三栏布局: gap=24, 每栏宽度
      const colCount = containerWidth >= 768 ? 3 : 1;
      const cardW = colCount === 3
        ? Math.floor((containerWidth - 24 * 2) / 3)
        : containerWidth;

      const h1 = measureDetailCard(project.solution, cardW);
      const h2 = measureChallengesCard(project.challenges, cardW);
      const h3 = measureDetailCard(project.learnings, cardW);

      if (colCount === 3) {
        setCardMinH(Math.max(h1, h2, h3) + CARD_PADDING);
      } else {
        setCardMinH(undefined); // 单栏不需要等高
      }
    } catch (e) {
      console.warn('[Pretext] ProjectsSection measure fallback:', e);
      setCardMinH(undefined);
    }
  }, [project]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    measureCards(el.offsetWidth);
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) measureCards(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureCards]);

  return (
    <section
      aria-labelledby={`project-${index}-title`}
      style={{ backgroundColor: project.bgColor }}
      className="relative overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none opacity-60"
        viewBox="0 0 1200 800"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <g filter="url(#gooey-projects)">
          <circle cx="240" cy="180" r="110" fill="#43E66033">
            <animate attributeName="cx" dur="14s" repeatCount="indefinite" values="240;340;260;240" />
            <animate attributeName="cy" dur="16s" repeatCount="indefinite" values="180;120;240;180" />
            <animate attributeName="r" dur="12s" repeatCount="indefinite" values="110;145;120;110" />
          </circle>
          <circle cx="930" cy="180" r="130" fill="#E84BE033">
            <animate attributeName="cx" dur="18s" repeatCount="indefinite" values="930;860;980;930" />
            <animate attributeName="cy" dur="15s" repeatCount="indefinite" values="180;260;140;180" />
            <animate attributeName="r" dur="13s" repeatCount="indefinite" values="130;100;150;130" />
          </circle>
          <circle cx="850" cy="560" r="120" fill="#8B5CF633">
            <animate attributeName="cx" dur="17s" repeatCount="indefinite" values="850;760;900;850" />
            <animate attributeName="cy" dur="14s" repeatCount="indefinite" values="560;500;640;560" />
            <animate attributeName="r" dur="11s" repeatCount="indefinite" values="120;150;105;120" />
          </circle>
          <circle cx="400" cy="650" r="90" fill="#43E66033">
            <animate attributeName="cx" dur="19s" repeatCount="indefinite" values="400;500;350;400" />
            <animate attributeName="cy" dur="17s" repeatCount="indefinite" values="650;590;700;650" />
            <animate attributeName="r" dur="10s" repeatCount="indefinite" values="90;120;100;90" />
          </circle>
        </g>
      </svg>
      {/* SVG decorative elements */}
      <svg
        className="absolute top-[-40px] right-[-40px] w-64 h-64 opacity-15 pointer-events-none animate-float-slow"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="80" stroke={project.textColor} strokeWidth="1.5" strokeDasharray="8 6" />
        <circle cx="100" cy="100" r="60" stroke={project.textColor} strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="100" r="95" fill={project.textColor} opacity="0.08" />
      </svg>
      <svg
        className="absolute bottom-[-30px] left-[-30px] w-48 h-48 opacity-12 pointer-events-none animate-float"
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden="true"
        style={{ animationDelay: '-4s' }}
      >
        <rect x="20" y="20" width="120" height="120" rx="30" stroke={project.textColor} strokeWidth="1.5" transform="rotate(15 80 80)" />
        <rect x="40" y="40" width="80" height="80" rx="20" fill={project.textColor} opacity="0.06" transform="rotate(15 80 80)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        {/* Project number + badge */}
        <div className="mb-8 flex items-center gap-4">
          <span
            className="glass-card inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ color: project.badgeText }}
          >
            项目 {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p
              className="text-base sm:text-lg font-semibold mb-2 opacity-70"
              style={{ color: project.textColor }}
            >
              {project.subtitle}
            </p>
            <h2
              id={`project-${index}-title`}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none"
              style={{ color: project.textColor }}
            >
              {project.title}
            </h2>
          </div>
          <a
            href={project.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start lg:self-auto px-7 py-3.5 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] shadow-md cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: project.textColor,
              color: project.bgColor,
            }}
            aria-label={`访问 ${project.title}`}
          >
            访问产品
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Images */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 ${isEven ? '' : 'sm:order-none'}`}>
          {project.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl bg-white/10"
              style={{ boxShadow: `0 24px 48px rgba(0,0,0,0.25)` }}
            >
              <Image
                src={img}
                alt={`${project.title} 截图 ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Problem statement - Glassmorphism */}
        <div
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(67,230,96,0.15)]"
        >
          <h3
            className="text-lg sm:text-xl font-bold mb-3"
            style={{ color: project.textColor }}
          >
            痛点发现
          </h3>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: project.textColor, opacity: 0.85 }}
          >
            {project.problem}
          </p>
        </div>

        {/* Detail cards grid — Pretext 等高 */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <DetailCard
            title="解决方案"
            items={project.solution}
            accentColor={project.accentColor}
            textColor={project.textColor}
            minHeight={cardMinH}
          />
          <ChallengesCard
            challenges={project.challenges}
            accentColor={project.accentColor}
            textColor={project.textColor}
            minHeight={cardMinH}
          />
          <DetailCard
            title="学到的技术"
            items={project.learnings}
            accentColor={project.accentColor}
            textColor={project.textColor}
            minHeight={cardMinH}
          />
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <div id="projects">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-projects">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {/* Section intro on white background */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">产品实践</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark leading-tight">
          从想法到上线，
          <br className="hidden sm:inline" />
          用AI实现每一个创意
        </h2>
      </div>

      {/* Project sections */}
      {projects.map((project, idx) => (
        <ProjectSection key={idx} project={project} index={idx} />
      ))}
    </div>
  );
}
