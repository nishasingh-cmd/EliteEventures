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
  return (
    <>
      <SEO 
        title="Exhibition Stalls & Brand Activations" 
        description="Elite Eventure designs and builds premium exhibition stalls, brand activations, corporate events, and MICE experiences globally." 
        url="/" 
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
