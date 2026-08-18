import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, LayoutDashboard, ListTodo,
  GitBranch, BarChart2, Sparkles, Clock, AlertCircle,
  Plus, ChevronRight, Activity, Zap, Cpu
} from 'lucide-react'

// Small ring chart component
function ProgressRing({ pct, size = 52, stroke = 5, color = '#7C6FF7' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8E5DF" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}

const TASKS = [
  { id: 1, label: 'Set up project scaffolding', done: true, priority: 'low' },
  { id: 2, label: 'Design database schema', done: true, priority: 'high' },
  { id: 3, label: 'Implement JWT authentication', done: true, priority: 'high' },
  { id: 4, label: 'Build OAuth2 callback handler', done: false, priority: 'high' },
  { id: 5, label: 'Write integration test suite', done: false, priority: 'medium' },
  { id: 6, label: 'Configure environment variables', done: false, priority: 'medium' },
]

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: ListTodo, label: 'Tasks', active: true },
  { icon: GitBranch, label: 'Commits' },
  { icon: BarChart2, label: 'Progress' },
]

export default function HeroDashboard() {
  const [tasks, setTasks] = useState(TASKS)
  const [activeTab, setActiveTab] = useState('tasks')

  const doneCount = tasks.filter(t => t.done).length
  const pct = Math.round((doneCount / tasks.length) * 100)

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div className="hero-dashboard-frame">
      {/* OS window chrome */}
      <div className="window-chrome">
        <div className="window-dots">
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-amber" />
          <span className="window-dot window-dot-green" />
        </div>
        <div className="window-url">
          <div className="window-url-pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }} />
            app.devflow.ai/workspace/auth-system
          </div>
        </div>
        <span className="chip chip-green" style={{ fontSize: '10px' }}>
          <span className="status-dot" />
          Live
        </span>
      </div>

      {/* Mobile nav strip — visible only below 600px (sidebar hidden) */}
      <div className="dashboard-mobile-nav">
        {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8, flexShrink: 0,
              background: active ? 'var(--accent-light)' : 'var(--bg-surface)',
              border: `1px solid ${active ? 'var(--accent-mid)' : 'var(--border-soft)'}`,
              color: active ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* Dashboard body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          {/* Project block */}
          <div className="sidebar-project-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={13} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Auth System</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Sprint 3</div>
              </div>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)' }}>
              <span>{doneCount}/{tasks.length} tasks</span>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
            </div>
          </div>

          {/* Nav items */}
          {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`sidebar-nav-item ${active ? 'active' : ''}`}
              onClick={() => {}}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}

          <div style={{ flexGrow: 1 }} />

          {/* AI badge */}
          <div style={{ padding: '8px 10px', background: 'var(--accent-light)', borderRadius: 8, border: '1px solid var(--accent-mid)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <Sparkles size={11} color="var(--accent)" />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)' }}>AI Copilot</span>
            </div>
            <div style={{ fontSize: '9px', color: 'var(--accent)', lineHeight: 1.4 }}>
              2 blockers detected. Click to review.
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="dashboard-main">
          {/* Top bar */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Authentication System</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 1 }}>
                Implementation plan · {tasks.length} tasks · Due in 4 days
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="progress-ring-container">
                <ProgressRing pct={pct} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ padding: '0 18px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 0, background: 'var(--bg-surface)' }}>
            {['tasks', 'plan', 'activity'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '9px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: activeTab === tab ? 'var(--accent)' : 'var(--text-tertiary)',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  marginBottom: -1,
                  fontFamily: 'inherit',
                  transition: 'color 0.15s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content pane */}
          <div style={{ padding: '14px 18px', overflowY: 'auto', maxHeight: 360 }}>
            <AnimatePresence mode="wait">
              {activeTab === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* AI generated plan notice */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 8, marginBottom: 12 }}>
                    <Sparkles size={13} color="var(--accent)" style={{ marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>AI Implementation Plan</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--accent)', opacity: 0.8, lineHeight: 1.4 }}>
                        Generated from your requirements. Click tasks to mark complete.
                      </div>
                    </div>
                  </div>

                  {/* Task list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {tasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.22 }}
                        onClick={() => toggleTask(task.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 12px',
                          borderRadius: 8,
                          background: task.done ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                          border: '1px solid var(--border-soft)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        whileHover={{ scale: 1.005 }}
                      >
                        <div className={`task-check ${task.done ? 'done' : ''}`}>
                          {task.done && (
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span style={{
                          fontSize: '12.5px',
                          fontWeight: 500,
                          color: task.done ? 'var(--text-tertiary)' : 'var(--text-primary)',
                          textDecoration: task.done ? 'line-through' : 'none',
                          flex: 1,
                        }}>
                          {task.label}
                        </span>
                        <span className={`chip chip-${task.priority === 'high' ? 'peach' : task.priority === 'medium' ? 'blue' : 'neutral'}`} style={{ fontSize: '9px', padding: '2px 7px' }}>
                          {task.priority}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add task hint */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '6px 12px', borderRadius: 8, color: 'var(--text-tertiary)', fontSize: '12px', cursor: 'default' }}>
                    <Plus size={12} />
                    <span>Add task or ask AI to suggest more</span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'plan' && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <div style={{ padding: '10px 14px', background: 'var(--bg-subtle)', borderRadius: 10, border: '1px solid var(--border-soft)', marginBottom: 10 }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                      AI Implementation Plan
                    </div>
                    {[
                      { phase: 'Phase 1 — Database', items: ['Create users table', 'Add sessions table', 'Set up indexes'] },
                      { phase: 'Phase 2 — Backend', items: ['JWT token service', 'OAuth2 handler', 'Rate limiting middleware'] },
                      { phase: 'Phase 3 — Testing', items: ['Unit tests', 'Integration tests', 'Load testing'] },
                    ].map(phase => (
                      <div key={phase.phase} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{phase.phase}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {phase.items.map(item => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                              <ChevronRight size={11} color="var(--text-tertiary)" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {[
                    { time: '2 min ago', msg: 'JWT authentication task marked complete', icon: CheckCircle2, color: 'var(--green)' },
                    { time: '14 min ago', msg: 'AI plan updated with 2 new subtasks', icon: Sparkles, color: 'var(--accent)' },
                    { time: '1 hour ago', msg: 'Database schema task completed', icon: CheckCircle2, color: 'var(--green)' },
                    { time: '3 hours ago', msg: 'OAuth2 blocker flagged by AI copilot', icon: AlertCircle, color: 'var(--peach)' },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none' }}>
                        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <Icon size={13} color={item.color} />
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.msg}</div>
                          <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginTop: 1 }}>{item.time}</div>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div style={{ padding: '7px 18px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
              <Activity size={11} />
              <span>{doneCount} of {tasks.length} tasks complete · {pct}% sprint progress</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '10.5px', color: 'var(--accent)' }}>
              <Cpu size={11} />
              <span>AI active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
