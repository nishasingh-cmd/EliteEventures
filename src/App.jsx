import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'
import Gallery from './components/Gallery/Gallery'
import GalleryShowcase from './components/GalleryShowcase/GalleryShowcase'
import ExpertiseSection from './components/ExpertiseSection/ExpertiseSection'
import BrandsSection from './components/BrandsSection/BrandsSection'
import WhyChooseSection from './components/WhyChooseSection/WhyChooseSection'
import SectionSeparator from './components/SectionSeparator/SectionSeparator'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <main id="main-content">
        <Hero />
        <Marquee />
        <AboutSection />
        <Gallery />
        <GalleryShowcase />
        <ExpertiseSection />
        <BrandsSection />
        <WhyChooseSection />
        <SectionSeparator />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
