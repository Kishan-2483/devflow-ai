import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
]

// Simple geometric logo mark
function LogoMark() {
  return (
    <div className="nav-logo-mark">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.35"/>
      </svg>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-bg' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <a href="#" className="nav-logo">
              <LogoMark />
              <span>DevFlow AI</span>
            </a>

            {/* Center links – desktop */}
            <nav aria-label="Main navigation">
              <ul className="nav-links-desktop">
                {NAV_LINKS.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="nav-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right actions – desktop */}
            <div className="nav-actions">
              <a href="#" className="nav-login">Log in</a>
              <a href="#cta" className="btn btn-primary btn-sm">Start Building</a>
            </div>

            {/* Hamburger – mobile */}
            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(26,25,23,0.3)',
                backdropFilter: 'blur(4px)',
                zIndex: 98,
              }}
            />
            <motion.div
              key="menu"
              className="mobile-nav"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            >
              <ul className="mobile-nav-list" role="list">
                {NAV_LINKS.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="mobile-nav-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mobile-nav-footer">
                <a href="#" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  Log in
                </a>
                <a
                  href="#cta"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Start Building
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
