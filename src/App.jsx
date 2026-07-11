import React from 'react'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import AboutSection from './components/AboutSection/AboutSection'

function App() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      {/* Subsequent sections will be added here section by section */}
    </>
  )
}

export default App
