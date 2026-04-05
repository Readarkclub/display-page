'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  prepareWithSegments,
  layoutNextLine,
  layoutWithLines,
  walkLineRanges,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '@chenglou/pretext';

// ═══════════════════════════════════════════════════════
//  EditorialEngine — 杂志级编辑排版引擎 (Pretext 驱动)
//  多栏文本流 + 动态光球绕排 + 首字下沉 + 引用块
//  ★ 性能优化: orbs→ref, orbDOM直接操作, 虚拟化渲染
// ═══════════════════════════════════════════════════════

// ── 字体配置 ──
const BODY_FONT = '17px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", serif';
const BODY_LH = 28;
const HEADLINE_FF = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", serif';
const HEADLINE_TEXT = '跟AI共进，让每个人成为创造者';
const PQ_FONT = `italic 17px ${HEADLINE_FF}`;
const PQ_LH = 25;
const GUTTER = 48;
const COL_GAP = 36;
const BOTTOM_GAP = 20;
const DROP_CAP_LINES = 3;
const MIN_SLOT_W = 40;

// ── 内容 ──
const BODY_TEXT = `七节课，两个产品，从零到一的AI编程实践之旅。

这不是一门普通的课程。这是一次从"传统管理者"到"AI赋能创造者"的彻底转型。在这个过程中，我学会了最重要的一件事：AI不是来取代你的，它是来放大你的。

第一课就颠覆了我的认知。我以为AI编程就是"让ChatGPT写代码"，但实际上，真正的工作流程是：先把需求写清楚——越具体越好，包括验收标准、边界条件、异常路径。然后让AI在这个框架内输出。最后你来做架构决策、质量把关。你不是在"写代码"，你是在"写约束、写测试点、写对齐标准"。

这个认知转变改变了一切。我开始把每个任务都拆解成可控制的流程。像Vibe Writing那个项目，核心功能是"三遍审校机制"：内容审校、风格优化（降AI味）、细节打磨。每一步都有明确的规则集——必删清单、替换规则、短句化阈值、标点规范。这不是魔法，这是流程工程。

前端开发中，AI的优势非常明显。组件生成与样式迭代？AI几秒钟就能出初稿。但它的短板也同样突出：复杂状态管理、版本栈设计、撤销/前进联动——这些场景下你必须先把状态机和数据流设计好，再让AI去实现细节。人做架构，AI做实现，这才是正确的分工模式。

太平年介绍页是另一个维度的挑战。信息架构大而全，页面容易"堆内容"导致阅读崩溃。解决方案是按模块拆解：首屏抓注意力，中段用卡片和表格快速扫读，长内容用折叠和分页降低阅读成本。SEO与性能目标同时达标？技术选型倾向SSR和SSG，图片做WebP加懒加载加多分辨率，首屏资源严格控制。

我学到的最重要的五件事：

先把需求写清楚，AI才能写对代码。PRD和验收标准越具体，生成的代码越接近可用。否则会陷入反复返工的泥潭。

把不可控任务拆流程加规则，比求一次完美prompt更有效。流程工程能把随机性压住，让输出变得稳定可控。

AI更像高级实习生。能快产出，但你要做架构、定边界、设验收。输入校验、失败兜底、状态管理、可维护性——这些仍需要人来定标准。

与传统开发最大的区别：从写代码变成写约束。工作重心从实现细节转到定义问题加验证输出。

前端项目里，AI的优势在组件生成与样式迭代，短板在复杂状态与边界条件。越到高级交互场景，越需要先设计好状态机和学习路径建议。

学习顺序很重要。UI和布局先行，然后是路由与页面结构，接着是数据与状态管理，最后才是性能与SEO。别一上来就堆高级交互，先把内容结构跑通。

需要避免的坑：别让AI直接全量重构，先让它做小步改动，每一步都可回退。别忽略异常路径，输入校验和解析失败往往决定产品能不能真正上线。

这七节课的产出是两个公网产品、五个核心心得、百分之百用AI辅助完成。但真正的收获不是这些产物，而是一种全新的工作方式——一种人与AI协作的方式，一种把创造力从技术门槛中解放出来的方式。

AI时代的产品探索者，AI编程实践派。这就是我，一个从传统管理转型AI赋能的实践者。致力于用AI工具让每个人都成为创造者。`;

const PULLQUOTE_TEXTS = [
  '""先把需求写清楚，AI才能写对代码。"—— 这不是技巧，这是工程纪律。"',
  '""与传统开发最大的区别：从写代码变成写约束、写测试点、写对齐标准。""',
];

// ── 类型定义 ──
interface Interval { left: number; right: number }
interface PLine { x: number; y: number; width: number; text: string }
interface TextProjection {
  headlineLeft: number; headlineTop: number;
  headlineFont: string; headlineLH: number;
  headlineLines: PLine[];
  bodyFont: string; bodyLH: number;
  bodyLines: PLine[];
  pqFont: string; pqLH: number;
  pqLines: PLine[];
}
interface CircleObs { cx: number; cy: number; r: number; hPad: number; vPad: number }
interface RectObs { x: number; y: number; w: number; h: number }
interface Orb { x: number; y: number; r: number; vx: number; vy: number; paused: boolean }
interface OrbDef { fx: number; fy: number; r: number; vx: number; vy: number; color: [number,number,number] }

const orbDefs: OrbDef[] = [
  { fx: 0.52, fy: 0.22, r: 100, vx: 7, vy: 5, color: [67, 230, 96] },
  { fx: 0.18, fy: 0.50, r: 78, vx: -6, vy: 8, color: [100, 140, 255] },
  { fx: 0.74, fy: 0.58, r: 88, vx: 5, vy: -6, color: [232, 75, 224] },
  { fx: 0.38, fy: 0.72, r: 68, vx: -8, vy: -4, color: [80, 200, 140] },
  { fx: 0.86, fy: 0.18, r: 58, vx: -4, vy: 6, color: [139, 92, 246] },
];

// ── 工具函数 ──
function carveSlots(base: Interval, blocked: Interval[]): Interval[] {
  let slots = [base];
  for (const iv of blocked) {
    const next: Interval[] = [];
    for (const slot of slots) {
      if (iv.right <= slot.left || iv.left >= slot.right) { next.push(slot); continue; }
      if (iv.left > slot.left) next.push({ left: slot.left, right: iv.left });
      if (iv.right < slot.right) next.push({ left: iv.right, right: slot.right });
    }
    slots = next;
  }
  return slots.filter(s => s.right - s.left >= MIN_SLOT_W);
}

function circleInterval(cx: number, cy: number, r: number, top: number, bot: number, hPad: number, vPad: number): Interval | null {
  const t = top - vPad, b = bot + vPad;
  if (t >= cy + r || b <= cy - r) return null;
  const minDy = cy >= t && cy <= b ? 0 : cy < t ? t - cy : cy - b;
  if (minDy >= r) return null;
  const maxDx = Math.sqrt(r * r - minDy * minDy);
  return { left: cx - maxDx - hPad, right: cx + maxDx + hPad };
}

function fitHeadline(maxW: number, maxH: number, maxSize: number = 80): { fontSize: number; lines: PLine[] } {
  let lo = 18, hi = maxSize, best = lo, bestLines: PLine[] = [];
  while (lo <= hi) {
    const size = Math.floor((lo + hi) / 2);
    const font = `700 ${size}px ${HEADLINE_FF}`;
    const lh = Math.round(size * 0.92);
    const prep = prepareWithSegments(HEADLINE_TEXT, font);
    let breaksWord = false, lc = 0;
    walkLineRanges(prep, maxW, line => { lc++; if (line.end.graphemeIndex !== 0) breaksWord = true; });
    const totalH = lc * lh;
    if (!breaksWord && totalH <= maxH) {
      best = size;
      bestLines = layoutWithLines(prep, maxW, lh).lines.map(l => ({ x: 0, y: bestLines.length * lh, text: l.text, width: l.width }));
      lo = size + 1;
    } else { hi = size - 1; }
  }
  const finalLh = Math.round(best * 0.92);
  return { fontSize: best, lines: layoutWithLines(prepareWithSegments(HEADLINE_TEXT, `700 ${best}px ${HEADLINE_FF}`), maxW, finalLh).lines.map((l, i) => ({ x: 0, y: i * finalLh, text: l.text, width: l.width })) };
}

function layoutColumn(
  prep: PreparedTextWithSegments, cursor: LayoutCursor,
  rx: number, ry: number, rw: number, rh: number, lh: number,
  circles: CircleObs[], rects: RectObs[], singleSlot: boolean = false,
): { lines: PLine[]; cursor: LayoutCursor } {
  let cur = { ...cursor };
  let top = ry;
  const lines: PLine[] = [];
  let exhausted = false;
  while (top + lh <= ry + rh && !exhausted) {
    const blocked: Interval[] = [];
    for (const c of circles) {
      const iv = circleInterval(c.cx, c.cy, c.r, top, top + lh, c.hPad, c.vPad);
      if (iv) blocked.push(iv);
    }
    for (const rect of rects) {
      if (top + lh <= rect.y || top >= rect.y + rect.h) continue;
      blocked.push({ left: rect.x, right: rect.x + rect.w });
    }
    const slots = carveSlots({ left: rx, right: rx + rw }, blocked);
    if (slots.length === 0) { top += lh; continue; }
    const ordered = singleSlot
      ? [slots.reduce((a, b) => (b.right - b.left) > (a.right - a.left) ? b : a)]
      : [...slots].sort((a, b) => a.left - b.left);
    for (const slot of ordered) {
      const line = layoutNextLine(prep, cur, slot.right - slot.left);
      if (!line) { exhausted = true; break; }
      lines.push({ x: Math.round(slot.left), y: Math.round(top), text: line.text, width: line.width });
      cur = line.end;
    }
    top += lh;
  }
  return { lines, cursor: cur };
}

export default function EditorialEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  // ★ 性能优化: orbs 存在 ref 中
  const orbsRef = useRef<Orb[]>([]);
  const orbDomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [projection, setProjection] = useState<TextProjection | null>(null);
  const [dropCapStyle, setDropCapStyle] = useState<{ left: number; top: number; font: string; lh: number } | null>(null);
  const [pqBoxes, setPqBoxes] = useState<Array<{ x: number; y: number; w: number; h: number }>>([]);
  const dragRef = useRef<{ orbIdx: number; startX: number; startY: number; startOX: number; startOY: number } | null>(null);
  const stateRef = useRef({ lastT: 0, preparedBody: null as PreparedTextWithSegments | null, preparedPQ: [] as PreparedTextWithSegments[], preparedDC: null as PreparedTextWithSegments | null });

  // ── 虚拟化: 只渲染视口内的行 ──
  const OVERSCAN = 200;
  const viewRangeRef = useRef({ top: 0, bottom: 2000 });
  const [viewRange, setViewRange] = useState({ top: 0, bottom: 2000 });

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const newRange = {
        top: -rect.top - OVERSCAN,
        bottom: -rect.top + window.innerHeight + OVERSCAN,
      };
      viewRangeRef.current = newRange;
      setViewRange(newRange);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLineVisible = useCallback((line: PLine, lh: number) => {
    return line.y + lh >= viewRange.top && line.y <= viewRange.bottom;
  }, [viewRange]);

  // ── 初始化 ──
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    orbsRef.current = orbDefs.map(d => ({
      x: d.fx * w, y: d.fy * h, r: d.r,
      vx: d.vx, vy: d.vy, paused: false,
    }));
  }, []);

  // ★ 直接更新光球 DOM
  const updateOrbDOM = useCallback((isNarrow: boolean, activeCount: number) => {
    const orbs = orbsRef.current;
    for (let i = 0; i < orbDefs.length; i++) {
      const el = orbDomRefs.current[i];
      if (!el) continue;
      const show = i < activeCount;
      el.style.display = show ? '' : 'none';
      if (!show) continue;
      const o = orbs[i];
      if (!o) continue;
      el.style.left = `${o.x - o.r}px`;
      el.style.top = `${o.y - o.r}px`;
      el.style.width = `${o.r * 2}px`;
      el.style.height = `${o.r * 2}px`;
      el.style.opacity = o.paused ? '0.45' : '1';
    }
  }, []);

  // ── 核心渲染循环（★ 不依赖 orbs state）──
  useEffect(() => {
    let rafId: number;

    const renderFrame = (now: number) => {
      const el = containerRef.current;
      if (!el) { rafId = requestAnimationFrame(renderFrame); return; }
      const pw = el.clientWidth;
      const ph = el.clientHeight;
      const isNarrow = pw < 760;
      const gutter = isNarrow ? 20 : GUTTER;
      const colGap = isNarrow ? 20 : COL_GAP;
      const bottomGap = isNarrow ? 16 : BOTTOM_GAP;
      const orbs = orbsRef.current;
      if (orbs.length === 0) { rafId = requestAnimationFrame(renderFrame); return; }
      const activeCount = isNarrow ? Math.min(3, orbs.length) : orbs.length;

      // ★ 物理更新 — 直接修改 ref
      let stillGoing = false;
      const dt = Math.min((now - stateRef.current.lastT) / 1000, 0.05);
      stateRef.current.lastT = now;

      for (let i = 0; i < activeCount; i++) {
        const orb = orbs[i];
        if (orb.paused || dragRef.current?.orbIdx === i) continue;
        stillGoing = true;
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        const r = orb.r;
        if (orb.x - r < 0) { orb.x = r; orb.vx = Math.abs(orb.vx); }
        if (orb.x + r > pw) { orb.x = pw - r; orb.vx = -Math.abs(orb.vx); }
        if (orb.y - r < gutter * 0.5) { orb.y = gutter * 0.5 + r; orb.vy = Math.abs(orb.vy); }
        if (orb.y + r > ph - bottomGap) { orb.y = ph - bottomGap - r; orb.vy = -Math.abs(orb.vy); }
      }

      // ★ 碰撞 — 直接修改 ref
      for (let i = 0; i < activeCount; i++) {
        for (let j = i + 1; j < activeCount; j++) {
          const a = orbs[i], b = orbs[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r + (isNarrow ? 10 : 18);
          if (dist < minDist && dist > 0.1) {
            const force = (minDist - dist) * 0.7;
            const nx = dx / dist, ny = dy / dist;
            if (!a.paused && dragRef.current?.orbIdx !== i) {
              a.vx -= nx * force * dt; a.vy -= ny * force * dt;
            }
            if (!b.paused && dragRef.current?.orbIdx !== j) {
              b.vx += nx * force * dt; b.vy += ny * force * dt;
            }
          }
        }
      }

      // ★ 直接更新光球 DOM
      updateOrbDOM(isNarrow, activeCount);

      // 构建障碍物
      const circleObs: CircleObs[] = orbs.slice(0, activeCount).map(o => ({
        cx: o.x, cy: o.y, r: o.r, hPad: isNarrow ? 10 : 14, vPad: isNarrow ? 2 : 4,
      }));

      // 标题自适应
      const hlW = Math.min(pw - gutter * 2, 900);
      const maxHlH = Math.floor(ph * (isNarrow ? 0.18 : 0.22));
      const { fontSize: hlSize, lines: hlLines } = fitHeadline(hlW, maxHlH, isNarrow ? 36 : 80);
      const hlLH = Math.round(hlSize * 0.92);
      const hlFont = `700 ${hlSize}px ${HEADLINE_FF}`;
      const hlH = hlLines.length * hlLH;

      // 首字下沉
      const dcSize = BODY_LH * DROP_CAP_LINES - 4;
      const dcFont = `700 ${dcSize}px ${HEADLINE_FF}`;
      const bodyTop = gutter + hlH + (isNarrow ? 12 : 16);
      const bodyH = ph - bodyTop - bottomGap;
      const colCount = pw > 1000 ? 3 : pw > 640 ? 2 : 1;
      const totalG = gutter * 2 + colGap * (colCount - 1);
      const colW = Math.floor((Math.min(pw, 1400) - totalG) / colCount);
      const contentL = Math.round((pw - (colCount * colW + (colCount - 1) * colGap)) / 2);

      // 引用块
      const pqRects: Array<RectObs & { lines: PLine[]; colIdx: number }> = [];
      const pqLinesOut: PLine[] = [];

      if (!isNarrow) {
        try {
          const pqPreps = PULLQUOTE_TEXTS.map(t => prepareWithSegments(t, PQ_FONT));
          stateRef.current.preparedPQ = pqPreps;
          const placements = [
            { colIdx: 0, yFrac: 0.46, wFrac: 0.52, side: 'right' as const },
            { colIdx: Math.min(1, colCount - 1), yFrac: 0.30, wFrac: 0.50, side: 'left' as const },
          ];
          placements.forEach((p, idx) => {
            if (p.colIdx >= colCount || !pqPreps[idx]) return;
            const pqw = Math.round(colW * p.wFrac);
            const pql = layoutWithLines(pqPreps[idx]!, pqw - 18, PQ_LH).lines;
            const pqh = pql.length * PQ_LH + 14;
            const cx = contentL + p.colIdx * (colW + colGap);
            const pqx = p.side === 'right' ? cx + colW - pqw : cx;
            const pqy = Math.round(bodyTop + bodyH * p.yFrac);
            pqRects.push({ x: pqx, y: pqy, w: pqw, h: pqh, lines: [], colIdx: p.colIdx });
            pql.forEach((l, li) => { pqLinesOut.push({ x: pqx + 18, y: pqy + 7 + li * PQ_LH, text: l.text, width: l.width }); });
          });
        } catch(e) { console.warn('[Editorial] PQ prep error:', e); }
      }

      setPqBoxes(pqRects.map(r => ({ x: r.x, y: r.y, w: r.w, h: r.h })));

      // 多栏布局
      const allBodyLines: PLine[] = [];
      try {
        const prep = stateRef.current.preparedBody || prepareWithSegments(BODY_TEXT, BODY_FONT);
        stateRef.current.preparedBody = prep;

        let cursor: LayoutCursor = { segmentIndex: 1, graphemeIndex: 0 };
        for (let ci = 0; ci < colCount; ci++) {
          const cx = contentL + ci * (colW + colGap);
          const rects: RectObs[] = [];
          if (ci === 0) {
            try {
              const dcPrep = prepareWithSegments(BODY_TEXT[0], dcFont);
              stateRef.current.preparedDC = dcPrep;
              let dcw = 0;
              walkLineRanges(dcPrep, 9999, line => { dcw = line.width; });
              rects.push({ x: cx - 2, y: bodyTop - 2, w: Math.ceil(dcw) + 8, h: DROP_CAP_LINES * BODY_LH + 2 });
              setDropCapStyle({ left: cx, top: bodyTop, font: dcFont, lh: dcSize });
            } catch { /* fallback */ }
          }
          for (const pr of pqRects) { if (pr.colIdx === ci) rects.push({ x: pr.x, y: pr.y, w: pr.w, h: pr.h }); }
          const result = layoutColumn(prep, cursor, cx, bodyTop, colW, bodyH, BODY_LH, circleObs, rects, isNarrow);
          allBodyLines.push(...result.lines);
          cursor = result.cursor;
        }
      } catch(e) {
        console.warn('[Editorial] Body layout error:', e);
      }

      // ★ 只有文字投影用 React state（一次 setState / 帧）
      setProjection({
        headlineLeft: gutter, headlineTop: gutter,
        headlineFont: hlFont, headlineLH: hlLH,
        headlineLines: hlLines,
        bodyFont: BODY_FONT, bodyLH: BODY_LH,
        bodyLines: allBodyLines,
        pqFont: PQ_FONT, pqLH: PQ_LH,
        pqLines: pqLinesOut,
      });

      if (stillGoing) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        setTimeout(() => { rafId = requestAnimationFrame(renderFrame); }, 50);
      }
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, [updateOrbDOM]); // ★ 稳定依赖

  // ── 事件处理（★ 直接修改 ref）──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const px = e.clientX, py = e.clientY;
    const orbs = orbsRef.current;
    for (let i = orbs.length - 1; i >= 0; i--) {
      const o = orbs[i];
      if ((px - o.x) ** 2 + (py - o.y) ** 2 <= o.r ** 2) {
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
        background: 'radial-gradient(ellipse at 50% 40%, #0f0f14 0%, #0a0a0c 100%)',
        minHeight: '100vh',
        fontFamily: HEADLINE_FF,
        color: '#e8e4dc',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      aria-label="编辑排版引擎演示"
    >
      {/* 提示文字 */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none text-xs font-sans text-white/20 bg-black/45 px-5 py-2 rounded-full whitespace-nowrap">
        拖拽光球 · 点击暂停 · Pretext 零DOM测量 · 虚拟化渲染
      </div>

      {/* ── 标题行（始终渲染，数量少）── */}
      {projection?.headlineLines.map((line, i) => (
        <span key={`hl-${i}`} className="absolute whitespace-pre z-[2] font-bold text-white tracking-tight"
          style={{ left: projection.headlineLeft + line.x, top: projection.headlineTop + line.y, font: projection.headlineFont, lineHeight: `${projection.headlineLH}px` }}>
          {line.text}
        </span>
      ))}

      {/* ── 正文行（★ 虚拟化：只渲染视口内的行）── */}
      {projection?.bodyLines.filter(l => isLineVisible(l, projection.bodyLH)).map((line) => (
        <span key={`bl-${line.y}-${line.x}`} className="absolute whitespace-pre z-[1]"
          style={{ left: line.x, top: line.y, font: projection.bodyFont, lineHeight: `${projection.bodyLH}px` }}>
          {line.text}
        </span>
      ))}

      {/* ── 引用块行（虚拟化）── */}
      {projection?.pqLines.filter(l => isLineVisible(l, projection.pqLH)).map((line) => (
        <span key={`pq-${line.y}-${line.x}`} className="absolute whitespace-pre z-[3] italic"
          style={{ left: line.x, top: line.y, font: projection.pqFont, lineHeight: `${projection.pqLH}px`, color: '#b8a070' }}>
          {line.text}
        </span>
      ))}

      {/* ── 引用块边框 ── */}
      {pqBoxes.map((box, i) => (
        <div key={`pb-${i}`} className="absolute z-[3] border-l-[3px] border-[#6b5a3d] pl-3.5 pointer-events-none"
          style={{ left: box.x, top: box.y, width: box.w, height: box.h }} />
      ))}

      {/* ── 首字下沉 ── */}
      {dropCapStyle && (
        <div className="absolute z-[2] pointer-events-none font-bold"
          style={{
            left: dropCapStyle.left, top: dropCapStyle.top,
            font: dropCapStyle.font, lineHeight: `${dropCapStyle.lh}px`,
            color: '#c4a35a',
          }}
        >
          {BODY_TEXT[0]}
        </div>
      )}

      {/* ── 动态光球（★ 通过 ref 直接更新 DOM）── */}
      {orbDefs.map((def, i) => (
        <div
          key={`orb-${i}`}
          ref={el => { orbDomRefs.current[i] = el }}
          className="absolute rounded-full z-10 cursor-grab"
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.35), rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.12) 55%, transparent 72%)`,
            boxShadow: `0 0 60px 15px rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.18), 0 0 120px 40px rgba(${def.color[0]},${def.color[1]},${def.color[2]},0.07)`,
          }}
        />
      ))}
    </section>
  );
}
