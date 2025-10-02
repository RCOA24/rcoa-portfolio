import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Smooth fade and slide up (Timothy Ricks style)
export const fadeInUpSmooth = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Parallax effect - moves at different speeds
export const parallaxEffect = (element, speed = 0.5, direction = 'vertical') => {
  const movement = direction === 'vertical' ? { y: -100 * speed } : { x: -100 * speed }
  
  gsap.to(element, {
    ...movement,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
}

// Scale and fade reveal
export const scaleReveal = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.85,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    }
  )
}

// Smooth opacity reveal (minimal style)
export const fadeInOpacity = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1,
      },
    }
  )
}

// Stagger with smooth reveal
export const staggerSmooth = (elements, delay = 0) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    }
  )
}

// Pin section while animating (advanced effect)
export const pinSection = (element, animation) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
    animation: animation,
  })
}

// Image reveal with clip-path
export const clipReveal = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.5,
      delay,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 35%',
        scrub: 1,
      },
    }
  )
}

// Text reveal by words
export const textRevealByWords = (element, delay = 0) => {
  const words = element.querySelectorAll('.word')
  
  gsap.fromTo(
    words,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 0.5,
      },
    }
  )
}
