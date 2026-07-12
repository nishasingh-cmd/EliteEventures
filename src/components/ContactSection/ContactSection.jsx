import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ContactSection.css'

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    projectBrief: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  // Auto-dismiss toast notifier
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  // Simple touch-based error validators
  const validateField = (name, val) => {
    let error = ''
    switch (name) {
      case 'fullName':
        if (!val.trim()) error = 'Full Name is required'
        else if (val.trim().length < 2) error = 'Minimum 2 characters'
        break
      case 'email':
        if (!val.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Invalid email syntax'
        break
      case 'companyName':
        if (!val.trim()) error = 'Company Name is required'
        break
      case 'projectBrief':
        if (!val.trim()) error = 'Project Brief is required'
        else if (val.trim().length < 10) error = 'Minimum 10 characters'
        break
      default:
        break
    }
    return error
  }

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
    if (touched[field]) {
      const err = validateField(field, val)
      setErrors((prev) => ({ ...prev, [field]: err }))
    }
  }

  const handleInputBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const err = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields on submit
    const newErrors = {}
    const newTouched = {}
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true
      const err = validateField(key, formData[key])
      if (err) newErrors[key] = err
    })

    setErrors(newErrors)
    setTouched(newTouched)

    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    // Simulate luxury API call
    setTimeout(() => {
      setIsSubmitting(false)
      setToast({
        show: true,
        message: 'Enquiry Sent Successfully!',
      })
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        projectBrief: '',
      })
      setErrors({})
      setTouched({})
    }, 1500)
  }

  return (
    <section id="contact" className="contact-section-wrapper">
      {/* Background spotlights */}
      <div className="contact-bg-spotlight" />

      <div className="container">
        <motion.div
          className="contact-container"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* LEFT SIDE - Info Panel */}
          <div className="contact-info-panel">
            <h2 className="contact-title">
              Let's build <br />
              <span className="contact-title-gold">something <br /> unforgettable.</span>
            </h2>

            {/* Vertical Contact Details */}
            <div className="contact-details-list">
              {/* Email */}
              <a href="mailto:hello@eliteeventure.in" className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="contact-detail-text">hello@eliteeventure.in</span>
              </a>

              {/* Phone */}
              <a href="tel:+919999999999" className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="contact-detail-text">+91 99999 99999</span>
              </a>

              {/* Location */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Elite Eventure Studio</span>
                  <span className="contact-detail-text-sub">Goregaon East, Mumbai · India</span>
                </span>
            </div>
          </div>
        </div>

          {/* RIGHT SIDE - Floating Contact Form */}
          <div className="contact-form-panel">
            <div className="contact-glass-card">
              <form onSubmit={handleSubmit} noValidate>
                <div className="contact-form-grid">

                  {/* Full Name */}
                  <div className="form-field-group">
                    <label className="form-field-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-input-text ${errors.fullName && touched.fullName ? 'has-error' : ''}`}
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      onBlur={() => handleInputBlur('fullName')}
                    />
                    <AnimatePresence>
                      {errors.fullName && touched.fullName && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.fullName}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="form-field-group">
                    <label className="form-field-label">Email</label>
                    <input
                      type="email"
                      className={`form-input-text ${errors.email && touched.email ? 'has-error' : ''}`}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleInputBlur('email')}
                    />
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.email}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Name */}
                  <div className="form-field-group">
                    <label className="form-field-label">Company</label>
                    <input
                      type="text"
                      className={`form-input-text ${errors.companyName && touched.companyName ? 'has-error' : ''}`}
                      placeholder="Acme Inc."
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      onBlur={() => handleInputBlur('companyName')}
                    />
                    <AnimatePresence>
                      {errors.companyName && touched.companyName && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.companyName}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Project Brief */}
                  <div className="form-field-group">
                    <label className="form-field-label">Project Brief</label>
                    <textarea
                      className={`form-textarea ${errors.projectBrief && touched.projectBrief ? 'has-error' : ''}`}
                      placeholder="Tell us about your event, timeline and dream outcome."
                      value={formData.projectBrief}
                      onChange={(e) => handleInputChange('projectBrief', e.target.value)}
                      onBlur={() => handleInputBlur('projectBrief')}
                    />
                    <AnimatePresence>
                      {errors.projectBrief && touched.projectBrief && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.projectBrief}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Send enquiry Pill CTA */}
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send enquiry'}
                    <span className="btn-arrow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </button>

                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {toast.show && (
          <div className="contact-toast-container">
            <motion.div
              className="contact-toast"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <div className="toast-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="toast-title">{toast.message}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactSection
