'use client';

export default function ProjectsSectionV2() {
  const projects = [
    {
      title: '读书俱乐部',
      desc: '图书展示与管理平台',
      tags: ['Next.js', 'Supabase', 'AI'],
      link: 'https://readarkclub.com',
      status: 'LIVE'
    },
    {
      title: '茶经说',
      desc: '茶文化社区网站',
      tags: ['Next.js', 'Community'],
      link: '#',
      status: 'DEV'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-24 px-6 md:px-12 bg-[var(--bg-secondary)] diagonal-stripes">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="neon-magenta">PROJECTS</span>
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)]">
            <span className="neon-yellow">&gt;</span> 实战作品集
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block brutal-border bg-[var(--bg-primary)] p-8 hover-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono px-3 py-1 border-2 ${
                  project.status === 'LIVE' 
                    ? 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]' 
                    : 'border-[var(--accent-yellow)] text-[var(--accent-yellow)]'
                }`}>
                  [{project.status}]
                </span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-black mb-3 group-hover:neon-cyan transition-all">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] font-mono text-sm mb-6">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs font-mono px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
