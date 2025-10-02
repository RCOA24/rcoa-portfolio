import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    tl.fromTo(titleRef.current.children, {
      y: 120,
      opacity: 0,
    }, {
      y: -150,
      opacity: 0.3,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power4.out',
    })
    .to(subtitleRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '<')
    .to(buttonRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '<')
    .to(backgroundRef.current, {
      scale: 1.2,
      ease: 'none',
    }, '<')

  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 transition-transform"
        style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 0%, #6366f1 50%, #4f46e5 100%)' }}
      />
      <div className="container mx-auto text-center relative z-10 px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-8 text-gray-900 dark:text-white leading-tight"
        >
          <span className="block opacity-90">Hello, I'm</span>
          <span className="block gradient-text mt-4">Your Name</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-light"
        >
          Full Stack Developer | Creative Problem Solver | Tech Enthusiast
        </p>
        <button
          ref={buttonRef}
          onClick={scrollToProjects}
          className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-lg"
        >
          View My Work
        </button>
      </div>
    </section>
  )
}

export default Hero
