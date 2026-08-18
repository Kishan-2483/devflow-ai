import { motion } from 'framer-motion'
import { Brain, CheckSquare, TrendingUp, BarChart2, Sparkles, ArrowRight, Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Mini UI visualizations for each feature
function AIPlanningUI() {
  return (
    <div className="feature-mini-ui">
      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
        <span style={{ color: 'var(--accent)' }}>●</span> AI generating plan...
      </div>
      {[
        'Create authentication middleware',
        'Set up JWT token service',
        'Build OAuth2 callback handler',
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, opacity: 1 - i * 0.15 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function SmartTasksUI() {
  const items = [
    { label: 'Database migration', done: true },
    { label: 'API endpoint setup', done: true },
    { label: 'Auth middleware', done: false },
    { label: 'Error handling', done: false },
  ]
  return (
    <div className="feature-mini-ui">
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 14, height: 14, borderRadius: 4, flexShrink: 0,
            background: item.done ? 'var(--green)' : 'transparent',
            border: item.done ? 'none' : '1.5px solid var(--border-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {item.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          </div>
          <span style={{
            fontSize: '11px', fontWeight: 500,
            color: item.done ? 'var(--text-tertiary)' : 'var(--text-primary)',
            textDecoration: item.done ? 'line-through' : 'none',
          }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectIntelligenceUI() {
  const bars = [
    { label: 'Auth module', pct: 78, color: 'var(--accent)' },
    { label: 'API layer', pct: 55, color: 'var(--blue)' },
    { label: 'Tests', pct: 22, color: 'var(--peach)' },
  ]
  return (
    <div className="feature-mini-ui">
      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Sprint progress</div>
      {bars.map(bar => (
        <div key={bar.label} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>{bar.label}</span>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: bar.color }}>{bar.pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${bar.pct}%`, background: bar.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function AnalyticsUI() {
  const days = [35, 55, 42, 70, 60, 85, 78]
  const max = Math.max(...days)
  return (
    <div className="feature-mini-ui">
      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Development velocity · 7d</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 50 }}>
        {days.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1, borderRadius: '3px 3px 0 0',
              background: i === days.length - 1 ? 'var(--accent)' : 'var(--bg-muted)',
              height: `${(v / max) * 100}%`,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} style={{ flex: 1, fontSize: '9px', color: 'var(--text-tertiary)', textAlign: 'center' }}>{d}</span>
        ))}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Brain,
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    label: 'AI Planning',
    heading: 'Transform requirements into actionable technical tasks.',
    desc: 'Describe what you want to build and DevFlow generates a structured, ordered implementation plan ready to execute.',
    UI: AIPlanningUI,
  },
  {
    icon: CheckSquare,
    color: 'var(--green)',
    bg: 'var(--green-light)',
    label: 'Smart Tasks',
    heading: 'Break complex work into manageable implementation steps.',
    desc: 'Every task is scoped, prioritized, and connected to the broader plan so nothing gets lost or forgotten.',
    UI: SmartTasksUI,
  },
  {
    icon: TrendingUp,
    color: 'var(--blue)',
    bg: 'var(--blue-light)',
    label: 'Project Intelligence',
    heading: 'Understand progress, blockers and dependencies.',
    desc: 'DevFlow surfaces what is blocked, what is behind, and what needs your attention — without status meetings.',
    UI: ProjectIntelligenceUI,
  },
  {
    icon: BarChart2,
    color: 'var(--peach)',
    bg: 'var(--peach-light)',
    label: 'Developer Analytics',
    heading: 'See where your time and effort are going.',
    desc: 'Track velocity, task completion patterns, and time invested across projects and sprints.',
    UI: AnalyticsUI,
  },
]

export default function Features() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="features" className="section-py" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <p className="eyebrow">One Workspace</p>
          <h2 className="heading-xl">Your development workflow, connected.</h2>
          <p className="body-lg" style={{ maxWidth: 560 }}>
            From the first idea to the final pull request, DevFlow keeps the context
            you need in one focused workspace.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                className="feature-card card-hover"
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.2, 0, 0, 1] }}
              >
                {/* Top */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                    background: f.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color={f.color} />
                  </div>
                  <div>
                    <p className="eyebrow-accent" style={{ marginBottom: 4 }}>{f.label}</p>
                    <h3 className="heading-sm">{f.heading}</h3>
                  </div>
                </div>

                <p className="body-md">{f.desc}</p>

                {/* Mini UI visualization */}
                <f.UI />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
