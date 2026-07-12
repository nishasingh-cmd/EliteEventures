import React from 'react'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'
import Gallery from './components/Gallery/Gallery'
import ExpertiseSection from './components/ExpertiseSection/ExpertiseSection'
import BrandsSection from './components/BrandsSection/BrandsSection'
import WhyChooseSection from './components/WhyChooseSection/WhyChooseSection'
import SectionSeparator from './components/SectionSeparator/SectionSeparator'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      <Gallery />
      <ExpertiseSection />
      <BrandsSection />
      <WhyChooseSection />
      <SectionSeparator />
      <ContactSection />
      <Footer />
    </>
  )
}

export default App
