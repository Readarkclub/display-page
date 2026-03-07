import Image from 'next/image';

interface ProjectData {
  title: string;
  images: string[];
  productUrl: string;
  problem: string;
  solution: string[];
  challenges: { title: string; solution: string }[];
  learnings: string[];
}

const projects: ProjectData[] = [
  {
    title: 'AI写作助手 (Vibe Writing)',
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
  },
  {
    title: '太平年介绍页',
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
  },
];

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="mb-20 lg:mb-32">
      {/* Project Title */}
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">
        {project.title}
      </h3>

      {/* Images and CTA */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 items-start">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <Image
                src={img}
                alt={`${project.title} 截图 ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <a
          href={project.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:self-center inline-flex items-center gap-2 px-6 py-3 bg-cta text-white rounded-xl font-medium hover:bg-cta/90 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
        >
          访问产品
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      {/* Content Grid */}
      <div className="grid gap-8">
        {/* Problem */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h4 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary mb-4">
            <span className="text-2xl" aria-hidden="true">
              💡
            </span>
            痛点发现
          </h4>
          <p className="text-secondary/90 leading-relaxed">{project.problem}</p>
        </div>

        {/* Solution */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h4 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary mb-4">
            <span className="text-2xl" aria-hidden="true">
              🎯
            </span>
            解决方案
          </h4>
          <ul className="space-y-3">
            {project.solution.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-cta mt-1 flex-shrink-0" aria-hidden="true">
                  •
                </span>
                <span className="text-secondary/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h4 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary mb-4">
            <span className="text-2xl" aria-hidden="true">
              🔧
            </span>
            遇到的坑
          </h4>
          <div className="space-y-4">
            {project.challenges.map((challenge, idx) => (
              <div key={idx}>
                <p className="font-medium text-primary mb-2">
                  [坑{idx + 1}] {challenge.title}
                </p>
                <p className="text-secondary/90 pl-4 border-l-2 border-cta/30">
                  解决：{challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learnings */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h4 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary mb-4">
            <span className="text-2xl" aria-hidden="true">
              📚
            </span>
            学到的技术
          </h4>
          <ul className="space-y-3">
            {project.learnings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-cta mt-1 flex-shrink-0" aria-hidden="true">
                  •
                </span>
                <span className="text-secondary/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary text-center mb-16 sm:mb-20">
          产品实践
        </h2>

        {/* Projects */}
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
