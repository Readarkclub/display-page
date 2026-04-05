'use client';

export default function ProjectsSectionOptimized() {
  const projects = [
    {
      title: 'AI写作助手',
      subtitle: '让写作更高效的智能工具',
      description: '基于AI的写作辅助工具，帮助用户快速生成高质量内容',
      tags: ['Next.js', 'OpenAI', 'Tailwind'],
      link: '#',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: '太平年介绍页',
      subtitle: '传统文化的现代呈现',
      description: '展示中国传统节日文化的精美落地页',
      tags: ['React', 'Framer Motion', 'CSS'],
      link: '#',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">项目作品</h2>
          <p className="text-xl text-gray-600">AI编程课程中完成的实战项目</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.subtitle}</p>
                <p className="text-gray-500 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all"
                >
                  查看详情
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
