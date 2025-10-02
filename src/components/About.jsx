import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.batch([titleRef.current, contentRef.current, imageRef.current], {
      onEnter: (batch) => {
        batch.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
          )
        })
      },
      start: 'top 80%',
      once: true,
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding min-h-screen bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold text-center mb-12 gradient-text"
        >
          About Me
        </h2>
        <div
          ref={contentRef}
          className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          <p>
            I'm a passionate full-stack developer passionate about building beautiful,
            functional, and user-friendly digital experiences.
          </p>
          <p>
            Experienced in React, Node.js, Tailwind CSS, and more, I turn ideas into
            high-quality software products.
          </p>
          <p>Coding is my craft. Excellence is my goal.</p>
        </div>
        <div ref={imageRef} className="flex justify-center">
          <div className="w-72 h-72 rounded-xl bg-gradient-to-br from-blue-500 to-purple-700 shadow-2xl flex items-center justify-center text-white text-7xl font-bold select-none">
            YN
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
