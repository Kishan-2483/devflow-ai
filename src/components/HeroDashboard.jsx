import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, AlertCircle, GitCommit, BarChart2,
  Clock, Sparkles, Zap, ListTodo, ChevronRight,
  Activity, Plus, LayoutDashboard, GitBranch, Cpu,
  TrendingUp, ArrowUpRight, Circle, AlertTriangle,
  GitMerge, GitPullRequest, User, Calendar
} from 'lucide-react'

/* ─── Shared progress ring ─── */
function ProgressRing({ pct, size = 52, stroke = 5, color = '#7C6FF7' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-muted)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ─── Initial task state ─── */
const INITIAL_TASKS = [
  { id: 1, label: 'Set up project scaffolding', done: true, priority: 'low', effort: '30m' },
  { id: 2, label: 'Design database schema', done: true, priority: 'high', effort: '1h' },
  { id: 3, label: 'Implement JWT authentication', done: true, priority: 'high', effort: '1.5h' },
  { id: 4, label: 'Build OAuth2 callback handler', done: false, priority: 'high', effort: '1.5h' },
  { id: 5, label: 'Write integration test suite', done: false, priority: 'medium', effort: '2h' },
  { id: 6, label: 'Configure environment variables', done: false, priority: 'medium', effort: '20m' },
]

/* ─── Commit history ─── */
const COMMITS = [
  { hash: 'a3f291c', msg: 'Add JWT refresh token logic', branch: 'feat/auth', author: 'KY', ago: '2h', status: 'merged' },
  { hash: 'bb14e07', msg: 'Database schema migration v3', branch: 'feat/auth', author: 'KY', ago: '5h', status: 'merged' },
  { hash: '9d0234a', msg: 'Fix auth middleware null pointer bug', branch: 'fix/middleware', author: 'KY', ago: '1d', status: 'merged' },
  { hash: '4a71bc3', msg: 'Add bcrypt password hashing', branch: 'feat/auth', author: 'KY', ago: '1d', status: 'merged' },
  { hash: 'f882e15', msg: 'Create sessions table migration', branch: 'feat/auth', author: 'KY', ago: '2d', status: 'merged' },
  { hash: '2c90d44', msg: 'OAuth2 provider configuration', branch: 'feat/oauth', author: 'KY', ago: '2d', status: 'open' },
]

/* ─── Sprint modules for Progress ─── */
const SPRINT_MODULES = [
  { name: 'Database layer', pct: 100, color: 'var(--green)', tasks: 4, done: 4 },
  { name: 'Auth backend', pct: 78, color: 'var(--accent)', tasks: 9, done: 7 },
  { name: 'OAuth2 flow', pct: 45, color: 'var(--blue)', tasks: 4, done: 2 },
  { name: 'Test suite', pct: 22, color: 'var(--peach)', tasks: 5, done: 1 },
]

/* ─── Velocity data (7 days) ─── */
const VELOCITY = [3, 5, 2, 7, 6, 8, 5]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const vMax = Math.max(...VELOCITY)

/* ─── Sidebar item config ─── */
const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'tasks', icon: ListTodo, label: 'Tasks' },
  { id: 'commits', icon: GitBranch, label: 'Commits' },
  { id: 'progress', icon: BarChart2, label: 'Progress' },
]

/* ══════════════════════════════════════════════
   VIEW: DASHBOARD
   ══════════════════════════════════════════════ */
function DashboardView({ tasks, doneCount, pct }) {
  const blockers = [
    { label: 'OAuth callback URL mismatch', severity: 'high' },
    { label: 'Missing integration test coverage', severity: 'medium' },
    { label: 'ENV variables undefined in staging', severity: 'medium' },
  ]
  const recentActivity = [
    { icon: CheckCircle2, color: 'var(--green)', text: 'JWT auth task marked complete', ago: '2m' },
    { icon: Sparkles, color: 'var(--accent)', text: 'AI plan updated with 2 subtasks', ago: '14m' },
    { icon: CheckCircle2, color: 'var(--green)', text: 'Database schema completed', ago: '1h' },
    { icon: AlertCircle, color: 'var(--peach)', text: '3 blockers flagged by AI', ago: '3h' },
  ]

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {/* Sprint snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Complete', value: `${pct}%`, color: 'var(--accent)', bg: 'var(--accent-light)' },
          { label: 'Blockers', value: '3', color: 'var(--peach)', bg: 'var(--peach-light)' },
          { label: 'Remaining', value: `${6 - doneCount}`, color: 'var(--blue)', bg: 'var(--blue-light)' },
        ].map(card => (
          <div key={card.label} style={{ padding: '10px 12px', background: card.bg, borderRadius: 10, border: '1px solid var(--border-soft)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: card.color, letterSpacing: '-0.03em' }}>{card.value}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* AI Blockers */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={13} color="var(--peach)" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>AI-flagged Blockers</span>
        </div>
        {blockers.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.severity === 'high' ? 'var(--peach)' : 'var(--sand)', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>{b.label}</span>
            <span className={`chip ${b.severity === 'high' ? 'chip-peach' : 'chip-neutral'}`} style={{ fontSize: '9px' }}>{b.severity}</span>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Activity size={13} color="var(--text-tertiary)" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Activity</span>
        </div>
        {recentActivity.map((a, i) => {
          const Icon = a.icon
          return (
            <div key={i} style={{ display: 'flex', gap: 9, padding: '8px 12px', borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <Icon size={11} color={a.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: 1 }}>{a.ago} ago</div>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   VIEW: TASKS
   ══════════════════════════════════════════════ */
function TasksView({ tasks, onToggle }) {
  const [filter, setFilter] = useState('all')
  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'done' ? t.done : !t.done)
  const PRIORITY_CHIP = { high: 'chip-peach', medium: 'chip-blue', low: 'chip-neutral' }

  return (
    <motion.div
      key="tasks"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* AI Notice */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 8 }}>
        <Sparkles size={13} color="var(--accent)" style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>AI Implementation Plan</div>
          <div style={{ fontSize: '10.5px', color: 'var(--accent)', opacity: 0.8, lineHeight: 1.4 }}>Click tasks to mark them done.</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {['all', 'todo', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '4px 10px', borderRadius: 6, fontSize: '11px', fontWeight: 600,
              background: filter === f ? 'var(--text-primary)' : 'var(--bg-subtle)',
              color: filter === f ? 'white' : 'var(--text-tertiary)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s ease', textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <AnimatePresence>
          {filtered.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onToggle(task.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 9,
                background: task.done ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                border: '1px solid var(--border-soft)', cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
            >
              <div className={`task-check ${task.done ? 'done' : ''}`}>
                {task.done && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: '12.5px', fontWeight: 500, flex: 1,
                color: task.done ? 'var(--text-tertiary)' : 'var(--text-primary)',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>
                {task.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Clock size={9} />{task.effort}
                </span>
                <span className={`chip ${PRIORITY_CHIP[task.priority]}`} style={{ fontSize: '9px', padding: '2px 7px' }}>
                  {task.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-tertiary)', fontSize: '12.5px' }}>
            No {filter} tasks.
          </div>
        )}
      </div>

      {/* Add task hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', color: 'var(--text-tertiary)', fontSize: '12px', cursor: 'default', borderRadius: 8, border: '1.5px dashed var(--border-medium)' }}>
        <Plus size={12} /><span>Add task or ask AI to suggest more</span>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   VIEW: COMMITS
   ══════════════════════════════════════════════ */
function CommitsView() {
  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div
      key="commits"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* Branch selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 8 }}>
        <GitBranch size={12} color="var(--accent)" />
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>feat/auth</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-tertiary)' }}>6 commits ahead of main</span>
      </div>

      {/* Commit list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 10, overflow: 'hidden' }}>
        {COMMITS.map((c, i) => {
          const isOpen = expanded === i
          return (
            <div key={c.hash}>
              <div
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', cursor: 'pointer',
                  borderBottom: i < COMMITS.length - 1 ? '1px solid var(--border-soft)' : 'none',
                  background: isOpen ? 'var(--accent-light)' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Icon */}
                <div style={{ width: 26, height: 26, borderRadius: 7, background: c.status === 'merged' ? 'var(--green-light)' : 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.status === 'merged'
                    ? <GitMerge size={13} color="var(--green)" />
                    : <GitPullRequest size={13} color="var(--accent)" />
                  }
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: isOpen ? 'var(--accent)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.msg}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--accent)', fontWeight: 700 }}>{c.hash}</span>
                    <span>{c.branch}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><Clock size={9} />{c.ago} ago</span>
                  </div>
                </div>

                {/* Status badge */}
                <span className={`chip ${c.status === 'merged' ? 'chip-green' : 'chip-accent'}`} style={{ fontSize: '9px', padding: '2px 7px', flexShrink: 0 }}>
                  {c.status}
                </span>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden', background: 'var(--bg-subtle)', borderBottom: i < COMMITS.length - 1 ? '1px solid var(--border-soft)' : 'none' }}
                  >
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <div style={{ marginBottom: 6, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          <span><span style={{ color: 'var(--text-tertiary)' }}>Author</span> · <User size={10} style={{ display: 'inline' }} /> {c.author}</span>
                          <span><span style={{ color: 'var(--text-tertiary)' }}>Branch</span> · {c.branch}</span>
                        </div>
                        <div style={{ padding: '8px 10px', background: 'var(--bg-surface)', borderRadius: 6, border: '1px solid var(--border-soft)', color: 'var(--text-secondary)', fontSize: '11px' }}>
                          + Implement {c.msg.toLowerCase()}<br />
                          + Add related unit tests<br />
                          ~ Update README for new changes
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   VIEW: PROGRESS
   ══════════════════════════════════════════════ */
function ProgressView({ pct, doneCount, totalTasks }) {
  return (
    <motion.div
      key="progress"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {/* Sprint ring + summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 12 }}>
        <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
          <ProgressRing pct={pct} size={64} stroke={6} color="var(--accent)" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Sprint 3 — Auth System</div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: 2 }}>{doneCount} of {totalTasks} tasks · 4 days remaining</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <TrendingUp size={12} color="var(--green)" />
            <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>On track to complete</span>
          </div>
        </div>
      </div>

      {/* Module breakdown */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid var(--border-soft)', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <BarChart2 size={13} color="var(--text-tertiary)" /> Module Progress
        </div>
        {SPRINT_MODULES.map((m, i) => (
          <div key={m.name} style={{ padding: '10px 12px', borderBottom: i < SPRINT_MODULES.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{m.done}/{m.tasks} tasks</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: m.color }}>{m.pct}%</span>
              </div>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                style={{ background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Velocity chart */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 10, padding: '12px 14px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Activity size={13} color="var(--text-tertiary)" /> Dev velocity · last 7 days
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 52 }}>
          {VELOCITY.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(v / vMax) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  borderRadius: '3px 3px 0 0',
                  background: i === VELOCITY.length - 1 ? 'var(--accent)' : i === VELOCITY.indexOf(vMax) ? 'var(--green)' : 'var(--bg-muted)',
                  minHeight: 4,
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 4 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: i === VELOCITY.length - 1 ? 'var(--accent)' : 'var(--text-tertiary)', fontWeight: i === VELOCITY.length - 1 ? 700 : 400 }}>{d}</div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */
export default function HeroDashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [activeView, setActiveView] = useState('tasks')

  const doneCount = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const pct = Math.round((doneCount / totalTasks) * 100)

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
          <span className="status-dot" />Live
        </span>
      </div>

      {/* Mobile nav strip */}
      <div className="dashboard-mobile-nav">
        {SIDEBAR_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8, flexShrink: 0,
              background: activeView === id ? 'var(--accent-light)' : 'var(--bg-surface)',
              border: `1px solid ${activeView === id ? 'var(--accent-mid)' : 'var(--border-soft)'}`,
              color: activeView === id ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s ease',
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
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)' }}>
              <span>{doneCount}/{totalTasks} tasks</span>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
            </div>
          </div>

          {/* Nav items */}
          {SIDEBAR_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`sidebar-nav-item ${activeView === id ? 'active' : ''}`}
              onClick={() => setActiveView(id)}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}

          <div style={{ flexGrow: 1 }} />

          {/* AI badge */}
          <div style={{ padding: '8px 10px', background: 'var(--accent-light)', borderRadius: 8, border: '1px solid var(--accent-mid)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <Sparkles size={11} color="var(--accent)" />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)' }}>AI Copilot</span>
            </div>
            <div style={{ fontSize: '9px', color: 'var(--accent)', lineHeight: 1.4 }}>
              2 blockers detected. Click to review.
            </div>
          </div>
        </aside>

        {/* Main panel */}
        <div className="dashboard-main">
          {/* Top bar */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', gap: 10 }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Authentication System</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 1 }}>
                {doneCount}/{totalTasks} tasks · Sprint 3 · {pct}% complete
              </div>
            </div>
            <div className="progress-ring-container">
              <ProgressRing pct={pct} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ padding: '0 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 0, background: 'var(--bg-surface)' }}>
            {SIDEBAR_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                style={{
                  padding: '8px 13px',
                  fontSize: '12px', fontWeight: 600,
                  color: activeView === id ? 'var(--accent)' : 'var(--text-tertiary)',
                  background: 'none', border: 'none',
                  borderBottom: activeView === id ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer', textTransform: 'capitalize', marginBottom: -1,
                  fontFamily: 'inherit', transition: 'color 0.15s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content pane — scrollable */}
          <div style={{ overflowY: 'auto', maxHeight: 380 }}>
            <AnimatePresence mode="wait">
              {activeView === 'dashboard' && (
                <DashboardView tasks={tasks} doneCount={doneCount} pct={pct} />
              )}
              {activeView === 'tasks' && (
                <TasksView tasks={tasks} onToggle={toggleTask} />
              )}
              {activeView === 'commits' && (
                <CommitsView />
              )}
              {activeView === 'progress' && (
                <ProgressView pct={pct} doneCount={doneCount} totalTasks={totalTasks} />
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div style={{ padding: '6px 16px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
              <Activity size={11} />
              <span>{doneCount} of {totalTasks} tasks complete · {pct}% sprint progress</span>
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
