import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  const toggleRef = useRef(null)
  const circleRef = useRef(null)
  const moonRef = useRef(null)
  const sunRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    if (darkMode) {
      tl.to(circleRef.current, {
        x: 28,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(moonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, '-=0.2')
      .to(sunRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      }, '-=0.2')
    } else {
      tl.to(circleRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(sunRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, '-=0.2')
      .to(moonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      }, '-=0.2')
    }
  }, [darkMode])

  return (
    <button
      ref={toggleRef}
      onClick={toggleDarkMode}
      className="relative w-16 h-8 rounded-full bg-gray-300 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Toggle dark mode"
    >
      <div
        ref={circleRef}
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center"
      >
        <svg
          ref={sunRef}
          className="w-4 h-4 text-yellow-500 absolute"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          ref={moonRef}
          className="w-4 h-4 text-slate-700 absolute opacity-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  )
}

export default ThemeToggle
