import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const STEPS = [
  {
    num: '01',
    label: 'Describe',
    heading: 'Tell DevFlow what you want to build.',
    desc: 'Write a feature description, paste a spec, or just explain it in plain language. No templates required.',
  },
  {
    num: '02',
    label: 'Plan',
    heading: 'AI converts the idea into structured technical tasks.',
    desc: 'DevFlow breaks down your request into ordered, actionable implementation tasks with priorities and dependencies.',
  },
  {
    num: '03',
    label: 'Build',
    heading: 'Work through tasks while keeping project context visible.',
    desc: 'Execute each step in your editor. DevFlow tracks progress, surfaces blockers, and keeps your plan up to date.',
  },
  {
    num: '04',
    label: 'Ship',
    heading: 'Track progress and confidently move toward release.',
    desc: 'See what is done, what is pending, and what is at risk — so you can ship on schedule without surprises.',
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="how-it-works" className="section-py" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">How It Works</p>
          <h2 className="heading-xl">From idea to shipped in four steps.</h2>
          <p className="body-lg" style={{ maxWidth: 500 }}>
            A focused, repeatable workflow that takes you from vague requirement to production-ready code.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="step-card"
              initial={{ opacity: 0, y: 28 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.2, 0, 0, 1] }}
            >
              {/* Large number */}
              <div className="step-number">{step.num}</div>

              {/* Content */}
              <div>
                <p className="eyebrow" style={{ marginBottom: 8 }}>{step.label}</p>
                <h3 className="heading-sm" style={{ marginBottom: 10 }}>{step.heading}</h3>
                <p className="body-md">{step.desc}</p>
              </div>

              {/* Visual indicator line (desktop connector) */}
              {i < 3 && (
                <div style={{
                  display: 'none',
                }}/>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
