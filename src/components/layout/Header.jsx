import { useEffect, useRef, useState } from 'react'
import Container from './Container'
import ThemeToggle from './ThemeToggle'
import { site } from '../../data/site'

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

// Tracks which primary section sits in the reading zone so the matching nav link can be marked current.
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target
          if (entry.isIntersecting) setActiveId(id)
          // Clear the marker when its section leaves the reading zone (e.g. back up in the hero).
          else setActiveId((current) => (current === id ? null : current))
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

const sectionIds = navigation.map((item) => item.href.slice(1))

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const mobileNavRef = useRef(null)
  const headerActionsRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    if (isOpen) firstLinkRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }

      if (event.key === 'Tab' && isOpen) {
        // Visible header controls (theme toggle, resume link at tablet widths, menu button) stay reachable.
        const headerControls = [...headerActionsRef.current.querySelectorAll('a, button')].filter((element) => element.offsetParent !== null)
        const focusable = [...headerControls, ...mobileNavRef.current.querySelectorAll('a, button')]
        const first = focusable[0]
        const last = focusable.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    const closeAtDesktop = () => {
      if (window.innerWidth >= 820) setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', closeAtDesktop)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', closeAtDesktop)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <Container className="header-inner">
        <a className="brand" href="#top" aria-label="Rodney Austria, back to top" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/RA-favicon.png" alt="" width="128" height="128" />
          </span>
          <span className="brand-name">Rodney Austria</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              className="nav-link"
              href={item.href}
              key={item.href}
              aria-current={activeId === item.href.slice(1) ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions" ref={headerActionsRef}>
          <ThemeToggle />
          <a className="resume-link" href={site.resumeUrl} target="_blank" rel="noreferrer">Resume ↗</a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <nav ref={mobileNavRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!isOpen}>
        {navigation.map((item, index) => (
          <a ref={index === 0 ? firstLinkRef : undefined} className="nav-link" href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="button-link button-primary mobile-resume" href={site.resumeUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
          View resume <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
