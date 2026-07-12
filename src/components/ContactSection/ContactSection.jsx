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
        message: 'Message Sent Successfully!',
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
    }, 1500)
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
                  </motion.div>

                  {/* Email Address */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label className="form-field-label">Email Address *</label>
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
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div className="form-field-group" variants={fieldVariants}>
                    <label className="form-field-label">Phone Number *</label>
                    <input
                      type="tel"
                      className={`form-input-text ${errors.phone && touched.phone ? 'has-error' : ''}`}
                      placeholder="+91 99999 99999"
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
                    <label className="form-field-label">Subject</label>
                    <input
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
                    <label className="form-field-label">Message</label>
                    <textarea
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
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                    variants={fieldVariants}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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

              {/* Phone */}
              <a href="tel:+919999999999" className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Phone Numbers</span>
                  <span className="contact-detail-text-sub">+91 99999 99999 / +91 98888 88888</span>
                </span>
              </a>

              {/* Email */}
              <a href="mailto:hello@eliteeventure.in" className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="contact-detail-text">
                  <span className="contact-detail-text-bold">Email</span>
                  <span className="contact-detail-text-sub">hello@eliteeventure.in</span>
                </span>
              </a>

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

            {/* Premium WhatsApp Button */}
            <a 
              href="https://wa.me/919999999999?text=Hi%20Elite%20Eventure%20team,%20I%20would%20like%20to%20discuss%20an%20event/exhibition%20project." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-btn-luxury"
            >
              <svg className="whatsapp-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.733-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.903 1.48 5.383 0 9.766-4.38 9.77-9.761.002-2.608-1.012-5.06-2.857-6.907C16.62 2.12 14.167.996 11.95.996 6.566.996 2.183 5.376 2.18 10.757c-.001 1.702.469 3.366 1.361 4.821L2.517 21.05l5.13-1.346-.1-1.05zM17.65 14.91c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.77.98-.95 1.18-.18.2-.35.23-.65.08-1.02-.52-1.73-.91-2.42-1.51-.55-.48-.9-.98-1.07-1.28-.17-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.68-.52-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.07 1.05-1.07 2.56s1.09 2.97 1.24 3.17c.15.2 2.15 3.29 5.21 4.61.73.31 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.43-.08-.13-.28-.21-.58-.36z"/>
              </svg>
              Chat on WhatsApp
            </a>
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
