import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import ProductPreview from './ProductPreview'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-noise">
        <div className="hero-glow" />
        <div className="hero-grid-lines" />
      </div>

      {/* Main Hero Header */}
      <div className="hero-inner">
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Developer Productivity Platform</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl"
        >
          Turn ideas into <span className="gradient-text">shipped software</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="body-lg"
          style={{ maxWidth: '580px' }}
        >
          DevFlow AI turns complex development tasks into clear implementation plans,
          actionable steps, and measurable progress — so you can spend less time planning
          and more time building.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-ctas"
        >
          <a href="#pricing" className="btn btn-brand">
            Start Building Free
            <ArrowRight size={15} />
          </a>
          <a href="#how-it-works" className="btn btn-ghost">
            <Play size={12} fill="currentColor" />
            See How It Works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="hero-note"
        >
          Free forever plan &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp; Deploy in minutes
        </motion.p>
      </div>

      {/* Primary Choreographed Animation: Dashboard appears right below Hero fold */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: '2.5rem', padding: '0 1rem', width: '100%' }}
      >
        <ProductPreview />
      </motion.div>
    </section>
  )
}
