import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Send, RotateCcw, CheckSquare, Clock,
  AlertTriangle, ArrowRight, ChevronRight, Plus, Download
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ============================================================
   Static plan generator — given an idea, returns structured plan
   ============================================================ */
const EXAMPLE_PROMPTS = [
  'Build a user authentication system with email/password and OAuth.',
  'Create a REST API for a blog with posts, comments, and tags.',
  'Add a real-time notification system using WebSockets.',
  'Build a file upload feature with image resizing and S3 storage.',
]

// Deterministic "AI" plan generator based on keyword matching
function generatePlan(idea) {
  const lower = idea.toLowerCase()
  const isAuth = /auth|login|oauth|jwt|password|sign.?in/.test(lower)
  const isAPI = /api|rest|endpoint|route|crud/.test(lower)
  const isRealtime = /real.?time|websocket|socket|notif|live/.test(lower)
  const isFile = /file|upload|image|s3|storage|media/.test(lower)
  const isBlog = /blog|post|comment|article|tag/.test(lower)

  if (isAuth) return authPlan
  if (isRealtime) return realtimePlan
  if (isFile) return filePlan
  if (isBlog || isAPI) return apiPlan
  return genericPlan(idea)
}

const authPlan = {
  title: 'User Authentication System',
  estimate: '3–5 days',
  phases: [
    {
      phase: 'Phase 1 — Database',
      tasks: [
        { label: 'Create users table with email, hashed_password, role, created_at columns', priority: 'high', effort: '30m' },
        { label: 'Create sessions table for refresh token storage', priority: 'high', effort: '20m' },
        { label: 'Add indexes on users.email and sessions.token columns', priority: 'medium', effort: '15m' },
      ],
    },
    {
      phase: 'Phase 2 — Core Backend',
      tasks: [
        { label: 'Implement password hashing with bcrypt (cost factor ≥12)', priority: 'high', effort: '45m' },
        { label: 'Build JWT token service (access + refresh tokens)', priority: 'high', effort: '1.5h' },
        { label: 'Create registration endpoint with validation', priority: 'high', effort: '1h' },
        { label: 'Create login endpoint with credential verification', priority: 'high', effort: '1h' },
        { label: 'Implement token refresh and logout endpoints', priority: 'high', effort: '45m' },
      ],
    },
    {
      phase: 'Phase 3 — OAuth2',
      tasks: [
        { label: 'Configure OAuth2 provider (Google/GitHub) credentials', priority: 'high', effort: '20m' },
        { label: 'Build OAuth2 callback handler and user provisioning', priority: 'high', effort: '1.5h' },
        { label: 'Handle OAuth account linking to existing email accounts', priority: 'medium', effort: '1h' },
      ],
    },
    {
      phase: 'Phase 4 — Security & Testing',
      tasks: [
        { label: 'Add rate limiting middleware to auth endpoints', priority: 'high', effort: '30m' },
        { label: 'Implement auth middleware for protected routes', priority: 'high', effort: '45m' },
        { label: 'Write integration tests for all auth flows', priority: 'medium', effort: '2h' },
        { label: 'Add environment variable validation on startup', priority: 'medium', effort: '20m' },
      ],
    },
  ],
  blockers: [
    { label: 'OAuth callback URL must match registered provider URL exactly', severity: 'high' },
    { label: 'JWT_SECRET must be ≥32 chars and stored securely in environment', severity: 'high' },
  ],
}

const apiPlan = {
  title: 'Blog REST API',
  estimate: '2–4 days',
  phases: [
    {
      phase: 'Phase 1 — Data Model',
      tasks: [
        { label: 'Design posts table (title, body, author_id, status, published_at)', priority: 'high', effort: '30m' },
        { label: 'Design comments table with nested replies support', priority: 'medium', effort: '30m' },
        { label: 'Create tags and post_tags junction table', priority: 'medium', effort: '20m' },
        { label: 'Write and run database migrations', priority: 'high', effort: '30m' },
      ],
    },
    {
      phase: 'Phase 2 — API Endpoints',
      tasks: [
        { label: 'POST /posts — create post with validation', priority: 'high', effort: '45m' },
        { label: 'GET /posts — list with pagination, filtering, tag search', priority: 'high', effort: '1h' },
        { label: 'GET /posts/:slug — single post with comments', priority: 'high', effort: '45m' },
        { label: 'PUT/DELETE /posts/:id — update and soft-delete', priority: 'high', effort: '1h' },
        { label: 'POST /posts/:id/comments — create comment', priority: 'medium', effort: '45m' },
      ],
    },
    {
      phase: 'Phase 3 — Polish & Tests',
      tasks: [
        { label: 'Add request validation with descriptive error messages', priority: 'medium', effort: '1h' },
        { label: 'Implement rate limiting on write endpoints', priority: 'medium', effort: '30m' },
        { label: 'Write integration tests for all endpoints', priority: 'medium', effort: '2h' },
        { label: 'Generate OpenAPI/Swagger documentation', priority: 'low', effort: '1h' },
      ],
    },
  ],
  blockers: [
    { label: 'Pagination strategy (cursor vs offset) must be decided upfront', severity: 'medium' },
    { label: 'Authentication middleware required before protecting write routes', severity: 'high' },
  ],
}

const realtimePlan = {
  title: 'Real-Time Notification System',
  estimate: '3–5 days',
  phases: [
    {
      phase: 'Phase 1 — Infrastructure',
      tasks: [
        { label: 'Choose connection strategy: WebSocket vs SSE vs polling', priority: 'high', effort: '1h' },
        { label: 'Set up Redis pub/sub for cross-server message delivery', priority: 'high', effort: '1.5h' },
        { label: 'Create notifications table (user_id, type, payload, read_at)', priority: 'high', effort: '30m' },
      ],
    },
    {
      phase: 'Phase 2 — Server',
      tasks: [
        { label: 'Implement WebSocket server with auth handshake', priority: 'high', effort: '2h' },
        { label: 'Build notification publisher service', priority: 'high', effort: '1.5h' },
        { label: 'REST endpoint: GET /notifications with read/unread filter', priority: 'medium', effort: '45m' },
        { label: 'REST endpoint: PATCH /notifications/read-all', priority: 'medium', effort: '30m' },
      ],
    },
    {
      phase: 'Phase 3 — Client',
      tasks: [
        { label: 'Build WebSocket client with exponential reconnect logic', priority: 'high', effort: '1.5h' },
        { label: 'Notification bell UI with unread count badge', priority: 'medium', effort: '1h' },
        { label: 'Notification dropdown with mark-as-read interaction', priority: 'medium', effort: '1h' },
        { label: 'Test for connection drops and server restart recovery', priority: 'medium', effort: '1h' },
      ],
    },
  ],
  blockers: [
    { label: 'Load balancer must support sticky sessions or shared Redis channel', severity: 'high' },
    { label: 'Browser support for WebSocket must be verified for target users', severity: 'medium' },
  ],
}

const filePlan = {
  title: 'File Upload with Image Processing & S3',
  estimate: '2–3 days',
  phases: [
    {
      phase: 'Phase 1 — Storage Setup',
      tasks: [
        { label: 'Create S3 bucket with appropriate IAM permissions', priority: 'high', effort: '30m' },
        { label: 'Configure CORS policy on S3 bucket', priority: 'high', effort: '20m' },
        { label: 'Create uploads table (user_id, s3_key, type, size, status)', priority: 'high', effort: '20m' },
      ],
    },
    {
      phase: 'Phase 2 — Upload Flow',
      tasks: [
        { label: 'Implement multipart upload endpoint with file type validation', priority: 'high', effort: '1.5h' },
        { label: 'Add file size limits and MIME type allowlist', priority: 'high', effort: '30m' },
        { label: 'Generate presigned S3 URLs for direct client uploads', priority: 'high', effort: '1h' },
        { label: 'Build upload progress tracking endpoint', priority: 'medium', effort: '45m' },
      ],
    },
    {
      phase: 'Phase 3 — Image Processing',
      tasks: [
        { label: 'Set up Sharp or ImageMagick for server-side resizing', priority: 'high', effort: '1h' },
        { label: 'Generate thumbnail (150px) and medium (800px) variants', priority: 'high', effort: '1h' },
        { label: 'Store variants in S3 with consistent naming convention', priority: 'medium', effort: '30m' },
        { label: 'Write integration tests for upload and processing pipeline', priority: 'medium', effort: '1.5h' },
      ],
    },
  ],
  blockers: [
    { label: 'AWS credentials must be stored in environment variables, not code', severity: 'high' },
    { label: 'Max payload size must be configured in server and reverse proxy', severity: 'medium' },
  ],
}

function genericPlan(idea) {
  const shortIdea = idea.split(' ').slice(0, 5).join(' ')
  return {
    title: shortIdea,
    estimate: '2–4 days',
    phases: [
      {
        phase: 'Phase 1 — Research & Design',
        tasks: [
          { label: 'Define the data model and key entities', priority: 'high', effort: '1h' },
          { label: 'Identify external dependencies and APIs needed', priority: 'high', effort: '45m' },
          { label: 'Sketch the API surface and component structure', priority: 'medium', effort: '1h' },
        ],
      },
      {
        phase: 'Phase 2 — Implementation',
        tasks: [
          { label: 'Set up project structure and install dependencies', priority: 'high', effort: '30m' },
          { label: 'Implement the core data layer and models', priority: 'high', effort: '2h' },
          { label: 'Build primary feature logic and business rules', priority: 'high', effort: '3h' },
          { label: 'Integrate with external services or APIs', priority: 'medium', effort: '1.5h' },
        ],
      },
      {
        phase: 'Phase 3 — Polish & Ship',
        tasks: [
          { label: 'Add error handling and input validation', priority: 'high', effort: '1h' },
          { label: 'Write unit and integration tests', priority: 'medium', effort: '2h' },
          { label: 'Document the feature and update README', priority: 'low', effort: '45m' },
        ],
      },
    ],
    blockers: [
      { label: 'External API rate limits should be investigated before relying on them', severity: 'medium' },
    ],
  }
}

const PRIORITY_COLORS = {
  high: { chip: 'chip-peach', dot: 'var(--peach)' },
  medium: { chip: 'chip-blue', dot: 'var(--blue)' },
  low: { chip: 'chip-neutral', dot: 'var(--text-tertiary)' },
}

export default function PlanGenerator() {
  const { ref, isVisible } = useScrollReveal()
  const [input, setInput] = useState('')
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [checked, setChecked] = useState({})
  const textareaRef = useRef(null)
  const outputRef = useRef(null)

  const totalTasks = plan
    ? plan.phases.reduce((acc, p) => acc + p.tasks.length, 0)
    : 0
  const doneCount = Object.values(checked).filter(Boolean).length

  const handleGenerate = () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setPlan(null)
    setChecked({})
    setGenerated(false)

    setTimeout(() => {
      setPlan(generatePlan(input))
      setLoading(false)
      setGenerated(true)
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }, 1400)
  }

  const handleReset = () => {
    setPlan(null)
    setGenerated(false)
    setChecked({})
    setInput('')
    textareaRef.current?.focus()
  }

  const handleSuggestion = (s) => {
    setInput(s)
    textareaRef.current?.focus()
  }

  const toggleTask = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleGenerate()
  }

  let taskIdx = 0

  return (
    <section id="plan-generator" className="section-py" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <p className="eyebrow-accent">Try It Now</p>
          <h2 className="heading-xl">Describe what you want to build.</h2>
          <p className="body-lg" style={{ maxWidth: 520 }}>
            DevFlow AI reads your idea and generates a structured, ordered
            implementation plan — ready to execute.
          </p>
        </motion.div>

        {/* Generator card */}
        <motion.div
          className="planner-wrapper"
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
          {/* Card header */}
          <div className="planner-header">
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={15} color="var(--accent)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Plan Generator</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 1 }}>
                Describe your feature → get a structured implementation plan
              </div>
            </div>
            {generated && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleReset}
                className="btn btn-ghost btn-sm"
                style={{ gap: 6 }}
              >
                <RotateCcw size={13} />
                New Idea
              </motion.button>
            )}
          </div>

          {/* Input area */}
          <AnimatePresence>
            {!generated && (
              <motion.div
                key="input"
                initial={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
                className="planner-input-area"
              >
                {/* Suggestion chips */}
                <div className="planner-suggestions">
                  {EXAMPLE_PROMPTS.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="chip chip-neutral"
                      style={{ cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', padding: '5px 12px', border: '1px solid var(--border-medium)', transition: 'all 0.15s ease' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--accent-light)'
                        e.currentTarget.style.borderColor = 'var(--accent-mid)'
                        e.currentTarget.style.color = 'var(--accent)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--bg-subtle)'
                        e.currentTarget.style.borderColor = 'var(--border-medium)'
                        e.currentTarget.style.color = 'var(--text-secondary)'
                      }}
                    >
                      {s.length > 50 ? s.slice(0, 48) + '…' : s}
                    </button>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  className="planner-textarea"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Build a user authentication system with JWT and OAuth2 login via Google…"
                  rows={4}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.875rem', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                    Press <kbd style={{ fontFamily: 'monospace', background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4, fontSize: '11px', border: '1px solid var(--border-medium)' }}>⌘ Enter</kbd> to generate
                  </span>
                  <button
                    className="btn btn-accent"
                    onClick={handleGenerate}
                    disabled={!input.trim() || loading}
                    style={{ opacity: (!input.trim() || loading) ? 0.6 : 1, gap: 8 }}
                    id="generate-plan-btn"
                  >
                    {loading
                      ? <><span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />Generating plan…</>
                      : <><Sparkles size={15} />Generate Plan</>
                    }
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading skeleton */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Analyzing requirements and structuring implementation plan…
                  </span>
                </div>
                {[100, 80, 90, 70, 85].map((w, i) => (
                  <motion.div
                    key={i}
                    style={{ height: 42, borderRadius: 10, background: 'var(--bg-subtle)', marginBottom: 8, width: `${w}%` }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated plan output */}
          <AnimatePresence>
            {plan && !loading && (
              <motion.div
                key="output"
                ref={outputRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="planner-output"
              >
                {/* Plan summary bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12,
                  padding: '12px 14px',
                  background: 'var(--accent-light)',
                  border: '1px solid var(--accent-mid)',
                  borderRadius: 12,
                  marginBottom: '1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={15} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{plan.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11.5px', color: 'var(--accent)', fontWeight: 600 }}>
                          {plan.phases.length} phases · {totalTasks} tasks
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                          <Clock size={11} /> {plan.estimate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress badge */}
                  <div style={{ display: 'flex', align: 'center', gap: 10, flexShrink: 0 }}>
                    {totalTasks > 0 && (
                      <div style={{ textAlign: 'center', minWidth: 52 }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>
                          {doneCount}/{totalTasks}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>DONE</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {totalTasks > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        animate={{ width: `${(doneCount / totalTasks) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{doneCount} tasks complete</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>
                        {Math.round((doneCount / totalTasks) * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Phase task lists */}
                {plan.phases.map((phase, pi) => {
                  return (
                    <div key={pi} style={{ marginBottom: '1.25rem' }}>
                      <div className="plan-phase-label">{phase.phase}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {phase.tasks.map((task) => {
                          const key = `${pi}-${taskIdx}`
                          const isDone = checked[key]
                          taskIdx++
                          const currentKey = key
                          return (
                            <motion.div
                              key={currentKey}
                              className="plan-task-row"
                              style={{ opacity: isDone ? 0.6 : 1 }}
                              whileHover={{ scale: 1.005 }}
                              layout
                            >
                              {/* Checkbox */}
                              <div
                                className={`task-check ${isDone ? 'done' : ''}`}
                                onClick={() => toggleTask(currentKey)}
                                role="checkbox"
                                aria-checked={isDone}
                                tabIndex={0}
                                onKeyDown={e => e.key === ' ' && toggleTask(currentKey)}
                                style={{ marginTop: 1 }}
                              >
                                {isDone && (
                                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>

                              {/* Task content */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: '13.5px',
                                  fontWeight: 500,
                                  color: isDone ? 'var(--text-tertiary)' : 'var(--text-primary)',
                                  textDecoration: isDone ? 'line-through' : 'none',
                                  lineHeight: 1.45,
                                }}>
                                  {task.label}
                                </div>
                              </div>

                              {/* Meta */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                  <Clock size={10} />{task.effort}
                                </span>
                                <span className={`chip ${PRIORITY_COLORS[task.priority].chip}`} style={{ fontSize: '10px', padding: '2px 7px' }}>
                                  {task.priority}
                                </span>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {/* Blockers */}
                {plan.blockers?.length > 0 && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <div className="plan-phase-label" style={{ color: 'var(--peach)' }}>
                      ⚠ Things to address early
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {plan.blockers.map((b, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          padding: '10px 14px',
                          borderRadius: 10,
                          background: b.severity === 'high' ? 'var(--peach-light)' : 'var(--sand-light)',
                          border: `1px solid ${b.severity === 'high' ? 'rgba(224,122,95,0.2)' : 'rgba(196,168,130,0.25)'}`,
                        }}>
                          <AlertTriangle size={14} color={b.severity === 'high' ? 'var(--peach)' : 'var(--sand)'} style={{ flexShrink: 0, marginTop: 1 }} />
                          <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.45 }}>{b.label}</span>
                          <span className={`chip ${b.severity === 'high' ? 'chip-peach' : 'chip-sand'}`} style={{ fontSize: '10px', padding: '2px 7px', marginLeft: 'auto', flexShrink: 0 }}>
                            {b.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    Click tasks to mark them done. Check items off as you build.
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleReset} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
                      <RotateCcw size={13} /> New Plan
                    </button>
                    <a href="#cta" className="btn btn-accent btn-sm" style={{ gap: 6 }}>
                      Start Building <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset input button when plan exists */}
          {generated && !loading && (
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <button
                onClick={handleReset}
                style={{
                  width: '100%', padding: '10px',
                  borderRadius: 10, border: '1.5px dashed var(--border-medium)',
                  background: 'transparent', color: 'var(--text-tertiary)',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-mid)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
              >
                <Plus size={14} /> Try a different idea
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* CSS for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
