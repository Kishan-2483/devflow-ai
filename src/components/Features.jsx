import { motion } from 'framer-motion'
import { Sparkles, BrainCircuit, ShieldCheck, GitPullRequest, ArrowRight, Check } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Features() {
  const { ref: f1Ref, isVisible: f1Vis } = useScrollReveal()
  const { ref: f2Ref, isVisible: f2Vis } = useScrollReveal()
  const { ref: f3Ref, isVisible: f3Vis } = useScrollReveal()

  return (
    <section id="features" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '8px' }}>
            Core Capabilities
          </span>
          <h2 className="heading-lg">
            Engineered for developers who ship.
          </h2>
          <p className="body-md" style={{ maxWidth: '520px', margin: '10px auto 0' }}>
            No fluffy project management overhead. DevFlow AI translates requirements
            into actionable technical plans tailored to your existing architecture.
          </p>
        </div>

        {/* Editorial Feature Rows */}
        <div className="feature-showcase">
          {/* Feature 1: Intelligent Planning */}
          <motion.div
            ref={f1Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={f1Vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="feature-row"
          >
            <div className="feature-text-col">
              <span className="feature-kicker">
                <BrainCircuit size={14} />
                Architecture-Aware Planning
              </span>
              <h3 className="feature-title">
                Describe the feature in plain English. Get typed implementation tasks.
              </h3>
              <p className="feature-desc">
                DevFlow analyzes scope, identifies database migrations, dependencies,
                and edge cases, breaking work down into concrete files and functions to modify.
              </p>
              <div className="feature-list">
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Automatic dependency graph ordering</span>
                </div>
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Identifies database schemas and API contracts upfront</span>
                </div>
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Estimates testing coverage and migration complexity</span>
                </div>
              </div>
            </div>

            <div className="feature-visual">
              <div className="feature-visual-header">
                <span className="feature-visual-title">plan.generated.ts</span>
                <span style={{ fontSize: '10px', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono, monospace' }}>
                  ✓ validated
                </span>
              </div>
              <div className="feature-visual-body">
                <div className="code-block">
                  <div className="code-line">
                    <span className="code-num">1</span>
                    <span><span className="code-keyword">interface</span> <span className="code-fn">TaskPlan</span> {'{'}</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">2</span>
                    <span>&nbsp;&nbsp;target: <span className="code-string">"packages/auth/jwt.ts"</span>;</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">3</span>
                    <span>&nbsp;&nbsp;action: <span className="code-string">"implement_token_rotation"</span>;</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">4</span>
                    <span>&nbsp;&nbsp;subtasks: [</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">5</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"signWithRS256Key()"</span>,</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">6</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"revokeOnReplayDetection()"</span></span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">7</span>
                    <span>&nbsp;&nbsp;];</span>
                  </div>
                  <div className="code-line">
                    <span className="code-num">8</span>
                    <span>{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Real Progress Telemetry */}
          <motion.div
            ref={f2Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={f2Vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="feature-row"
          >
            <div className="feature-visual">
              <div className="feature-visual-header">
                <span className="feature-visual-title">Sprint Telemetry</span>
                <span style={{ fontSize: '10px', color: 'var(--fg-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Live sync
                </span>
              </div>
              <div className="feature-visual-body">
                <div className="prog-visual-list">
                  <div className="prog-item">
                    <div className="prog-item-top">
                      <span className="prog-item-name">Database Schemas & Models</span>
                      <span className="prog-item-pct">100%</span>
                    </div>
                    <div className="prog-bar">
                      <div className="prog-bar-fill" style={{ width: '100%', background: 'var(--accent-emerald)' }} />
                    </div>
                  </div>

                  <div className="prog-item">
                    <div className="prog-item-top">
                      <span className="prog-item-name">JWT & OAuth Middleware</span>
                      <span className="prog-item-pct">78%</span>
                    </div>
                    <div className="prog-bar">
                      <div className="prog-bar-fill" style={{ width: '78%', background: 'var(--brand)' }} />
                    </div>
                  </div>

                  <div className="prog-item">
                    <div className="prog-item-top">
                      <span className="prog-item-name">Integration Test Suite</span>
                      <span className="prog-item-pct">40%</span>
                    </div>
                    <div className="prog-bar">
                      <div className="prog-bar-fill" style={{ width: '40%', background: 'var(--accent-amber)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-text-col">
              <span className="feature-kicker">
                <GitPullRequest size={14} />
                Granular Progress Tracking
              </span>
              <h3 className="feature-title">
                Eliminate status meetings. See actual code milestones move.
              </h3>
              <p className="feature-desc">
                Progress isn't a vague percentage you guess. It's computed directly
                from checked-off implementation steps and verified code paths.
              </p>
              <div className="feature-list">
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Subtask-level milestone tracking</span>
                </div>
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Clear visibility on blockers and remaining scope</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Architectural Decision Logging */}
          <motion.div
            ref={f3Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={f3Vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="feature-row"
          >
            <div className="feature-text-col">
              <span className="feature-kicker">
                <ShieldCheck size={14} />
                Decision Records & Trade-offs
              </span>
              <h3 className="feature-title">
                Document why choices were made without extra documentation tickets.
              </h3>
              <p className="feature-desc">
                When you choose PostgreSQL over MongoDB, or Redis over in-memory caching,
                DevFlow logs the rationale directly in your project history.
              </p>
              <div className="feature-list">
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Automated architecture decision capture (ADRs)</span>
                </div>
                <div className="feature-list-item">
                  <Check className="feature-list-icon" />
                  <span>Permanent context for team onboarding and code reviews</span>
                </div>
              </div>
            </div>

            <div className="feature-visual">
              <div className="feature-visual-header">
                <span className="feature-visual-title">DECISIONS.md</span>
                <span style={{ fontSize: '10px', color: 'var(--brand-fg)', fontFamily: 'JetBrains Mono, monospace' }}>
                  ADR #04
                </span>
              </div>
              <div className="feature-visual-body">
                <div className="decision-list">
                  <div className="decision-item">
                    <div className="decision-tag">Architecture Decision</div>
                    <div className="decision-text">
                      Adopt Redis token-bucket algorithm for distributed rate limiting.
                    </div>
                    <div className="decision-meta">Rationale: sub-millisecond lookups with cluster HA.</div>
                  </div>
                  <div className="decision-item">
                    <div className="decision-tag">Trade-off Logged</div>
                    <div className="decision-text">
                      Accepted Redis dependency in exchange for stateless API nodes.
                    </div>
                    <div className="decision-meta">Status: Approved · Sprint 14</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
