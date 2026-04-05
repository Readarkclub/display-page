'use client';

export default function FooterSectionV2() {
  return (
    <footer className="py-16 px-6 md:px-12 bg-[var(--bg-secondary)] border-t-4 border-[var(--accent-cyan)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Contact */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black neon-cyan">CONTACT</h3>
            <a 
              href="mailto:david@example.com"
              className="block font-mono text-sm text-[var(--text-secondary)] hover:neon-magenta transition-all"
            >
              <span className="neon-yellow">&gt;</span> david@example.com
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-right font-mono text-xs text-[var(--text-muted)]">
            <p>© 2026 DAVID LI</p>
            <p className="mt-2">BUILT WITH AI × PASSION</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
