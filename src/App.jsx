// src/App.jsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './index.css' // or ./App.css depending on your setup
import VideoScrollHero from './components/VideoScrollHero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // smooth cubic ease-out
      smooth: true,
      smoothTouch: true
    })

    // Tell ScrollTrigger to use Lenis as the "scroller"
    // We proxy documentElement (html). If your site uses a different scroller change accordingly.
    const scroller = document.scrollingElement || document.documentElement

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          // set
          lenis.scrollTo(value)
        }
        // get
        return scroller.scrollTop
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      // If you use transforms to pin, use transform, otherwise fixed is fine.
      pinType: scroller.style.transform ? 'transform' : 'fixed'
    })

    // RAF loop — drive Lenis and update ScrollTrigger each frame
    let rafId = null
    function raf(time) {
      lenis.raf(time)
      // keep ScrollTrigger in sync
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // When the window is resized or content changes, refresh ScrollTrigger
    const onResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    // initial refresh after setup
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <VideoScrollHero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
