import { useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/hero/Hero'
import ImpactStats from './components/hero/ImpactStats'
import ProjectsSection from './components/projects/ProjectsSection'
import ExperienceSection from './components/experience/ExperienceSection'
import CapabilitiesSection from './components/capabilities/CapabilitiesSection'
import RecognitionSection from './components/recognition/RecognitionSection'
import AboutSection from './components/about/AboutSection'
import ContactSection from './components/contact/ContactSection'
import Footer from './components/layout/Footer'

function App() {
  useEffect(() => {
    if (!window.location.hash) return undefined

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1))
      target?.scrollIntoView({ block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <ImpactStats />
        <ProjectsSection />
        <ExperienceSection />
        <CapabilitiesSection />
        <RecognitionSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
