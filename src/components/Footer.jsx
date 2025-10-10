import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
        linksRef.current,
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
        socialRef.current,
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

      // Floating elements
      floatingRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: '+=20',
            duration: 2 + index * 0.5,
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(76,29,149,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(29,78,216,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div
        ref={(el) => (floatingRef.current[0] = el)}
        className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"
      ></div>
      <div
        ref={(el) => (floatingRef.current[1] = el)}
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
      ></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <div ref={logoRef}>
              <h3 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                YourBrand
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                Crafting extraordinary digital experiences that blend cutting-edge design with powerful engineering.
              </p>
              
              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <span className="font-medium">Back to Top</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
                <li key={item} ref={(el) => (linksRef.current[index] = el)}>
                  <a
                    href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                    onClick={(e) => {
                      if (item === 'Home') {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Skills */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Expertise</h4>
            <ul className="space-y-3">
              {['Web Development', 'UI/UX Design', 'Brand Identity', 'Consulting'].map((item, index) => (
                <li key={item} ref={(el) => (linksRef.current[index + 4] = el)}>
                  <span className="text-slate-400 text-sm inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get the latest updates and insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-slate-500 text-sm">
            <p>© 2025 YourBrand. Built with passion using React, Vite, Tailwind & GSAP.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { 
                name: 'GitHub', 
                href: 'https://github.com',
                path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
              },
              { 
                name: 'LinkedIn', 
                href: 'https://linkedin.com',
                path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
              },
              { 
                name: 'Twitter', 
                href: 'https://twitter.com',
                path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
              },
              { 
                name: 'Dribbble', 
                href: 'https://dribbble.com',
                path: 'M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-7.234.947-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z'
              }
            ].map((social, index) => (
              <a
                key={social.name}
                ref={(el) => (socialRef.current[index] = el)}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-purple-500 transition-all hover:scale-110"
                aria-label={social.name}
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
                <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  )
}

export default Footer