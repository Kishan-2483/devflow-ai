import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTA() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="pricing" className="cta-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="cta-inner"
        >
          <div className="cta-eyebrow">
            <span className="cta-eyebrow-line" />
            <span className="cta-eyebrow-text">Get Started</span>
            <span className="cta-eyebrow-line" />
          </div>

          <h2 className="cta-heading">
            Ready to build something great?
          </h2>

          <p className="cta-desc">
            Start structuring your development tasks with intelligent implementation plans today.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <a href="#product" className="btn btn-brand" style={{ padding: '12px 24px', fontSize: '0.9375rem' }}>
              Start Building Free
              <ArrowRight size={16} />
            </a>
            <span className="cta-note">
              Free plan includes 10 AI plans/month &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp; Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
