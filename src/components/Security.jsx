import { motion } from 'framer-motion'
import { Lock, Eye, Users, MousePointer } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SECURITY_ITEMS = [
  {
    icon: Users,
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    label: 'Permission-aware workspace',
    desc: 'Access controls are always respected. DevFlow only surfaces what your role is permitted to see.',
  },
  {
    icon: Lock,
    color: 'var(--blue)',
    bg: 'var(--blue-light)',
    label: 'Secure project context',
    desc: 'Your project data, task descriptions, and plans are never shared with third parties or used to train models.',
  },
  {
    icon: Eye,
    color: 'var(--green)',
    bg: 'var(--green-light)',
    label: 'Activity visibility',
    desc: 'Every AI action, suggestion, and plan update is logged so your team always knows what changed and when.',
  },
  {
    icon: MousePointer,
    color: 'var(--peach)',
    bg: 'var(--peach-light)',
    label: 'Human-controlled AI actions',
    desc: 'DevFlow never modifies your code or creates tasks without your explicit approval. AI suggests; you decide.',
  },
]

export default function Security() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="security" className="section-py" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Security & Control</p>
          <h2 className="heading-xl" style={{ maxWidth: 700, margin: '0 auto' }}>
            Your code and project context stay under your control.
          </h2>
          <p className="body-lg" style={{ maxWidth: 520 }}>
            DevFlow is designed to give you clarity without compromising your control.
            The AI assists; your team decides.
          </p>
        </motion.div>

        {/* Security items */}
        <motion.div
          className="security-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {SECURITY_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="security-item"
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              >
                {/* Icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                  background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={19} color={item.color} />
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {item.label}
                  </h3>
                  <p className="body-sm">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '13px', color: 'var(--text-tertiary)' }}
        >
          DevFlow does not make claims of specific security certifications. Contact us for detailed security documentation.
        </motion.p>
      </div>
    </section>
  )
}
