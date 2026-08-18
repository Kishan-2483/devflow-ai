import { motion } from 'framer-motion'
import { Target, Layers, Rocket } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PRINCIPLES = [
  {
    icon: Target,
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    label: 'Plan with Clarity',
    desc: 'Turn ambiguous requirements into structured implementation plans with clear, ordered tasks.',
  },
  {
    icon: Layers,
    color: 'var(--blue)',
    bg: 'var(--blue-light)',
    label: 'Build with Focus',
    desc: 'Keep tasks, context, and progress in one workspace — no tab-switching, no context loss.',
  },
  {
    icon: Rocket,
    color: 'var(--green)',
    bg: 'var(--green-light)',
    label: 'Ship with Confidence',
    desc: 'Track what is complete and what still needs attention before every release.',
  },
]

export default function Positioning() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          {/* Statement */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="heading-md" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              Built for developers who want to focus on building.
            </h2>
          </div>

          {/* Principles */}
          <div className="principles-grid">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.label}
                  className="principle-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={20} color={p.color} />
                  </div>

                  <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{p.label}</p>
                  <p className="body-md">{p.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
