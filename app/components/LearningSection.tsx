const insights = [
  '先把需求写清楚，AI才能写对代码：PRD/验收标准越具体，AI生成的代码越接近可用；否则会陷入反复返工。',
  '把不可控任务"拆流程 + 加规则"，比求一次完美prompt更有效：像Vibe Writing的"三遍审校 + 必删清单 + 标点规范"，本质是用流程工程把随机性压住。',
  'AI更像"高级实习生"：能快产出，但你要做架构、边界、验收：输入校验、失败兜底、状态管理、可维护性这些仍需要人来定标准。',
  '与传统开发最大区别：从"写代码"变成"写约束、写测试点、写对齐标准"：你工作的重心从实现细节转到"定义问题+验证输出"。',
  '前端项目里，AI的优势在"组件生成与样式迭代"，短板在"复杂状态与边界条件"：越到版本栈、撤销/前进、编辑器联动这种场景，越需要你把状态机/数据流先设计好。',
];

const pathways = [
  {
    title: '从"内容型小项目"入门',
    desc: '先做一个单页/多模块站点（类似太平年介绍页），练信息架构、组件拆分、SEO/性能基础。',
  },
  {
    title: '第二步做"有闭环的工具型项目"',
    desc: '加入输入→处理→可编辑→导出闭环（类似Vibe Writing的输入、处理、调整、导出四阶段）。',
  },
  {
    title: '每个需求都写"验收标准"再让AI生成',
    desc: '先列happy path + error handling，再让AI写代码，最后按验收逐条测。',
  },
  {
    title: '学习顺序建议',
    desc: 'UI/布局（Tailwind/组件）→ 路由与页面结构（Next.js）→ 数据与状态管理（版本栈/状态机）→ 性能与SEO（图片策略、meta、schema）',
  },
  {
    title: '需要避免的坑',
    desc: '别一上来就堆"高级交互"：先把内容结构跑通，再做可视化增强。别让AI直接"全量重构"：先让它做小步改动，每一步都可回退。别忽略异常路径：输入校验、解析失败、API失败等往往决定产品能不能真正上线。',
  },
];

const accentColors = ['#43E660', '#E84BE0', '#FFC940', '#8B5CF6', '#1A1A2E'];
const accentTextColors = ['#1A1A2E', '#FFFFFF', '#1A1A2E', '#FFFFFF', '#FFFFFF'];

export default function LearningSection() {
  return (
    <section
      id="learning"
      className="bg-white py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="learning-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">学习心得</p>
          <h2
            id="learning-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark leading-tight"
          >
            7次课，我学到的
            <br className="hidden sm:inline" />
            <span
              className="inline-block px-4 py-1 rounded-2xl mt-2"
              style={{ backgroundColor: '#43E660' }}
            >
              真正有用的东西
            </span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* AI Programming Insights */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#43E660' }}
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" stroke="#1A1A2E" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-dark">AI编程心得</h3>
            </div>
            <ol className="space-y-4" aria-label="AI编程心得列表">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: accentColors[idx],
                      color: accentTextColors[idx],
                    }}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm sm:text-base leading-relaxed text-secondary">
                      {insight}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Learning Pathways */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#8B5CF6' }}
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-dark">学习路径建议</h3>
            </div>
            <ol className="space-y-4" aria-label="学习路径建议列表">
              {pathways.map((pathway, idx) => (
                <li key={idx} className="group">
                  <div
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl border-2 border-transparent transition-all duration-200 hover:border-current hover:shadow-md"
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#F8F8FF' : '#FFFEF5',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-transform duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: accentColors[idx % accentColors.length],
                        color: accentTextColors[idx % accentTextColors.length],
                      }}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-dark mb-1 text-sm sm:text-base">{pathway.title}</p>
                      <p className="text-secondary text-xs sm:text-sm leading-relaxed">{pathway.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 sm:mt-20 rounded-3xl p-8 sm:p-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          style={{ backgroundColor: '#1A1A2E' }}
          aria-label="学习成果统计"
        >
          {[
            { value: '7', label: '次课程' },
            { value: '2', label: '公网产品' },
            { value: '5', label: '核心心得' },
            { value: '100%', label: '用AI完成' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p
                className="text-3xl sm:text-4xl font-black mb-1"
                style={{ color: accentColors[idx] }}
              >
                {stat.value}
              </p>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
