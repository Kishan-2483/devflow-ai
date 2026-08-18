import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const STEPS = [
  {
    num: '01',
    label: 'Describe Requirements',
    heading: 'Define what you want to build in natural language',
    desc: 'Input functional requirements, API endpoints, or user stories. DevFlow connects context from your existing codebase structure without requiring bespoke prompting.',
    examplePrefix: 'Input > ',
    exampleText: '"Create JWT authentication with refresh tokens, rate limiting, and Postgres session persistence."',
  },
  {
    num: '02',
    label: 'Plan Generation',
    heading: 'Get actionable, sequenced implementation subtasks',
    desc: 'DevFlow generates a dependency-ordered task breakdown with concrete steps, files to create or edit, and test verification criteria.',
    examplePrefix: 'Plan > ',
    exampleText: '5 subtasks generated: [DB migration, JWT signer, OAuth middleware, Redis rate limiter, Jest suite]',
  },
  {
    num: '03',
    label: 'Execution & Delivery',
    heading: 'Build systematically and track real progress',
    desc: 'Execute each milestone in your editor. Check off verified subtasks, record architectural decisions as you go, and ship on time with full confidence.',
    examplePrefix: 'Status > ',
    exampleText: 'Milestone 78% complete · 1 step remaining before deployment',
  },
]

export default function Workflow() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '8px' }}>
            Workflow
          </span>
          <h2 className="heading-lg">
            How it works
          </h2>
          <p className="body-md" style={{ maxWidth: '520px', margin: '10px auto 0' }}>
            From ambiguous feature idea to shipped code in three straightforward steps.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="steps-list"
        >
          {STEPS.map((step) => (
            <div key={step.num} className="step-row">
              <div className="step-index">
                <span className="step-num">{step.num}</span>
                <div className="step-label-wrap">
                  <span className="step-label">{step.label}</span>
                  <h3 className="step-heading">{step.heading}</h3>
                </div>
              </div>

              <div className="step-body">
                <p className="step-desc">{step.desc}</p>
                <div className="step-example">
                  <span className="step-example-prefix">{step.examplePrefix}</span>
                  <span className="step-example-text">{step.exampleText}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
