import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  Zap, LayoutDashboard, FolderKanban, ListTodo,
  BarChart2, Settings, Terminal, Clock, Sparkles,
  Plus, Check, ArrowUpRight, TrendingUp, GitBranch,
  Shield, CheckCheck, Cpu, Code2, Users, Sliders
} from 'lucide-react'

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Build authentication system',
    tag: 'In Progress',
    tagClass: 'badge-brand',
    fillClass: 'fill-brand',
    subtasks: [
      { id: 11, label: 'Create user database schema & migrations', done: true },
      { id: 12, label: 'Configure asymmetric JWT signing keys', done: true },
      { id: 13, label: 'Add OAuth2 session middleware', done: true },
      { id: 14, label: 'Implement refresh token rotation', done: false },
      { id: 15, label: 'Write end-to-end integration tests', done: false },
    ],
  },
  {
    id: 2,
    title: 'Configure automated CI/CD pipeline',
    tag: 'In Progress',
    tagClass: 'badge-amber',
    fillClass: 'fill-amber',
    subtasks: [
      { id: 21, label: 'GitHub Actions multi-stage build workflow', done: true },
      { id: 22, label: 'Docker containerized runner setup', done: true },
      { id: 23, label: 'Staging environment auto-deploy webhook', done: false },
      { id: 24, label: 'Secret rotation and audit alerting', done: false },
    ],
  },
  {
    id: 3,
    title: 'Design API rate limiting & throttling',
    tag: 'Planned',
    tagClass: 'badge-neutral',
    fillClass: 'fill-neutral',
    subtasks: [
      { id: 31, label: 'Token bucket algorithm benchmark', done: false },
      { id: 32, label: 'Redis distributed sliding window cache', done: false },
      { id: 33, label: 'Tiered 429 response interceptors', done: false },
    ],
  },
]

const PROJECTS_DATA = [
  { name: 'auth-service', repo: 'github.com/org/auth-service', branch: 'main', progress: 78, tasksCount: '3 active', status: 'Active Sprint', color: 'var(--brand)' },
  { name: 'payment-gateway', repo: 'github.com/org/payments-v2', branch: 'feat/stripe-elements', progress: 92, tasksCount: '1 remaining', status: 'Review', color: 'var(--accent-emerald)' },
  { name: 'notification-engine', repo: 'github.com/org/notify-service', branch: 'main', progress: 45, tasksCount: '4 active', status: 'In Progress', color: 'var(--accent-amber)' },
  { name: 'search-indexer', repo: 'github.com/org/search-cluster', branch: 'main', progress: 100, tasksCount: 'Shipped', status: 'Deployed', color: 'var(--accent-cyan)' },
]

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FolderKanban, label: 'Projects' },
  { icon: ListTodo, label: 'Tasks' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
]

export default function ProductPreview() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [selectedTaskId, setSelectedTaskId] = useState(1)
  const [activeNav, setActiveNav] = useState('Tasks')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskInput, setNewTaskInput] = useState('')
  const [hoveredProgress, setHoveredProgress] = useState(false)

  // Settings tab mock state
  const [aiModel, setAiModel] = useState('Claude 3.5 Sonnet')
  const [autoADR, setAutoADR] = useState(true)
  const [gitSync, setGitSync] = useState(true)

  // Calculate live progress for a task
  const getTaskProgress = (task) => {
    if (!task.subtasks.length) return 0
    const doneCount = task.subtasks.filter((s) => s.done).length
    return Math.round((doneCount / task.subtasks.length) * 100)
  }

  // Calculate overall sprint progress dynamically
  const totalSubtasks = tasks.reduce((sum, t) => sum + t.subtasks.length, 0)
  const totalDoneSubtasks = tasks.reduce(
    (sum, t) => sum + t.subtasks.filter((s) => s.done).length,
    0
  )
  const overallProgress = totalSubtasks ? Math.round((totalDoneSubtasks / totalSubtasks) * 100) : 0

  // Interactive toggle for subtask checkbox
  const toggleSubtask = (taskId, subtaskId, e) => {
    e.stopPropagation()
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t
        const updatedSubtasks = t.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, done: !s.done } : s
        )
        const allDone = updatedSubtasks.every((s) => s.done)
        const noneDone = updatedSubtasks.every((s) => !s.done)
        return {
          ...t,
          subtasks: updatedSubtasks,
          tag: allDone ? 'Completed' : noneDone ? 'Planned' : 'In Progress',
          tagClass: allDone ? 'badge-brand' : noneDone ? 'badge-neutral' : 'badge-amber',
          fillClass: allDone ? 'fill-brand' : noneDone ? 'fill-neutral' : 'fill-amber',
        }
      })
    )
  }

  // Interactive addition of new AI plan
  const handleAddNewTask = (e) => {
    e.preventDefault()
    if (!newTaskInput.trim()) return

    const newTask = {
      id: Date.now(),
      title: newTaskInput.trim(),
      tag: 'In Progress',
      tagClass: 'badge-brand',
      fillClass: 'fill-brand',
      subtasks: [
        { id: Date.now() + 1, label: 'Analyze codebase references & schemas', done: true },
        { id: Date.now() + 2, label: 'Generate typed schema interfaces', done: false },
        { id: Date.now() + 3, label: 'Implement handler and tests', done: false },
      ],
    }

    setTasks((prev) => [newTask, ...prev])
    setSelectedTaskId(newTask.id)
    setNewTaskInput('')
    setIsAddingTask(false)
  }

  return (
    <div id="product" style={{ width: '100%', maxWidth: '1060px', margin: '0 auto' }}>
      {/* Product Frame with Chrome */}
      <div className="hero-frame-inner" style={{ borderRadius: '14px', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg)' }}>
        {/* Window Chrome Titlebar */}
        <div className="hero-frame-bar">
          <div className="frame-dot frame-dot-r" />
          <div className="frame-dot frame-dot-y" />
          <div className="frame-dot frame-dot-g" />
          <div className="frame-url">
            <div className="frame-url-pill">
              <span className="frame-url-dot" />
              <span>app.devflow.ai/workspace/{activeNav.toLowerCase()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10.5px', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)' }} />
              Live Workspace
            </span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="frame-body" style={{ minHeight: '480px' }}>
          {/* Left Navigation Sidebar */}
          <aside className="db-sidebar">
            <div className="db-sidebar-top">
              <div className="db-proj-mark">
                <Zap size={13} color="#ffffff" fill="#ffffff" />
              </div>
              <div>
                <div className="db-proj-name">DevFlow Engine</div>
                <div className="db-proj-meta">auth-service / main</div>
              </div>
            </div>

            <nav className="db-nav" aria-label="Sidebar Navigation">
              {NAV_ITEMS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  className={`db-nav-item ${activeNav === label ? 'active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <div className="db-sidebar-foot">
              <div className="db-avatar">JD</div>
              <div>
                <div className="db-user-name">Jordan Dev</div>
                <div className="db-user-plan">Lead Engineer</div>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <div className="db-main">
            {/* VIEW 1: TASKS (Default Interactive Track) */}
            {activeNav === 'Tasks' && (
              <>
                {/* Top Toolbar */}
                <div className="db-topbar">
                  <div className="db-topbar-left">
                    <h3>Sprint 14: Core Auth & Pipeline</h3>
                    <p>{tasks.length} active implementation tracks &nbsp;·&nbsp; {totalDoneSubtasks}/{totalSubtasks} steps verified</p>
                  </div>

                  <div className="db-topbar-right">
                    {/* Interactive Progress Chip with Hover Tooltip */}
                    <div
                      className="db-progress-chip"
                      onMouseEnter={() => setHoveredProgress(true)}
                      onMouseLeave={() => setHoveredProgress(false)}
                    >
                      <div className="db-progress-track">
                        <motion.div
                          className="db-progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${overallProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="db-progress-label">{overallProgress}%</span>

                      <div className="db-tooltip" style={{ opacity: hoveredProgress ? 1 : 0 }}>
                        {totalDoneSubtasks} of {totalSubtasks} subtasks complete ({overallProgress}%)
                      </div>
                    </div>

                    <button
                      onClick={() => setIsAddingTask(!isAddingTask)}
                      className="db-btn-new"
                    >
                      <Plus size={12} style={{ display: 'inline', marginRight: 2 }} />
                      New Plan
                    </button>
                  </div>
                </div>

                {/* Quick Add Plan Form */}
                <AnimatePresence>
                  {isAddingTask && (
                    <motion.form
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      onSubmit={handleAddNewTask}
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--border)',
                        background: 'var(--bg-overlay)',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Describe a new feature (e.g. Implement webhook HMAC signature verification)..."
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        autoFocus
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          borderRadius: '6px',
                          background: 'var(--bg-raised)',
                          border: '1px solid var(--border-strong)',
                          color: 'var(--fg-primary)',
                          fontSize: '12px',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                      <button
                        type="submit"
                        className="btn btn-brand btn-sm"
                        style={{ padding: '6px 12px', fontSize: '11px' }}
                      >
                        Generate Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingTask(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '6px 10px', fontSize: '11px' }}
                      >
                        Cancel
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* AI Copilot Status Strip */}
                <div className="db-ai-strip">
                  <div className="db-ai-icon">
                    <Sparkles size={11} color="var(--brand-fg)" />
                  </div>
                  <div className="db-ai-text">
                    <strong>AI Copilot:</strong> {overallProgress}% of Sprint 14 completed.
                    {overallProgress === 100
                      ? ' All subtasks verified. Ready for staging release.'
                      : ' Click any subtask to test live progress recalculation.'}
                  </div>
                </div>

                {/* Tasks List */}
                <div className="db-tasks">
                  {tasks.map((task) => {
                    const isExpanded = selectedTaskId === task.id
                    const taskProgress = getTaskProgress(task)
                    const doneCount = task.subtasks.filter((s) => s.done).length

                    return (
                      <div key={task.id}>
                        <button
                          onClick={() => setSelectedTaskId(isExpanded ? null : task.id)}
                          className={`task-btn ${isExpanded ? 'selected' : ''}`}
                        >
                          <div className="task-icon-wrap">
                            {taskProgress === 100 ? (
                              <CheckCircle2 size={15} color="var(--accent-emerald)" />
                            ) : taskProgress > 0 ? (
                              <div className="task-progress-ring">
                                <div className="task-progress-ring-dot" />
                              </div>
                            ) : (
                              <Circle size={15} color="var(--fg-tertiary)" />
                            )}
                          </div>

                          <div className="task-body">
                            <div className="task-row-top">
                              <span className="task-title-text">{task.title}</span>
                              <span className={`task-badge ${task.tagClass}`}>
                                {taskProgress === 100 ? 'Completed' : task.tag}
                              </span>
                            </div>

                            <div className="task-prog-row">
                              <div className="task-track">
                                <motion.div
                                  className={`task-fill ${task.fillClass}`}
                                  animate={{ width: `${taskProgress}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              <span className="task-count">
                                {doneCount}/{task.subtasks.length} steps ({taskProgress}%)
                              </span>
                            </div>
                          </div>

                          <div className="task-chevron-icon">
                            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </div>
                        </button>

                        {/* Expandable Subtasks */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="subtask-group">
                                {task.subtasks.map((sub) => (
                                  <div
                                    key={sub.id}
                                    onClick={(e) => toggleSubtask(task.id, sub.id, e)}
                                    className="subtask-row"
                                    style={{
                                      cursor: 'pointer',
                                      padding: '5px 8px',
                                      borderRadius: '6px',
                                      transition: 'background 0.15s'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                    title="Click to toggle status"
                                  >
                                    {sub.done ? (
                                      <div style={{
                                        width: 15, height: 15, borderRadius: 4,
                                        background: 'var(--accent-emerald)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                      }}>
                                        <Check size={11} color="#ffffff" strokeWidth={3} />
                                      </div>
                                    ) : (
                                      <div style={{
                                        width: 15, height: 15, borderRadius: 4,
                                        border: '1.5px solid var(--border-strong)',
                                        background: 'transparent',
                                        flexShrink: 0
                                      }} />
                                    )}
                                    <span className={`subtask-text ${sub.done ? 'done' : ''}`} style={{ userSelect: 'none' }}>
                                      {sub.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {/* VIEW 2: DASHBOARD OVERVIEW */}
            {activeNav === 'Dashboard' && (
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--fg-primary)' }}>Workspace Velocity & Overview</h3>
                    <p style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>Real-time telemetry across all 4 microservices</p>
                  </div>
                  <span className="task-badge badge-brand" style={{ fontSize: '10px' }}>● 4 Repos Synced</span>
                </div>

                {/* Metric Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={12} color="var(--accent-emerald)" /> Sprint Velocity
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', marginTop: '4px' }}>94.2%</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--accent-emerald)', marginTop: '2px' }}>+12% vs last sprint</div>
                  </div>

                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCheck size={12} color="var(--brand-fg)" /> Plans Shipped
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', marginTop: '4px' }}>28 / 31</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--fg-tertiary)', marginTop: '2px' }}>3 active in flight</div>
                  </div>

                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Code2 size={12} color="var(--accent-cyan)" /> Code Coverage
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', marginTop: '4px' }}>88.4%</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--accent-emerald)', marginTop: '2px' }}>Automated tests passing</div>
                  </div>
                </div>

                {/* Recent Plan Feed */}
                <div style={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)', padding: '12px 14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-primary)', marginBottom: '8px' }}>
                    Recent Implementation Logs
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--fg-secondary)' }}>
                      <span>✓ OAuth2 session token rotation merged</span>
                      <span style={{ fontSize: '10px', color: 'var(--fg-tertiary)', fontFamily: 'monospace' }}>24m ago</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--fg-secondary)' }}>
                      <span>✓ GitHub Actions multi-stage build verified</span>
                      <span style={{ fontSize: '10px', color: 'var(--fg-tertiary)', fontFamily: 'monospace' }}>2h ago</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--fg-secondary)' }}>
                      <span>○ Redis token-bucket benchmark queued</span>
                      <span style={{ fontSize: '10px', color: 'var(--fg-tertiary)', fontFamily: 'monospace' }}>Sprint 14</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: PROJECTS */}
            {activeNav === 'Projects' && (
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--fg-primary)' }}>Active Repositories</h3>
                    <p style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>Connected GitHub workspaces with automated DevFlow tracking</p>
                  </div>
                  <button className="db-btn-new">+ Add Repo</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {PROJECTS_DATA.map((proj) => (
                    <div
                      key={proj.name}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-overlay)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: proj.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <GitBranch size={14} color="#ffffff" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-primary)' }}>{proj.name}</div>
                          <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)', fontFamily: 'monospace' }}>{proj.repo} &nbsp;·&nbsp; {proj.branch}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--fg-primary)' }}>{proj.progress}%</span>
                          <div style={{ width: '60px', height: '4px', borderRadius: '99px', background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                            <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.color, borderRadius: '99px' }} />
                          </div>
                        </div>
                        <span className="task-badge badge-neutral" style={{ fontSize: '10px' }}>{proj.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 4: ANALYTICS */}
            {activeNav === 'Analytics' && (
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--fg-primary)' }}>Planning & Delivery Telemetry</h3>
                  <p style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>Quantifiable time saved by eliminating upfront planning ambiguities</p>
                </div>

                {/* Simulated Chart Bars */}
                <div style={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--fg-secondary)', marginBottom: '12px' }}>
                    <span>Weekly Implementation Velocity</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>↑ 38% faster delivery</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '100px', paddingBottom: '6px', borderBottom: '1px solid var(--border)' }}>
                    {[
                      { week: 'W1', height: '40%', val: '12h' },
                      { week: 'W2', height: '55%', val: '18h' },
                      { week: 'W3', height: '70%', val: '24h' },
                      { week: 'W4', height: '88%', val: '32h' },
                      { week: 'W5 (Now)', height: '98%', val: '38h' },
                    ].map((bar) => (
                      <div key={bar.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: bar.height, background: 'var(--brand)', borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                        <span style={{ fontSize: '9.5px', color: 'var(--fg-tertiary)' }}>{bar.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--fg-tertiary)' }}>Avg Planning Overhead</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>-62% reduction</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--fg-tertiary)' }}>Spec Drift Rate</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-fg)', marginTop: '2px' }}>&lt; 4.1% drift</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: SETTINGS */}
            {activeNav === 'Settings' && (
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--fg-primary)' }}>Workspace Configuration</h3>
                  <p style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>Model engine, VCS sync, and architectural decision logging parameters</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* AI Model Selection */}
                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-primary)' }}>Planning AI Engine</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)' }}>Model used to decompose technical specifications</div>
                    </div>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      style={{
                        padding: '5px 8px',
                        borderRadius: '6px',
                        background: 'var(--bg-raised)',
                        border: '1px solid var(--border-strong)',
                        color: 'var(--fg-primary)',
                        fontSize: '11.5px',
                        outline: 'none'
                      }}
                    >
                      <option>Claude 3.5 Sonnet</option>
                      <option>GPT-4o (Engineering)</option>
                      <option>DeepSeek Coder V2</option>
                    </select>
                  </div>

                  {/* Toggle 1: Auto ADR */}
                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-primary)' }}>Auto-Capture DECISIONS.md</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)' }}>Record architectural trade-offs automatically into repository</div>
                    </div>
                    <button
                      onClick={() => setAutoADR(!autoADR)}
                      style={{
                        width: '38px',
                        height: '20px',
                        borderRadius: '99px',
                        background: autoADR ? 'var(--brand)' : 'var(--border-strong)',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background 0.2s'
                      }}
                    >
                      <span style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: autoADR ? '21px' : '3px',
                        transition: 'left 0.2s'
                      }} />
                    </button>
                  </div>

                  {/* Toggle 2: Git Sync */}
                  <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-overlay)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-primary)' }}>Bidirectional Branch Sync</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--fg-tertiary)' }}>Mark steps complete as commits land on target branch</div>
                    </div>
                    <button
                      onClick={() => setGitSync(!gitSync)}
                      style={{
                        width: '38px',
                        height: '20px',
                        borderRadius: '99px',
                        background: gitSync ? 'var(--brand)' : 'var(--border-strong)',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background 0.2s'
                      }}
                    >
                      <span style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: gitSync ? '21px' : '3px',
                        transition: 'left 0.2s'
                      }} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Status Footer */}
            <div className="db-statusbar">
              <div className="db-status-item">
                <Terminal size={11} />
                <span>git:auth-engine (main)</span>
              </div>
              <div className="db-status-item">
                <Clock size={11} />
                <span>Tab: {activeNav} &nbsp;·&nbsp; Click tabs to switch views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Cue */}
      <p style={{
        textAlign: 'center',
        fontSize: '11.5px',
        color: 'var(--fg-tertiary)',
        marginTop: '12px',
        fontFamily: 'Inter, sans-serif'
      }}>
        💡 Interactive Demo — Switch between <strong>Dashboard</strong>, <strong>Projects</strong>, <strong>Tasks</strong>, <strong>Analytics</strong>, and <strong>Settings</strong>
      </p>
    </div>
  )
}
