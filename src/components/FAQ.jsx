import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FAQS = [
  {
    q: 'What is DevFlow AI?',
    a: 'DevFlow AI is a developer workspace that uses AI to help you turn ideas and project requirements into structured implementation plans, ordered tasks, and measurable progress — all in one place.',
  },
  {
    q: 'How does the AI planning work?',
    a: 'You describe what you want to build in plain language. DevFlow\'s AI analyzes your description and generates a structured, ordered list of implementation tasks, taking into account dependencies and priorities. You can review and adjust the plan before starting work.',
  },
  {
    q: 'Can I use DevFlow with my existing workflow?',
    a: 'Yes. DevFlow is designed to complement your existing tools, not replace them. You continue writing code in your preferred editor, managing repositories in GitHub or GitLab, and communicating in Slack or Linear — DevFlow provides the planning and progress layer on top.',
  },
  {
    q: 'Does DevFlow automatically modify my code?',
    a: 'No. DevFlow never modifies your codebase without your explicit action. The AI makes recommendations and generates plans, but all changes to your code are made by you. DevFlow is a planning and tracking tool, not an autonomous coding agent.',
  },
  {
    q: 'How does DevFlow handle project context?',
    a: 'DevFlow maintains a structured understanding of your project — tasks, progress, blockers, and AI-generated plans — within the workspace. This context is used to provide relevant suggestions and answers. Your data is not shared with third parties or used to train AI models.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <div className={`faq-icon ${isOpen ? 'open' : ''}`} aria-hidden>
          <Plus size={12} strokeWidth={2.5} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-content">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="section-py">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">FAQ</p>
          <h2 className="heading-lg">Common questions</h2>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
