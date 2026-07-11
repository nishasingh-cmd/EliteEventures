import React from 'react'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'
import Gallery from './components/Gallery/Gallery'
import ExpertiseSection from './components/ExpertiseSection/ExpertiseSection'
import BrandsSection from './components/BrandsSection/BrandsSection'
import WhyChooseSection from './components/WhyChooseSection/WhyChooseSection'

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
      {/* Subsequent sections will be added here section by section */}
    </>
  )
}

export default App
