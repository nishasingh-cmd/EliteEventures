import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'
import GalleryShowcase from './components/GalleryShowcase/GalleryShowcase'
import OurPresence from './components/OurPresence/OurPresence'
import ExpertiseSection from './components/ExpertiseSection/ExpertiseSection'
import InteriorDesign from './components/InteriorDesign/InteriorDesign'
import BrandsSection from './components/BrandsSection/BrandsSection'
import WhyChooseSection from './components/WhyChooseSection/WhyChooseSection'
import GoogleReviews from './components/GoogleReviews/GoogleReviews'
import SectionSeparator from './components/SectionSeparator/SectionSeparator'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
import { HelmetProvider } from 'react-helmet-async'
import SEO from './components/SEO/SEO'

// Scroll-to-top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.eliteeventure.com/#webpage',
    url: 'https://www.eliteeventure.com/',
    name: 'Elite Eventure | Exhibition Stalls, Brand Activations & Corporate Events',
    description: 'Elite Eventure is a premier exhibition stall design, fabrication, and brand activation agency in Mumbai, Delhi, Bengaluru, and across India.',
    isPartOf: {
      '@id': 'https://www.eliteeventure.com/#website',
    },
    about: {
      '@id': 'https://www.eliteeventure.com/#organization',
    },
  }

  return (
    <>
      <SEO 
        title="Exhibition Stalls, Brand Activations & Corporate Events" 
        description="Elite Eventure is a premier exhibition stall design, fabrication, and brand activation agency in Mumbai, Delhi, Bengaluru, and across India. Turnkey solutions for corporate events, MICE, and custom expo booths." 
        url="/"
        keywords="exhibition stall design Mumbai, custom exhibition stands, exhibition booth fabricators, brand activations, corporate event management, MICE India, trade show stall builders, Elite Eventure"
        image="https://www.eliteeventure.com/images/contact-hero-bg.png"
        schema={homeSchema}
      />
      <main id="main-content">
        <Hero />
        <Marquee />
        <AboutSection />
        <BrandsSection />
        <ExpertiseSection />
        <InteriorDesign />
        <GalleryShowcase />
        <OurPresence />
        <WhyChooseSection hideReviews={true} />
        <GoogleReviews />
        <SectionSeparator />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function AppInner() {
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Always start at the very top on initial load
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
