import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, AlertTriangle, Plus, Send, CheckCircle2, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const BLOCKERS = [
  {
    id: 1,
    label: 'OAuth callback configuration',
    detail: 'The callback URL in the OAuth provider does not match the staging environment URL.',
    severity: 'high',
  },
  {
    id: 2,
    label: 'Missing integration tests',
    detail: 'The authentication flow has no integration test coverage. Risk of regression on deploy.',
    severity: 'medium',
  },
  {
    id: 3,
    label: 'Environment variable validation',
    detail: 'JWT_SECRET and OAUTH_CLIENT_ID are undefined in the staging environment.',
    severity: 'medium',
  },
]

const SUGGESTIONS = [
  'What is blocking the authentication release?',
  'Which tasks are behind schedule?',
  'What should I build next?',
]

export default function AIInteraction() {
  const { ref, isVisible } = useScrollReveal()
  const [query, setQuery] = useState(SUGGESTIONS[0])
  const [answered, setAnswered] = useState(true)
  const [taskCreated, setTaskCreated] = useState(false)
  const [typing, setTyping] = useState(false)

  const handleSuggestion = (s) => {
    setQuery(s)
    setAnswered(false)
    setTaskCreated(false)
    setTyping(true)
    setTimeout(() => { setTyping(false); setAnswered(true) }, 1200)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setAnswered(false)
    setTaskCreated(false)
    setTyping(true)
    setTimeout(() => { setTyping(false); setAnswered(true) }, 1200)
  }

  return (
    <section className="section-py">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">AI Copilot</p>
          <h2 className="heading-xl">Ask your project anything.</h2>
          <p className="body-lg" style={{ maxWidth: 480 }}>
            DevFlow's AI understands your project context and gives you answers
            you can act on immediately.
          </p>
        </motion.div>

        {/* AI Interface */}
        <motion.div
          className="ai-interface-wrapper"
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Input area */}
          <div className="ai-input-area">
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>Try asking:</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: query === s ? 'var(--accent-light)' : 'var(--bg-surface)',
                      border: `1px solid ${query === s ? 'var(--accent-mid)' : 'var(--border-soft)'}`,
                      color: query === s ? 'var(--accent)' : 'var(--text-secondary)',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
              <div className={`ai-input-bar ${!answered && typing ? 'active' : ''}`} style={{ flex: 1, cursor: 'text' }}>
                <Sparkles size={14} color="var(--accent)" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    background: 'transparent', fontSize: '0.875rem',
                    color: 'var(--text-primary)', fontFamily: 'inherit',
                  }}
                  placeholder="Ask about your project..."
                />
              </div>
              <button type="submit" className="btn btn-accent btn-sm">
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Response area */}
          <div className="ai-response-area">
            <AnimatePresence mode="wait">
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-tertiary)', fontSize: '13px' }}
                >
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                  <span>Analyzing project context...</span>
                </motion.div>
              )}

              {answered && !typing && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Response header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--peach-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertTriangle size={14} color="var(--peach)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>3 blockers detected</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Authentication System · Sprint 3</div>
                      </div>
                    </div>
                  </div>

                  {/* Blocker list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {BLOCKERS.map((b, i) => (
                      <motion.div
                        key={b.id}
                        className="ai-blocker-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.25 }}
                      >
                        <div style={{
                          width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                          background: b.severity === 'high' ? 'var(--peach)' : 'var(--sand)',
                        }} />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{b.label}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 400, lineHeight: 1.5 }}>{b.detail}</div>
                        </div>
                        <span className={`chip ${b.severity === 'high' ? 'chip-peach' : 'chip-neutral'}`} style={{ marginLeft: 'auto', flexShrink: 0, alignSelf: 'flex-start' }}>
                          {b.severity}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Create tasks action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AnimatePresence>
                      {!taskCreated ? (
                        <motion.button
                          key="create"
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="btn btn-accent btn-sm"
                          onClick={() => setTaskCreated(true)}
                        >
                          <Plus size={13} />
                          Create tasks for these blockers
                        </motion.button>
                      ) : (
                        <motion.div
                          key="created"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green)', fontSize: '13.5px', fontWeight: 600 }}
                        >
                          <CheckCircle2 size={16} />
                          3 tasks added to your sprint
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>or</span>
                    <button
                      style={{ fontSize: '12.5px', color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => {}}
                    >
                      View full analysis <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
