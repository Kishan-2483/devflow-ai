import { motion } from 'framer-motion'
import {
  CheckCircle2, AlertCircle, GitCommit, BarChart2,
  Clock, Sparkles, Zap, ListTodo, ChevronRight, Activity
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Small progress ring
function MiniRing({ pct, size = 40, stroke = 3.5, color }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-muted)" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}

const BLOCKERS = [
  { label: 'OAuth callback not configured', severity: 'high' },
  { label: 'Missing integration tests', severity: 'medium' },
  { label: 'ENV variables undefined in staging', severity: 'medium' },
]

const RECENT_COMMITS = [
  { hash: 'a3f291c', msg: 'Add JWT refresh token logic', ago: '2h ago' },
  { hash: 'bb14e07', msg: 'Database schema migration v3', ago: '5h ago' },
  { hash: '9d0234a', msg: 'Fix auth middleware bug', ago: '1d ago' },
]

const SPRINT_MODULES = [
  { name: 'Database layer', pct: 100, color: 'var(--green)' },
  { name: 'Auth backend', pct: 78, color: 'var(--accent)' },
  { name: 'API routes', pct: 55, color: 'var(--blue)' },
  { name: 'Test suite', pct: 22, color: 'var(--peach)' },
]

export default function ProductShowcase() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="product" className="section-py">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Full Project Visibility</p>
          <h2 className="heading-xl">See the work, not just the promise.</h2>
          <p className="body-lg" style={{ maxWidth: 540 }}>
            DevFlow gives you a real-time view of your project — from AI recommendations
            to commit history, sprint health, and what is blocking you.
          </p>
        </motion.div>

        {/* Showcase card */}
        <motion.div
          className="showcase-wrapper"
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.2, 0, 0, 1] }}
        >
          {/* Top project summary bar */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Authentication System</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>Sprint 3 · 6 tasks · 4 days remaining</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>78%</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>COMPLETE</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--peach)', letterSpacing: '-0.03em' }}>3</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>BLOCKERS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--green)', letterSpacing: '-0.03em' }}>12</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>COMMITS</div>
              </div>
            </div>
          </div>

          {/* 3-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {/* Sprint Progress card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <BarChart2 size={14} color="var(--text-tertiary)" />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Sprint Modules</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SPRINT_MODULES.map(m => (
                  <div key={m.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)' }}>{m.name}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: m.color }}>{m.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${m.pct}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <Sparkles size={14} color="var(--accent)" />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Recommendations</span>
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                {[
                  'Consider adding refresh token rotation to prevent token hijacking',
                  'Integration tests are at 22% — suggest writing them before OAuth2 work',
                  'Staging ENV validation could block deployment. Resolve early.',
                ].map((rec, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 8, background: i === 0 ? 'var(--accent-light)' : 'var(--bg-subtle)', border: '1px solid var(--border-soft)' }}>
                    <ChevronRight size={13} color={i === 0 ? 'var(--accent)' : 'var(--text-tertiary)'} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: '11.5px', color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)', lineHeight: 1.5 }}>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Commits card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <GitCommit size={14} color="var(--text-tertiary)" />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Commits</span>
              </div>
              {RECENT_COMMITS.map((c, i) => (
                <div key={c.hash} style={{ paddingBottom: '10px', marginBottom: i < 2 ? '10px' : 0, borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'Geist Mono, monospace' }}>{c.hash}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={10} />{c.ago}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>{c.msg}</div>
                </div>
              ))}

              {/* Activity feed mini */}
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                  <Activity size={12} color="var(--text-tertiary)" />
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Activity</span>
                </div>
                {[
                  { icon: CheckCircle2, color: 'var(--green)', msg: 'Database schema task completed' },
                  { icon: AlertCircle, color: 'var(--peach)', msg: '3 blockers flagged by AI' },
                ].map((a, i) => {
                  const Icon = a.icon
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 6 }}>
                      <Icon size={12} color={a.color} style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{a.msg}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
