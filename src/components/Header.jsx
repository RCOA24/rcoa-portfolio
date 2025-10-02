import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ThemeToggle from './ThemeToggle'

const Header = ({ darkMode, toggleDarkMode }) => {
  const headerRef = useRef(null)
  const navItemsRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    
    tl.from(
      navItemsRef.current,
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.3'
    )
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => scrollToSection('home')}>
          Portfolio
        </div>
        
        <ul className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
            <li
              key={item}
              ref={(el) => (navItemsRef.current[index] = el)}
            >
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {item}
              </button>
            </li>
          ))}
          <li ref={(el) => (navItemsRef.current[5] = el)}>
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </li>
        </ul>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </nav>
    </header>
  )
}

export default Header
