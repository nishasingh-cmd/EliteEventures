import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brand: '',
    eventDetails: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Auto-dismiss toast notifier
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const validateField = (name, val) => {
    let error = ''
    switch (name) {
      case 'fullName':
        if (!val.trim()) error = 'Name is required'
        break
      case 'email':
        if (!val.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Invalid email address'
        break
      case 'phone':
        if (!val.trim()) error = 'Phone number is required'
        break
      case 'eventDetails':
        if (!val.trim()) error = 'Event details are required'
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

    // Validate all fields
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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '2d6657bb-8ff5-408c-bfd3-0d3319be55d6',
          to_email: 'info@eliteeventure.com',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'N/A',
          subject: formData.brand ? `Brief from ${formData.brand}` : 'New Contact Page Brief',
          message: `Brand/Company: ${formData.brand || 'N/A'}\n\nEvent Details:\n${formData.eventDetails}`,
          submission_date_time: new Date().toLocaleString(),
          from_name: 'Elite Eventure Contact Page Brief Form',
        }),
      })

      const data = await response.json()
      setIsSubmitting(false)

      if (data.success || response.ok) {
        setToast({
          show: true,
          message: "Thank you! Your brief has been submitted successfully. We'll contact you shortly.",
        })
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          brand: '',
          eventDetails: '',
        })
        setErrors({})
        setTouched({})
      } else {
        setToast({
          show: true,
          message: 'Submission failed. Please try again or reach us directly.',
        })
      }
    } catch (error) {
      setIsSubmitting(false)
      setToast({
        show: true,
        message: 'Something went wrong. Please check your network or contact us directly.',
      })
    }
  }

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero with exact text matching the screenshot but original layout */}
      <section className="contact-hero">
        <img
          src="/images/contact-hero-bg.png"
          alt="Contact Elite Eventure"
          className="contact-hero-img"
        />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-line" />

        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="contact-hero-heading">
            Contact <span className="contact-hero-gold">Us</span>
          </h1>
        </motion.div>
      </section>

      {/* Content Form & Cards Section below Hero */}
      <main className="contact-main">
        <motion.div
          className="contact-main-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="contact-main-heading">
            Let's make something <span className="contact-main-gold">unforgettable.</span>
          </h2>
          <p className="contact-main-sub">
            Tell us about the event, the brand, and the moment you want to create.
          </p>
        </motion.div>

        <div className="contact-layout-container">
          
          {/* Left Column - Send us a brief Form */}
          <motion.div 
            className="contact-form-card-wrap"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-form-header">
              <h3>Send us a brief</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact-brief-form">
              <div className="contact-form-row">
                
                {/* Name */}
                <div className="contact-input-group">
                  <label>NAME</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onBlur={() => handleInputBlur('fullName')}
                    className={errors.fullName && touched.fullName ? 'has-error' : ''}
                  />
                  {errors.fullName && touched.fullName && (
                    <span className="error-tip">{errors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="contact-input-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    placeholder="you@brand.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleInputBlur('email')}
                    className={errors.email && touched.email ? 'has-error' : ''}
                  />
                  {errors.email && touched.email && (
                    <span className="error-tip">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="contact-form-row">
                
                {/* Phone */}
                <div className="contact-input-group">
                  <label>PHONE</label>
                  <input
                    type="tel"
                    placeholder="+91 ..."
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => handleInputBlur('phone')}
                    className={errors.phone && touched.phone ? 'has-error' : ''}
                  />
                  {errors.phone && touched.phone && (
                    <span className="error-tip">{errors.phone}</span>
                  )}
                </div>

                {/* Brand / Company */}
                <div className="contact-input-group">
                  <label>BRAND / COMPANY</label>
                  <input
                    type="text"
                    placeholder="Brand name"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="contact-input-group full-width">
                <label>EVENT DETAILS</label>
                <textarea
                  placeholder="Which event, dates, footprint, any references..."
                  rows="6"
                  value={formData.eventDetails}
                  onChange={(e) => handleInputChange('eventDetails', e.target.value)}
                  onBlur={() => handleInputBlur('eventDetails')}
                  className={errors.eventDetails && touched.eventDetails ? 'has-error' : ''}
                />
                {errors.eventDetails && touched.eventDetails && (
                  <span className="error-tip">{errors.eventDetails}</span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="contact-brief-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                <svg className="send-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* Right Column - Info Cards (Reach Us directly, Follow us, Map) */}
          <div className="contact-cards-column">
            
            {/* Card 1: Reach Us Directly (Solid Yellow Gold Card) */}
            <motion.div 
              className="direct-reach-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>Reach us directly</h3>
              
              <div className="reach-row-list">
                <a href="tel:+917208939926" className="reach-row-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="reach-icon">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 7208939926</span>
                </a>

                <a href="mailto:info@eliteeventure.com" className="reach-row-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="reach-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>info@eliteeventure.com</span>
                </a>

                <div className="reach-row-item static">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="reach-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Mumbai · Delhi · Bengaluru</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Follow Us (Dark Box with round outlined social circles) */}
            <motion.div 
              className="follow-us-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>Follow us</h3>
              <div className="follow-social-circles">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Card 3: Embedded Google Map */}
            <motion.div 
              className="contact-map-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <iframe
                title="Elite Eventure Goregaon East Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4907106093556!2d72.85966607598858!3d19.173770449557434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9d6eb34fcf1%3A0xb351efbe7c47d812!2sGoregaon%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </div>
        </div>
      </main>

      {/* Submission Toast Notifier */}
      <AnimatePresence>
        {toast.show && (
          <div className="contact-page-toast-container">
            <motion.div
              className="contact-page-toast"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="toast-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>{toast.message}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
