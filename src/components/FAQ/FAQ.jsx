import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const faqs = [
  {
    id: 1,
    question: 'What types of events does Elite Eventure specialize in?',
    answer:
      'Elite Eventure specializes in exhibition stall design & fabrication, corporate events, brand activations, product launches, MICE experiences, and trade show participation. We handle everything from concept to on-site execution.',
  },
  {
    id: 2,
    question: 'How far in advance should I book Elite Eventure for my event?',
    answer:
      'We recommend reaching out at least 4–8 weeks before your event date to ensure ample time for concept development, design approvals, and fabrication. For large-scale exhibitions or international events, 3–6 months in advance is ideal.',
  },
  {
    id: 3,
    question: 'Do you handle exhibitions outside of India?',
    answer:
      'Yes! Elite Eventure has experience executing events across India and internationally. We manage all logistics, transportation, and on-site installation to ensure a seamless experience regardless of location.',
  },
  {
    id: 4,
    question: 'What is included in your end-to-end event management service?',
    answer:
      'Our end-to-end service covers concept ideation, 3D design & visualization, material procurement, fabrication, logistics, on-site installation, event-day management, and post-event dismantling — all handled by a single dedicated team.',
  },
  {
    id: 5,
    question: 'Can you work within a specific budget?',
    answer:
      `Absolutely. We work with clients across various budget ranges and always strive to deliver maximum impact within your constraints. Share your requirements and we'll tailor a solution that fits.`,
  },
  {
    id: 6,
    question: 'How do I get a quote for my event?',
    answer:
      'Simply reach out through our Contact page or email us with your event details — type of event, expected dates, location, and any specific requirements. Our team will get back to you with a customised proposal within 24–48 hours.',
  },
]

function ChevronIcon({ isOpen }) {
  return (
    <motion.div
      className="faq-chevron"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.div>
  )
}

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        id={`faq-btn-${faq.id}`}
      >
        <span className="faq-question-text">{faq.question}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="faq-answer">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        {/* ── Left column: heading ── */}
        <motion.div
          className="faq-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="faq-title">
            Frequently Asked{' '}
            <span className="faq-title-accent">Questions (FAQs)</span>
          </h2>
          <p className="faq-subtitle">
            Have questions about planning your next event?
            We've answered some of the most common queries.
          </p>
          <div className="faq-divider" />
        </motion.div>

        {/* ── Right column: accordion ── */}
        <div className="faq-right">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
