import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })

    gsap.fromTo(formRef.current, { opacity: 0, scale: 0.9, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out' })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted! This is a demo')
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-16 text-center gradient-text">
          Get In Touch
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            required
          />
          <textarea
            placeholder="Your message"
            rows="6"
            className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 rounded-lg text-white font-bold text-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
