import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <a href="/" className="logo">
              <div className="logo-mark">
                <Zap size={14} color="#ffffff" fill="#ffffff" />
              </div>
              <span className="logo-name">
                DevFlow <span>AI</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation">
              <ul className="nav-links">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="nav-actions">
              <button
                onClick={toggle}
                className="icon-btn"
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <a href="#pricing" className="nav-login">
                Log in
              </a>
              <a href="#pricing" className="btn btn-brand btn-sm">
                Start Building Free
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="hamburger-btn"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="mobile-nav"
          >
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="mobile-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-footer">
              <button
                onClick={() => { toggle(); setMobileOpen(false); }}
                className="mobile-theme-row"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="btn btn-brand"
                style={{ justifyContent: 'center', width: '100%' }}
              >
                Start Building Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
