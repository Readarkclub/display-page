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

export default function LearningSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary text-center mb-16 sm:mb-20">
          学习心得
        </h2>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Programming Insights */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-primary mb-6">
              <span className="text-3xl" aria-hidden="true">
                💡
              </span>
              AI编程心得
            </h3>
            <ol className="space-y-5">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cta text-white flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <p className="text-secondary/90 leading-relaxed">{insight}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Learning Pathways */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-primary mb-6">
              <span className="text-3xl" aria-hidden="true">
                🎯
              </span>
              学习路径建议
            </h3>
            <ol className="space-y-5">
              {pathways.map((pathway, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cta text-white flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">{pathway.title}</p>
                    <p className="text-secondary/80 text-sm leading-relaxed">{pathway.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
