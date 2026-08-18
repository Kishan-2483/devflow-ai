import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, AlertCircle, GitCommit, BarChart2,
  Clock, Sparkles, Zap, ListTodo, ChevronRight,
  Activity, Plus, LayoutDashboard, GitBranch, Cpu,
  TrendingUp, AlertTriangle, GitMerge, GitPullRequest,
  User, RotateCcw, ArrowRight, Check
} from 'lucide-react'

/* ─── Shared progress ring ─── */
function ProgressRing({ pct, size = 52, stroke = 5, color = '#8282FD' }) {
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

/* ─── Preset Plan Templates ─── */
const PLAN_TEMPLATES = {
  auth: {
    title: 'User Authentication System',
    sprint: 'Sprint 3 · Auth & Security',
    tasks: [
      { id: 1, label: 'Design users & session database schema', done: true, priority: 'high', effort: '1h' },
      { id: 2, label: 'Implement password hashing with bcrypt', done: true, priority: 'high', effort: '45m' },
      { id: 3, label: 'Build JWT token service with refresh rotation', done: true, priority: 'high', effort: '1.5h' },
      { id: 4, label: 'Build OAuth2 callback handler & user sync', done: false, priority: 'high', effort: '1.5h' },
      { id: 5, label: 'Write end-to-end integration test suite', done: false, priority: 'medium', effort: '2h' },
      { id: 6, label: 'Configure environment secret validation', done: false, priority: 'medium', effort: '20m' },
    ],
    blockers: [
      { label: 'OAuth callback URL mismatch with staging provider', severity: 'high' },
      { label: 'Missing integration tests on refresh token rotation', severity: 'medium' },
    ]
  },
  api: {
    title: 'High-Performance REST & GraphQL API',
    sprint: 'Sprint 4 · Core API Layer',
    tasks: [
      { id: 101, label: 'Design schema migrations & indexed relations', done: true, priority: 'high', effort: '1.5h' },
      { id: 102, label: 'Implement CRUD handlers with Zod validation', done: true, priority: 'high', effort: '2h' },
      { id: 103, label: 'Add Redis sliding-window rate limiter', done: false, priority: 'high', effort: '1h' },
      { id: 104, label: 'Setup cursor-based pagination for feeds', done: false, priority: 'medium', effort: '1.5h' },
      { id: 105, label: 'Auto-generate OpenAPI v3 documentation', done: false, priority: 'low', effort: '45m' },
    ],
    blockers: [
      { label: 'Redis connection pooling needed for high concurrency', severity: 'high' },
    ]
  },
  realtime: {
    title: 'Real-Time Notification Engine',
    sprint: 'Sprint 5 · WebSocket Pub/Sub',
    tasks: [
      { id: 201, label: 'Deploy Redis Pub/Sub cluster for broadcasts', done: true, priority: 'high', effort: '1.5h' },
      { id: 202, label: 'Build authenticated WebSocket connection pool', done: false, priority: 'high', effort: '2h' },
      { id: 203, label: 'Implement heartbeat ping & auto-reconnect client', done: false, priority: 'medium', effort: '1h' },
      { id: 204, label: 'Create in-app notification dropdown component', done: false, priority: 'medium', effort: '1.5h' },
      { id: 205, label: 'Write load test suite for 10k concurrent sockets', done: false, priority: 'high', effort: '2.5h' },
    ],
    blockers: [
      { label: 'Load balancer sticky sessions configuration required', severity: 'high' },
    ]
  },
  storage: {
    title: 'Direct-to-S3 Media Upload & Processing',
    sprint: 'Sprint 6 · Asset Pipeline',
    tasks: [
      { id: 301, label: 'Configure S3 bucket CORS & IAM presigned policies', done: true, priority: 'high', effort: '45m' },
      { id: 302, label: 'Implement presigned URL generator endpoint', done: true, priority: 'high', effort: '1h' },
      { id: 303, label: 'Add client-side multipart chunk uploader', done: false, priority: 'high', effort: '2h' },
      { id: 304, label: 'Build Sharp serverless thumbnail worker', done: false, priority: 'medium', effort: '1.5h' },
      { id: 305, label: 'Add virus scanning hook on upload complete', done: false, priority: 'low', effort: '1h' },
    ],
    blockers: [
      { label: 'Bucket size limit alert threshold must be set', severity: 'medium' },
    ]
  }
}

const EXAMPLE_SUGGESTIONS = [
  { label: 'Auth & OAuth System', key: 'auth', text: 'Build authentication system with JWT and Google OAuth' },
  { label: 'Blog & Content REST API', key: 'api', text: 'Create a REST API with pagination, filtering and validation' },
  { label: 'Real-time WebSockets', key: 'realtime', text: 'Add real-time notifications with Redis PubSub' },
  { label: 'S3 Media Uploads', key: 'storage', text: 'Direct-to-S3 file uploads with image resizing' },
]

/* ─── Commit history ─── */
const INITIAL_COMMITS = [
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

const VELOCITY = [3, 5, 2, 7, 6, 8, 5]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const vMax = Math.max(...VELOCITY)

const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'planner',   icon: Sparkles,        label: 'AI Planner', badge: 'AI' },
  { id: 'tasks',     icon: ListTodo,        label: 'Tasks' },
  { id: 'commits',   icon: GitBranch,       label: 'Commits' },
  { id: 'progress',  icon: BarChart2,       label: 'Progress' },
]

/* ══════════════════════════════════════════════
   VIEW 1: AI PLAN GENERATOR (INTEGRATED)
   ══════════════════════════════════════════════ */
function PlannerView({ onApplyPlan, currentProjectTitle }) {
  const [promptText, setPromptText] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [applied, setApplied] = useState(false)
  const textareaRef = useRef(null)

  const handleGenerate = (customText) => {
    const textToUse = customText || promptText
    if (!textToUse.trim() || generating) return

    setGenerating(true)
    setGeneratedPlan(null)
    setApplied(false)

    setTimeout(() => {
      const lower = textToUse.toLowerCase()
      let plan = PLAN_TEMPLATES.auth
      if (/api|rest|graphql|crud|endpoint/.test(lower)) plan = PLAN_TEMPLATES.api
      else if (/real.?time|socket|websocket|notif|pub.?sub/.test(lower)) plan = PLAN_TEMPLATES.realtime
      else if (/file|upload|s3|image|media|storage/.test(lower)) plan = PLAN_TEMPLATES.storage
      else {
        // Generic fallback generated from user's custom title
        const cleanTitle = textToUse.split(/[.\n]/)[0].slice(0, 40)
        plan = {
          title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
          sprint: 'Sprint · Custom Feature Plan',
          tasks: [
            { id: Date.now() + 1, label: `Design schema & data model for ${cleanTitle}`, done: true, priority: 'high', effort: '1h' },
            { id: Date.now() + 2, label: `Implement core business logic & handlers`, done: false, priority: 'high', effort: '2h' },
            { id: Date.now() + 3, label: `Integrate validation, middleware & error handling`, done: false, priority: 'medium', effort: '1.5h' },
            { id: Date.now() + 4, label: `Write automated integration tests`, done: false, priority: 'medium', effort: '1.5h' },
          ],
          blockers: [
            { label: 'Confirm dependencies and environment variable schema upfront', severity: 'medium' }
          ]
        }
      }

      setGeneratedPlan(plan)
      setGenerating(false)
    }, 1100)
  }

  const handleApply = () => {
    if (!generatedPlan) return
    onApplyPlan(generatedPlan)
    setApplied(true)
  }

  return (
    <motion.div
      key="planner"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {/* Top Banner */}
      <div style={{
        padding: '10px 12px',
        background: 'linear-gradient(135deg, rgba(87,86,243,0.22) 0%, rgba(130,130,253,0.15) 100%)',
        border: '1px solid rgba(130,130,253,0.30)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #5756F3 0%, #8282FD 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Sparkles size={14} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Specification & Plan Generator</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Describe what you want to build to decompose it into actionable tasks.</div>
          </div>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div>
        <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Quick Examples:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {EXAMPLE_SUGGESTIONS.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setPromptText(item.text)
                handleGenerate(item.text)
              }}
              style={{
                padding: '4px 9px',
                borderRadius: 99,
                fontSize: '11px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(130,130,253,0.22)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(130,130,253,0.20)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(130,130,253,0.22)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              + {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Input Form */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(130,130,253,0.25)',
        borderRadius: 10,
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        <textarea
          ref={textareaRef}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="e.g. Build an OAuth2 Google login flow with refresh token rotation and session management..."
          rows={2}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontFamily: 'inherit',
            resize: 'none',
            lineHeight: 1.5
          }}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleGenerate()
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid rgba(130,130,253,0.15)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
            Press <kbd style={{ padding: '1px 4px', background: 'rgba(255,255,255,0.1)', borderRadius: 4, fontFamily: 'monospace' }}>⌘ Enter</kbd> to run
          </span>
          <button
            onClick={() => handleGenerate()}
            disabled={!promptText.trim() || generating}
            className="btn btn-accent btn-xs"
            style={{ opacity: (!promptText.trim() || generating) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 5 }}
          >
            {generating ? (
              <>
                <span style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.6s linear infinite' }} />
                <span>Decomposing spec...</span>
              </>
            ) : (
              <>
                <Sparkles size={11} />
                <span>Generate Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Plan Output */}
      <AnimatePresence>
        {generatedPlan && !generating && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(130,130,253,0.30)',
              borderRadius: 10,
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
          >
            {/* Header with Apply button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{generatedPlan.title}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--accent)', marginTop: 1 }}>{generatedPlan.tasks.length} structured tasks generated</div>
              </div>

              <button
                onClick={handleApply}
                disabled={applied}
                className={`btn ${applied ? 'btn-ghost' : 'btn-primary'} btn-xs`}
                style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              >
                {applied ? (
                  <>
                    <Check size={12} color="var(--green)" />
                    <span style={{ color: 'var(--green)' }}>Synced to Workspace</span>
                  </>
                ) : (
                  <>
                    <Zap size={11} />
                    <span>Apply to Workspace Tasks</span>
                  </>
                )}
              </button>
            </div>

            {/* Tasks preview list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {generatedPlan.tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '7px 10px',
                    borderRadius: 7,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(130,130,253,0.15)',
                    fontSize: '11.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: task.priority === 'high' ? 'var(--peach)' : 'var(--blue)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-tertiary)' }}>{task.effort}</span>
                    <span className={`chip ${task.priority === 'high' ? 'chip-peach' : 'chip-blue'}`} style={{ fontSize: '8.5px', padding: '1px 5px' }}>{task.priority}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Blockers preview */}
            {generatedPlan.blockers?.length > 0 && (
              <div style={{ padding: '8px 10px', borderRadius: 7, background: 'rgba(255,138,112,0.10)', border: '1px solid rgba(255,138,112,0.25)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--peach)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AlertTriangle size={11} /> Potential Risks / Blockers Flagged:
                </div>
                {generatedPlan.blockers.map((b, i) => (
                  <div key={i} style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                    • {b.label}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   VIEW 2: DASHBOARD
   ══════════════════════════════════════════════ */
function DashboardView({ tasks, doneCount, pct, projectTitle, onSwitchToPlanner }) {
  const blockers = [
    { label: 'OAuth callback URL mismatch with staging provider', severity: 'high' },
    { label: 'Missing integration test coverage for refresh rotation', severity: 'medium' },
    { label: 'ENV variables validation required on container start', severity: 'medium' },
  ]
  const recentActivity = [
    { icon: CheckCircle2, color: 'var(--green)', text: 'JWT auth task marked complete', ago: '2m' },
    { icon: Sparkles, color: 'var(--accent)', text: 'AI plan updated with 2 subtasks', ago: '14m' },
    { icon: CheckCircle2, color: 'var(--green)', text: 'Database schema migrations completed', ago: '1h' },
    { icon: AlertCircle, color: 'var(--peach)', text: '3 blockers flagged by AI copilot', ago: '3h' },
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
          { label: 'Complete', value: `${pct}%`, color: 'var(--accent)', bg: 'rgba(130,130,253,0.18)' },
          { label: 'Blockers', value: '3', color: 'var(--peach)', bg: 'rgba(255,138,112,0.15)' },
          { label: 'Remaining', value: `${tasks.length - doneCount}`, color: 'var(--blue)', bg: 'rgba(111,112,244,0.18)' },
        ].map((card, i) => (
          <div key={i} style={{ padding: '10px 12px', background: card.bg, borderRadius: 10, border: '1px solid rgba(130,130,253,0.22)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: card.color, letterSpacing: '-0.03em' }}>{card.value}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* AI Copilot Action Strip */}
      <div style={{
        padding: '10px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(130,130,253,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={14} color="var(--accent)" />
          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Want to generate a new implementation plan?</span>
        </div>
        <button onClick={onSwitchToPlanner} className="btn btn-accent btn-xs" style={{ gap: 4 }}>
          <span>Launch AI Planner</span>
          <ArrowRight size={10} />
        </button>
      </div>

      {/* AI Blockers */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid rgba(130,130,253,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={13} color="var(--peach)" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>AI-flagged Blockers</span>
        </div>
        {blockers.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: i < 2 ? '1px solid rgba(130,130,253,0.12)' : 'none' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.severity === 'high' ? 'var(--peach)' : 'var(--sand)', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>{b.label}</span>
            <span className={`chip ${b.severity === 'high' ? 'chip-peach' : 'chip-neutral'}`} style={{ fontSize: '9px' }}>{b.severity}</span>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid rgba(130,130,253,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Activity size={13} color="var(--text-tertiary)" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Activity</span>
        </div>
        {recentActivity.map((a, i) => {
          const Icon = a.icon
          return (
            <div key={i} style={{ display: 'flex', gap: 9, padding: '8px 12px', borderBottom: i < 3 ? '1px solid rgba(130,130,253,0.12)' : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
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
   VIEW 3: TASKS
   ══════════════════════════════════════════════ */
function TasksView({ tasks, onToggle, onSwitchToPlanner }) {
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'rgba(130,130,253,0.16)',
        border: '1px solid rgba(130,130,253,0.30)',
        borderRadius: 8,
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={13} color="var(--accent)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>Active AI Implementation Plan</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Click tasks to mark complete. Live telemetry recalculates automatically.</div>
          </div>
        </div>

        <button onClick={onSwitchToPlanner} className="btn btn-ghost btn-xs" style={{ fontSize: '10px', padding: '3px 8px' }}>
          + New Plan
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {['all', 'todo', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '4px 10px', borderRadius: 6, fontSize: '11px', fontWeight: 600,
              background: filter === f ? 'rgba(130,130,253,0.35)' : 'rgba(255,255,255,0.06)',
              color: filter === f ? '#FFFFFF' : 'var(--text-tertiary)',
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
                background: task.done ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(130,130,253,0.18)', cursor: 'pointer',
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

      {/* Add task hint that opens Planner */}
      <button
        onClick={onSwitchToPlanner}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '8px 12px', color: 'var(--accent)', fontSize: '12px',
          cursor: 'pointer', borderRadius: 8, border: '1.5px dashed rgba(130,130,253,0.35)',
          background: 'transparent', fontFamily: 'inherit', width: '100%'
        }}
      >
        <Plus size={12} /><span>Ask AI Planner to generate more tasks</span>
      </button>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   VIEW 4: COMMITS
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 8 }}>
        <GitBranch size={12} color="var(--accent)" />
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>feat/auth</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-tertiary)' }}>6 commits ahead of main</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 10, overflow: 'hidden' }}>
        {INITIAL_COMMITS.map((c, i) => {
          const isOpen = expanded === i
          return (
            <div key={c.hash}>
              <div
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', cursor: 'pointer',
                  borderBottom: i < INITIAL_COMMITS.length - 1 ? '1px solid rgba(130,130,253,0.12)' : 'none',
                  background: isOpen ? 'rgba(130,130,253,0.18)' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 7, background: c.status === 'merged' ? 'rgba(93,219,160,0.15)' : 'rgba(130,130,253,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.status === 'merged'
                    ? <GitMerge size={13} color="var(--green)" />
                    : <GitPullRequest size={13} color="var(--accent)" />
                  }
                </div>

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

                <span className={`chip ${c.status === 'merged' ? 'chip-green' : 'chip-accent'}`} style={{ fontSize: '9px', padding: '2px 7px', flexShrink: 0 }}>
                  {c.status}
                </span>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.15)', borderBottom: i < INITIAL_COMMITS.length - 1 ? '1px solid rgba(130,130,253,0.12)' : 'none' }}
                  >
                    <div style={{ padding: '10px 12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <div style={{ marginBottom: 6, display: 'flex', gap: 16 }}>
                        <span>Author: {c.author}</span>
                        <span>Branch: {c.branch}</span>
                      </div>
                      <div style={{ padding: '6px 8px', background: 'rgba(0,0,0,0.25)', borderRadius: 6, fontFamily: 'monospace', fontSize: '10.5px' }}>
                        + Verify implementation plan specs<br />
                        + Run automated lint and unit suite
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
   VIEW 5: PROGRESS
   ══════════════════════════════════════════════ */
function ProgressView({ pct, doneCount, totalTasks, projectTitle }) {
  return (
    <motion.div
      key="progress"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
      style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 12 }}>
        <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
          <ProgressRing pct={pct} size={64} stroke={6} color="var(--accent)" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{projectTitle}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: 2 }}>{doneCount} of {totalTasks} tasks complete</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <TrendingUp size={12} color="var(--green)" />
            <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>On track to ship</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid rgba(130,130,253,0.15)', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <BarChart2 size={13} color="var(--text-tertiary)" /> Module Progress Breakdown
        </div>
        {SPRINT_MODULES.map((m, i) => (
          <div key={m.name} style={{ padding: '10px 12px', borderBottom: i < SPRINT_MODULES.length - 1 ? '1px solid rgba(130,130,253,0.12)' : 'none' }}>
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

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(130,130,253,0.20)', borderRadius: 10, padding: '12px 14px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Activity size={13} color="var(--text-tertiary)" /> Development velocity · last 7 days
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
                  background: i === VELOCITY.length - 1 ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
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
   MAIN HERO DASHBOARD / PRODUCT PREVIEW EXPORT
   ══════════════════════════════════════════════ */
export default function HeroDashboard() {
  const [projectTitle, setProjectTitle] = useState('Authentication System')
  const [projectMeta, setProjectMeta] = useState('Sprint 3 · Auth & Security')
  const [tasks, setTasks] = useState(PLAN_TEMPLATES.auth.tasks)
  const [activeView, setActiveView] = useState('tasks')

  const doneCount = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const pct = totalTasks ? Math.round((doneCount / totalTasks) * 100) : 0

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const handleApplyPlan = (newPlan) => {
    setProjectTitle(newPlan.title)
    setProjectMeta(newPlan.sprint || 'Active Sprint')
    setTasks(newPlan.tasks)
    setActiveView('tasks')
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
            app.devflow.ai/workspace/{activeView}
          </div>
        </div>
        <span className="chip chip-green" style={{ fontSize: '10px' }}>
          <span className="status-dot" />Live Workspace
        </span>
      </div>

      {/* Mobile nav strip */}
      <div className="dashboard-mobile-nav">
        {SIDEBAR_ITEMS.map(({ id, icon: Icon, label, badge }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8, flexShrink: 0,
              background: activeView === id ? 'rgba(130,130,253,0.22)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${activeView === id ? 'rgba(130,130,253,0.40)' : 'rgba(130,130,253,0.15)'}`,
              color: activeView === id ? '#C0C0FF' : 'var(--text-secondary)',
              fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s ease',
            }}
          >
            <Icon size={13} />
            <span>{label}</span>
            {badge && (
              <span style={{ fontSize: '8px', padding: '1px 4px', borderRadius: 4, background: 'var(--accent)', color: '#fff', fontWeight: 700 }}>
                {badge}
              </span>
            )}
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
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: 'linear-gradient(135deg, #5756F3 0%, #8282FD 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap size={13} color="white" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {projectTitle}
                </div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {projectMeta}
                </div>
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
          {SIDEBAR_ITEMS.map(({ id, icon: Icon, label, badge }) => (
            <button
              key={id}
              className={`sidebar-nav-item ${activeView === id ? 'active' : ''}`}
              onClick={() => setActiveView(id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Icon size={14} />
                <span>{label}</span>
              </div>
              {badge && (
                <span style={{ fontSize: '8.5px', padding: '1px 5px', borderRadius: 4, background: 'linear-gradient(135deg, #5756F3 0%, #8282FD 100%)', color: '#fff', fontWeight: 700 }}>
                  {badge}
                </span>
              )}
            </button>
          ))}

          <div style={{ flexGrow: 1 }} />

          {/* AI Copilot card in sidebar */}
          <div
            onClick={() => setActiveView('planner')}
            style={{
              padding: '8px 10px',
              background: 'rgba(130,130,253,0.15)',
              borderRadius: 8,
              border: '1px solid rgba(130,130,253,0.30)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(130,130,253,0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(130,130,253,0.15)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <Sparkles size={11} color="var(--accent)" />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)' }}>AI Copilot</span>
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Click to generate plans from prompt or specs.
            </div>
          </div>
        </aside>

        {/* Main panel */}
        <div className="dashboard-main">
          {/* Top bar */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(130,130,253,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', gap: 10 }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{projectTitle}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 1 }}>
                {doneCount}/{totalTasks} tasks verified · {pct}% sprint progress
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
          <div style={{ padding: '0 16px', borderBottom: '1px solid rgba(130,130,253,0.18)', display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', overflowX: 'auto' }}>
            {SIDEBAR_ITEMS.map(({ id, label, badge }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                style={{
                  padding: '8px 12px',
                  fontSize: '12px', fontWeight: 600,
                  color: activeView === id ? 'var(--accent)' : 'var(--text-tertiary)',
                  background: 'none', border: 'none',
                  borderBottom: activeView === id ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer', textTransform: 'capitalize', marginBottom: -1,
                  fontFamily: 'inherit', transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5
                }}
              >
                <span>{label}</span>
                {badge && (
                  <span style={{ fontSize: '7.5px', padding: '1px 4px', borderRadius: 3, background: 'var(--accent)', color: '#fff' }}>
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content pane — scrollable */}
          <div style={{ overflowY: 'auto', maxHeight: 380 }}>
            <AnimatePresence mode="wait">
              {activeView === 'planner' && (
                <PlannerView
                  onApplyPlan={handleApplyPlan}
                  currentProjectTitle={projectTitle}
                />
              )}
              {activeView === 'dashboard' && (
                <DashboardView
                  tasks={tasks}
                  doneCount={doneCount}
                  pct={pct}
                  projectTitle={projectTitle}
                  onSwitchToPlanner={() => setActiveView('planner')}
                />
              )}
              {activeView === 'tasks' && (
                <TasksView
                  tasks={tasks}
                  onToggle={toggleTask}
                  onSwitchToPlanner={() => setActiveView('planner')}
                />
              )}
              {activeView === 'commits' && (
                <CommitsView />
              )}
              {activeView === 'progress' && (
                <ProgressView
                  pct={pct}
                  doneCount={doneCount}
                  totalTasks={totalTasks}
                  projectTitle={projectTitle}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div style={{ padding: '6px 16px', background: 'rgba(41,38,136,0.35)', borderTop: '1px solid rgba(130,130,253,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
              <Activity size={11} />
              <span>{doneCount} of {totalTasks} tasks complete · {pct}% sprint progress</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '10.5px', color: 'var(--accent)' }}>
              <Cpu size={11} />
              <span>AI copilot synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
