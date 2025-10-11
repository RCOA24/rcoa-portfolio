import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const formContainerRef = useRef(null)
  const cardRef = useRef(null)
  const floatingRef = useRef([])
  const inputRefs = useRef([])
  
  const [focusedInput, setFocusedInput] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 80 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.2, 
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      )

      gsap.fromTo(
        inputRefs.current,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          stagger: 0.15,
          delay: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 70%',
          }
        }
      )

      floatingRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: '+=30',
            rotation: '+=10',
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    gsap.to(formContainerRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert('Message sent! This is a demo.')
        setFormData({ name: '', email: '', message: '' })
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div
        ref={(el) => (floatingRef.current[0] = el)}
        className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
      ></div>
      <div
        ref={(el) => (floatingRef.current[1] = el)}
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      ></div>
      <div
        ref={(el) => (floatingRef.current[2] = el)}
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"
      ></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Let's Connect
          </h2>
          <p
            ref={subtitleRef}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </div>

        {/* Form Card */}
        <div ref={cardRef} className="relative max-w-3xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 transition duration-1000"></div>
          
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-2xl rounded-3xl border border-slate-800/50 p-8 md:p-12 shadow-2xl">
            <div ref={formContainerRef} className="space-y-8">
              {/* Name Input */}
              <div ref={(el) => (inputRefs.current[0] = el)} className="relative group">
                <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full px-6 py-4 bg-slate-950/50 border-2 border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all duration-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="John Doe"
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${focusedInput === 'name' ? 'w-full' : 'w-0'}`}></div>
              </div>

              {/* Email Input */}
              <div ref={(el) => (inputRefs.current[1] = el)} className="relative group">
                <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full px-6 py-4 bg-slate-950/50 border-2 border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all duration-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="john@example.com"
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${focusedInput === 'email' ? 'w-full' : 'w-0'}`}></div>
              </div>

              {/* Message Input */}
              <div ref={(el) => (inputRefs.current[2] = el)} className="relative group">
                <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                  rows={6}
                  className="w-full px-6 py-4 bg-slate-950/50 border-2 border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="Tell me about your project..."
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${focusedInput === 'message' ? 'w-full' : 'w-0'}`}></div>
              </div>

              {/* Submit Button */}
              <div ref={(el) => (inputRefs.current[3] = el)}>
                <button
                  onClick={handleSubmit}
                  className="group relative w-full py-5 px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
              <a href="https://mail.google.com/mail/?view=cm&to=rodneycharlesaustria1124@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                rodneycharlesaustria1124@gmail.com
              </a>
             <a href="https://www.linkedin.com/in/rodney-austria-/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Rodney Austria
            </a>
              <a href="https://github.com/RCOA24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                RCOA24
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact