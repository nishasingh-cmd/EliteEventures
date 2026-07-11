import React from 'react'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'
import Gallery from './components/Gallery/Gallery'

function App() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      <Gallery />
      {/* Subsequent sections will be added here section by section */}
    </>
  )
}

export default App
