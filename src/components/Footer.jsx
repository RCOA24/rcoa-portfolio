import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Footer = () => {
  const footerRef = useRef(null)
  const contentRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef([])
  const socialRef = useRef([])
  const floatingRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Links stagger animation
      gsap.fromTo(
        linksRef.current.filter(el => el),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Social icons animation
      gsap.fromTo(
        socialRef.current.filter(el => el),
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
          }
        }
      )

      // Floating orbs animation
      floatingRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: '+=30',
            x: index === 0 ? '+=20' : '-=20',
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: false },
      ease: 'power2.inOut'
    })
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80, autoKill: false },
        ease: 'power2.inOut'
      })
    }
  }

  return (
    <footer ref={footerRef} className="relative bg-black overflow-hidden border-t border-white/5">
      {/* Magnetic Orb Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black"></div>
        <div
          ref={(el) => (floatingRef.current[0] = el)}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"
        ></div>
        <div
          ref={(el) => (floatingRef.current[1] = el)}
          className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-bl from-blue-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
        ></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Navigation Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-10">
          {/* Logo & Tagline */}
          <div ref={logoRef} className="flex-shrink-0 text-center lg:text-left">
            <h3 className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-tight">
              Rodney Austria
            </h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
              Turning Data into Decisions
            </p>
          </div>

          {/* Navigation Links - Hero Style */}
          <nav className="flex-1 max-w-3xl">
            <ul className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
                <li key={item} ref={(el) => (linksRef.current[index] = el)}>
                  <a
                    href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                    onClick={(e) => {
                      if (item === 'Home') {
                        e.preventDefault()
                        scrollToTop()
                      } else {
                        scrollToSection(e, item.toLowerCase())
                      }
                    }}
                    className="group relative text-white font-medium text-sm tracking-wide transition-all hover:text-purple-400"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to Top - Floating Icon */}
          <button
            onClick={scrollToTop}
            className="group flex-shrink-0 relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/20 transition-all duration-300"></div>
          </button>
        </div>

        {/* Divider with Gradient Glow */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
        </div>

        {/* Bottom Meta Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Tech Stack */}
          <div className="flex items-center gap-8 text-slate-600 text-xs">
            <p className="font-medium">© 2025 Rodney Austria</p>
           
          </div>

          {/* Social Icons - Minimalist */}
          <div className="flex items-center gap-3">
            {[
              { 
                name: 'GitHub', 
                href: 'https://github.com/RCOA24',
                path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z'
              },
              { 
                name: 'LinkedIn', 
                href: 'https://www.linkedin.com/in/rodney-austria-/',
                path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
              },
              { 
              name: 'Gmail', 
              href: 'https://mail.google.com/mail/?view=cm&to=rodneycharlesaustria1124@gmail.com',
              path: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
            }
            ].map((social, index) => (
              <a
                key={social.name}
                ref={(el) => (socialRef.current[index] = el)}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 rounded-full border border-white/5 backdrop-blur-sm flex items-center justify-center hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
