import { Zap, GitFork, ExternalLink } from 'lucide-react'

const FOOTER_LINKS = {
  Product: ['Workspace', 'Task Breakdown', 'Architecture Records', 'Telemetry'],
  Developers: ['Documentation', 'API Reference', 'CLI Tool', 'Changelog'],
  Company: ['About', 'Philosophy', 'Careers'],
  Legal: ['Privacy Notice', 'Terms of Service', 'Security Overview'],
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <a href="/" className="logo">
              <div className="logo-mark">
                <Zap size={14} color="#ffffff" fill="#ffffff" />
              </div>
              <span className="logo-name">
                DevFlow <span>AI</span>
              </span>
            </a>
            <p className="footer-tagline">
              Intelligent implementation planning and progress tracking for modern software engineering teams.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="GitHub Repository" className="footer-social">
                <GitFork size={14} />
              </a>
              <a href="#" aria-label="Documentation" className="footer-social">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer-col-head">{category}</h4>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} DevFlow AI. Engineered with React, Vite &amp; Framer Motion.
          </p>
          <p className="footer-copy">
            Designed for developers who prioritize shipping over planning overhead.
          </p>
        </div>
      </div>
    </footer>
  )
}
