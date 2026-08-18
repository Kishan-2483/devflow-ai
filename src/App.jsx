import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Positioning from './components/Positioning'
import Features from './components/Features'
import ProductShowcase from './components/ProductShowcase'
import HowItWorks from './components/HowItWorks'
import PlanGenerator from './components/PlanGenerator'
import AIInteraction from './components/AIInteraction'
import Security from './components/Security'
import CTASection from './components/CTASection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <Features />
        <ProductShowcase />
        <HowItWorks />
        <PlanGenerator />
        <AIInteraction />
        <Security />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
