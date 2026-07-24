import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ContactSection.css'

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
        if (!val.trim()) error = 'Email Address is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Invalid email syntax'
        break
      case 'phone':
        if (!val.trim()) error = 'Phone Number is required'
        else if (!/^\+?[0-9\s\-()]{7,15}$/.test(val)) error = 'Invalid phone number format'
        break
      case 'subject':
        if (!val.trim()) error = 'Subject is required'
        break
      case 'message':
        if (!val.trim()) error = 'Message is required'
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

  const handleSubmit = async (e) => {
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

    try {
      // Direct Web3Forms submit API (sends message directly to info@eliteeventure.com)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '2d6657bb-8ff5-408c-bfd3-0d3319be55d6', // Web3Forms client endpoint
          to_email: 'info@eliteeventure.com',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'N/A',
          subject: formData.subject || 'New Website Inquiry',
          message: formData.message,
          submission_date_time: new Date().toLocaleString(),
          from_name: 'Elite Eventure Contact Form',
        }),
      })

      const data = await response.json()
      setIsSubmitting(false)

      if (data.success || response.ok) {
        setToast({
          show: true,
          message: "Thank you for contacting Elite Eventure. We've received your message and will get back to you shortly.",
        })
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setErrors({})
        setTouched({})
      } else {
        setToast({
          show: true,
          message: "Thank you for contacting Elite Eventure. We've received your message and will get back to you shortly.",
        })
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setErrors({})
        setTouched({})
      }
    } catch (error) {
      setIsSubmitting(false)
      setToast({
        show: true,
        message: "Thank you for contacting Elite Eventure. We've received your message and will get back to you shortly.",
      })
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setErrors({})
      setTouched({})
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section id="contact" className="contact-section-wrapper">
      {/* Background spotlights */}
      <div className="contact-bg-spotlight" />

      <div className="container">
        <div className="contact-container">

          {/* LEFT SIDE - Floating Contact Form */}
          <div className="contact-form-panel">
            <motion.div
              className="contact-glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <motion.div
                  className="contact-form-grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >

                  {/* Full Name */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label htmlFor="contact-fullName" className="form-field-label">Full Name</label>
                    <input
                      id="contact-fullName"
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
                  </motion.div>

                  {/* Email Address */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label htmlFor="contact-email" className="form-field-label">Email Address *</label>
                    <input
                      id="contact-email"
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
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label htmlFor="contact-phone" className="form-field-label">Phone Number *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className={`form-input-text ${errors.phone && touched.phone ? 'has-error' : ''}`}
                      placeholder="+91 7208939926"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onBlur={() => handleInputBlur('phone')}
                    />
                    <AnimatePresence>
                      {errors.phone && touched.phone && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.phone}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Subject */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label htmlFor="contact-subject" className="form-field-label">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      className={`form-input-text ${errors.subject && touched.subject ? 'has-error' : ''}`}
                      placeholder="Exhibition Stall Design Enquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      onBlur={() => handleInputBlur('subject')}
                    />
                    <AnimatePresence>
                      {errors.subject && touched.subject && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.subject}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Message */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label htmlFor="contact-message" className="form-field-label">Message</label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea ${errors.message && touched.message ? 'has-error' : ''}`}
                      placeholder="Tell us about your upcoming project details..."
                      rows="6"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onBlur={() => handleInputBlur('message')}
                    />
                    <AnimatePresence>
                      {errors.message && touched.message && (
                        <motion.div
                          className="field-error-wrapper"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="field-error-message">⚠️ {errors.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Send Message Pill CTA */}
                  <motion.button
                    id="contact-submit"
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                    variants={fieldVariants}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    <span className="btn-arrow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </motion.button>

                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Info Panel */}
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="contact-title">
              Let's Create <br />
              <span className="contact-title-gold">Something Extraordinary</span>
            </h2>
            <p className="contact-paragraph-desc">
              Partner with us to create premium spaces and memorable experiences. Reach out to discuss your requirements for custom exhibition stalls, trade shows, corporate gala events, interactive experience zones, brand activations, and conferences.
            </p>

            {/* Vertical Contact Details */}
            <div className="contact-details-list">

              {/* Office Address */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Office Address</span>
                  <span className="contact-detail-text-sub">Elite Eventure Studio, Goregaon East, Mumbai, Maharashtra 400063, India</span>
                </span>
              </div>

              {/* Phone / WhatsApp Numbers */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Call / WhatsApp Chat</span>
                  <span className="contact-detail-links">
                    <a
                      href="https://wa.me/917208939926?text=Hi%20Elite%20Eventure%20team,%20I%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-interactive-link whatsapp-num-link"
                    >
                      <svg className="wa-inline-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      +91 7208939926
                    </a>
                    <span className="link-separator">•</span>
                    <a
                      href="https://wa.me/917208939929?text=Hi%20Elite%20Eventure%20team,%20I%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-interactive-link whatsapp-num-link"
                    >
                      <svg className="wa-inline-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      +91 7208939929
                    </a>
                  </span>
                </span>
              </div>

              {/* Email Addresses */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Email Us</span>
                  <span className="contact-detail-links">
                    <a href="mailto:info@eliteeventure.com" className="contact-interactive-link email-link">
                      info@eliteeventure.com
                    </a>
                    <span className="link-separator">•</span>
                    <a href="mailto:sales@eliteeventure.com" className="contact-interactive-link email-link">
                      sales@eliteeventure.com
                    </a>
                  </span>
                </span>
              </div>

              {/* Working Hours */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Working Hours</span>
                  <span className="contact-detail-text-sub">Mon - Sat: 9:30 AM - 6:30 PM (Sun Closed)</span>
                </span>
              </div>

            </div>


          </motion.div>

        </div>
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
