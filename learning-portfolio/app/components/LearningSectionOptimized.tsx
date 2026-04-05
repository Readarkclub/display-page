'use client';

export default function LearningSectionOptimized() {
  const insights = [
    { icon: '🎯', title: 'AI是工具，不是魔法', desc: '理解AI的能力边界，才能更好地使用它' },
    { icon: '🚀', title: '快速迭代胜过完美计划', desc: '先做出来，再优化，AI让试错成本大幅降低' },
    { icon: '💡', title: '提示词是新的编程语言', desc: '学会与AI对话，比学习语法更重要' },
    { icon: '🔧', title: '组合工具创造价值', desc: 'AI + 传统工具的组合，才是真正的生产力' },
    { icon: '📚', title: '持续学习是常态', desc: 'AI工具每天都在进化，保持好奇心' }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">学习心得</h2>
          <p className="text-xl text-gray-600">AI编程实践中的核心收获</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
