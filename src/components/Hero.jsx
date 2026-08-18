import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import HeroDashboard from './HeroDashboard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.2, 0, 0, 1] },
})

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        {/* Hero content */}
        <div className="hero-content">
          {/* Eyebrow */}
          <motion.p {...fadeUp(0)} className="eyebrow">
            AI Workspace for Developers
          </motion.p>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.08)} className="heading-display">
            Turn ideas into{' '}
            <span className="accent-gradient">shipped software.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p {...fadeUp(0.15)} className="body-lg" style={{ maxWidth: 600 }}>
            DevFlow AI turns complex development work into clear plans, actionable tasks,
            and measurable progress — so you can spend less time planning and more time building.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.22)} className="hero-ctas">
            <a href="#cta" className="btn btn-primary">
              Start Building
              <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn btn-ghost">
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--bg-subtle)', border: '1px solid var(--border-medium)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Play size={11} fill="currentColor" color="var(--text-secondary)" />
              </div>
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <div className="hero-dashboard-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.2, 0, 0, 1] }}
          >
            <HeroDashboard />
          </motion.div>

          {/* Soft gradient fade below dashboard into next section */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, var(--bg-page))',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </section>
  )
}
