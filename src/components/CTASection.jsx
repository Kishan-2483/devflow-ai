import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="cta" className="section-py">
      <div className="container">
        <motion.div
          ref={ref}
          className="cta-final"
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
        >
          {/* Abstract pastel blobs */}
          <div className="cta-blob" style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(124,111,247,0.18), transparent)',
            top: '-80px', left: '-60px',
          }} />
          <div className="cta-blob" style={{
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(91,135,197,0.18), transparent)',
            bottom: '-60px', right: '5%',
          }} />
          <div className="cta-blob" style={{
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(90,155,126,0.15), transparent)',
            bottom: '10%', left: '30%',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Get started</p>

            <h2 className="heading-xl" style={{ marginBottom: '1.25rem' }}>
              Build the thing you've been planning.
            </h2>

            <p className="body-lg" style={{ marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem' }}>
              Give your ideas a clearer path from concept to production.
            </p>

            <a href="#" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
              Start Building
              <ArrowRight size={18} />
            </a>

            <p style={{ marginTop: '1.25rem', fontSize: '13px', color: 'var(--text-tertiary)' }}>
              No credit card required to get started.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
