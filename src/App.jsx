import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Workflow from './components/Workflow'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--fg-primary)' }}>
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Workflow />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
