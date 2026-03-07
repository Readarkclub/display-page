'use client';

export default function LearningSectionV2() {
  const learnings = [
    {
      emoji: '🤖',
      title: 'AI编程',
      desc: 'Claude + Cursor实战'
    },
    {
      emoji: '⚡',
      title: '快速迭代',
      desc: '从想法到产品上线'
    },
    {
      emoji: '🎯',
      title: '产品思维',
      desc: '用户需求驱动开发'
    }
  ];

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="neon-yellow">LEARNING</span>
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)]">
            <span className="neon-cyan">&gt;</span> 核心收获
          </p>
        </div>

        {/* Learning cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {learnings.map((item, i) => (
            <div
              key={i}
              className="brutal-border bg-[var(--bg-secondary)] p-8 hover-lift group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>
              <h3 className="text-2xl font-black mb-2 group-hover:neon-magenta transition-all">
                {item.title}
              </h3>
              <p className="text-sm font-mono text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
