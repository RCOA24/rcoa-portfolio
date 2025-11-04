import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const carouselRef = useRef(null)
  const modalRef = useRef(null)
  const galleryRef = useRef(null)
  const imagePreviewRef = useRef(null)

  const [activeProject, setActiveProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previewImage, setPreviewImage] = useState(null)

  const projects = [
    {
      name: "TyphoGuard",
      image: "/images/ProjectImages/TyphoGuard/TyphoGuard.png",
      tech: ["Laravel", "Tailwind CSS", "Alpine.js","Nominatim","leaflet.js", "Mapbox", "Docker","Open Source Api"],
      metrics: "Live",
      link: "https://typhoguard.onrender.com/",
      description:
        "A modern online Real-time weather, tide, and dam monitoring platform for the Philippines. Built with Laravel 11, Tailwind CSS, and powered by public environmental APIs including PAG-ASA, Tomorrow.io, and WeatherAPI.",
      images: ["/images/ProjectImages/TyphoGuard/Dashboard.png", "/images/ProjectImages/TyphoGuard/DamWaterLevel.png", "/images/ProjectImages/TyphoGuard/Tides.png"],
      category: "Website Application",
    },
    {
      name: "Barangay Management Information System (BMIS)",
      image:"/images/ProjectImages/BMIS/BMISThumbnail.png",
      tech: ["MYSQL", "XAMMP", "JavaScript", "PHP", "CodeIgniter", "Twilio", "OpenStreetMap", "Google Earth Pro", "Bootstrap CSS"],
      metrics: "Video Walkthrough Available",
      link: "https://youtu.be/24sDilnbSVQ",
      description: "A modern web-based barangay management system built with PHP and CodeIgniter. Features resident data management, automated document issuance, SMS announcements, and geospatial mapping for efficient local governance.",
      images: ["/images/ProjectImages/BMIS/BMISDashboard.png", "/images/ProjectImages/BMIS/BMISClearance.png", "/images/ProjectImages/BMIS/BMISsms.png"],
      category: "Enterprise Website Application", 
    },
    {
      name: "Striven",
      image: "/images/ProjectImages/Striven/StrivenThumbnail.png",
      tech: ["React", "Dexie.js", "Vite", "Tailwind CSS", "IndexedDB", "PWA", "Capacitor", "Generic Sensor API", "WebRTC", "Cordova-Plugin-IosRTC", "AI Food Recognition API"],
      metrics: "Live",
      link: "https://striven.netlify.app/",
      description:
        "A modern, privacy-focused fitness step-tracking PWA built with React, Vite, and Tailwind CSS. Features real-time metrics, offline support, device sensor integration, and cross-platform installability. Expanding to include AI-assisted nutrition logging, exercise library, and planned native iOS/Android releases.",
      images: ["/images/ProjectImages/Striven/StrivenLaptopLandscape.png", "/images/ProjectImages/Striven/StrivenIpadLandscape.png", "/images/ProjectImages/Striven/StrivenCP.png"],
      category: "Fitness & Health",
      status: "development",
    },
  ]

  /* ------------------------------------------------------------------ */
  /* -------------------------- ANIMATIONS ---------------------------- */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ------------------------------------------------------------------ */
  /* -------------------------- CAROUSEL ----------------------------- */
  /* ------------------------------------------------------------------ */
  const goToSlide = (index) => {
    if (index < 0 || index >= projects.length) return
    setCurrentIndex(index)
    const carousel = carouselRef.current
    if (carousel) {
      const slideWidth = carousel.offsetWidth
      gsap.to(carousel, { scrollLeft: slideWidth * index, duration: 0.8, ease: "power3.out" })
    }
  }

  const nextSlide = () => goToSlide((currentIndex + 1) % projects.length)
  const prevSlide = () => goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1)

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  /* ------------------- drag / swipe handling -------------------- */
  useEffect(() => {
    if (!carouselRef.current) return
    const el = carouselRef.current

    let touchStartX = 0, touchStartY = 0, scrollStart = 0, isSwiping = false, swipeDir = null

    const touchStart = (e) => {
      if (e.target.closest('button, a, img')) return
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      scrollStart = el.scrollLeft
      isSwiping = false
      swipeDir = null
    }
    const touchMove = (e) => {
      if (!touchStartX) return
      const dx = touchStartX - e.touches[0].clientX
      const dy = touchStartY - e.touches[0].clientY
      if (!swipeDir) {
        if (Math.abs(dx) > Math.abs(dy) * 2 && Math.abs(dx) > 10) { swipeDir = 'h'; isSwiping = true }
        else if (Math.abs(dy) > 5) swipeDir = 'v'
      }
      if (swipeDir === 'h' && isSwiping) {
        e.preventDefault()
        el.scrollLeft = scrollStart + dx
      }
    }
    const touchEnd = (e) => {
      if (isSwiping && swipeDir === 'h') {
        const dx = touchStartX - e.changedTouches[0].clientX
        const threshold = el.offsetWidth * 0.15
        if (Math.abs(dx) > threshold) dx > 0 ? nextSlide() : prevSlide()
        else goToSlide(currentIndex)
      }
      touchStartX = 0; touchStartY = 0; isSwiping = false; swipeDir = null
    }

    let mouseDown = false, mouseStartX = 0, mouseScroll = 0, dragged = false, dragThresh = 5
    const mouseDownHandler = (e) => {
      if (e.target.closest('button, a, img')) return
      mouseDown = true; dragged = false
      mouseStartX = e.pageX; mouseScroll = el.scrollLeft
      el.style.cursor = "grabbing"
    }
    const mouseMoveHandler = (e) => {
      if (!mouseDown) return
      const dist = Math.abs(e.pageX - mouseStartX)
      if (dist > dragThresh) {
        e.preventDefault()
        dragged = true
        const walk = (mouseStartX - e.pageX) * 1.5
        el.scrollLeft = mouseScroll + walk
      }
    }
    const mouseUpHandler = () => {
      if (mouseDown) {
        mouseDown = false; el.style.cursor = "default"
        if (dragged) {
          const slideW = el.offsetWidth
          setCurrentIndex(Math.round(el.scrollLeft / slideW))
        }
      }
    }

    el.addEventListener("touchstart", touchStart, { passive: true })
    el.addEventListener("touchmove", touchMove, { passive: false })
    el.addEventListener("touchend", touchEnd, { passive: true })
    el.addEventListener("mousedown", mouseDownHandler)
    el.addEventListener("mousemove", mouseMoveHandler)
    el.addEventListener("mouseup", mouseUpHandler)
    el.addEventListener("mouseleave", mouseUpHandler)

    return () => {
      el.removeEventListener("touchstart", touchStart)
      el.removeEventListener("touchmove", touchMove)
      el.removeEventListener("touchend", touchEnd)
      el.removeEventListener("mousedown", mouseDownHandler)
      el.removeEventListener("mousemove", mouseMoveHandler)
      el.removeEventListener("mouseup", mouseUpHandler)
      el.removeEventListener("mouseleave", mouseUpHandler)
    }
  }, [currentIndex])

  /* ------------------------------------------------------------------ */
  /* -------------------------- MODAL / PREVIEW ---------------------- */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (activeProject) {
      gsap.fromTo(modalRef.current, { opacity: 0, y: 100, scale: .95 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: "power3.out" })
    }
  }, [activeProject])

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0, y: 100, scale: .95, duration: .4, ease: "power2.in",
      onComplete: () => setActiveProject(null)
    })
  }

  const openImagePreview = (src) => {
    setPreviewImage(src)
    gsap.fromTo(imagePreviewRef.current, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .4, ease: "power3.out" })
  }
  const closeImagePreview = () => {
    gsap.to(imagePreviewRef.current, {
      opacity: 0, scale: .8, duration: .3, ease: "power2.in",
      onComplete: () => setPreviewImage(null)
    })
  }

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") { if (previewImage) closeImagePreview(); else if (activeProject) closeModal() } }
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [previewImage, activeProject])

  /* ------------------------------------------------------------------ */
  /* --------------------------- RENDER ------------------------------- */
  /* ------------------------------------------------------------------ */
  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-12 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>

      <div className="relative z-10 text-center mb-8 md:mb-12 px-6">
        <h2 ref={titleRef} className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p ref={subtitleRef} className="mt-4 md:mt-6 text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-light">
          Integrating front-end design, dynamic interactions, and robust back-end engineering to deliver engaging, high-performing web applications that drive results.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative min-h-[600px] md:min-h-[500px]">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", cursor: "default" }}
          >
            {projects.map((project, i) => (
              <div key={project.name} className="flex-shrink-0 w-full snap-center px-2 md:px-4">
                {/* CARD */}
                <div className="group rounded-2xl md:rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-2xl hover:border-slate-600/80 transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] mx-auto max-w-5xl h-full">
                  <div className="grid md:grid-cols-2 gap-0 h-full md:min-h-[24rem] relative">

                    {/* IMAGE COLUMN – FULL IMAGE (NO CROPPING) */}
                    <div
                      className="relative h-auto md:h-full bg-slate-900 cursor-pointer overflow-hidden transition-transform duration-700 group-hover:scale-105 transform-gpu"
                      onClick={() => openImagePreview(project.image)}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-contain select-none"
                        draggable="false"
                      />

                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
                        <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                          {project.category}
                        </span>
                      </div>

                      {/* IN DEVELOPMENT BADGE */}
                      {project.status === "development" && (
                        <div 
                          className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
                          aria-label="This project is in active development"
                        >
                          <div className="relative group/badge">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-md opacity-70 group-hover/badge:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                            <span className="relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-black bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg border border-yellow-200/50 backdrop-blur-sm flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                              </span>
                              In Development
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Project Number */}
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 pointer-events-none">
                        <div className="text-white/40 text-5xl md:text-7xl font-black leading-none group-hover:text-white/60 transition-colors duration-500 select-none">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* INFO COLUMN */}
                    <div className="p-6 md:p-10 flex flex-col justify-center relative z-0">
                      <h3 className="text-2xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 mb-3 md:mb-4">
                        {project.name}
                      </h3>

                      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {project.tech.map(t => (
                          <span key={t} className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/50">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-green-400 text-xs md:text-sm font-semibold">{project.metrics}</span>
                        </div>

                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveProject(project) }}
                          className="ml-auto px-4 py-2 md:px-6 md:py-2.5 rounded-xl bg-gradient-to-r from-yellow-500/80 to-amber-600/80 hover:from-yellow-400 hover:to-amber-500 text-white text-xs md:text-sm font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 cursor-pointer z-10 relative"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide() }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide() }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === currentIndex
                  ? "w-6 h-1.5 md:w-8 md:h-2 bg-gradient-to-r from-yellow-400 to-amber-500"
                  : "w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* -------------------------- MODAL -------------------------- */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" onClick={closeModal}>
          <div ref={modalRef} className="relative max-w-4xl w-full rounded-3xl border border-slate-700 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 p-6 md:p-8 text-center text-white shadow-2xl my-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {activeProject.name}
            </h3>

            {activeProject.status === "development" && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                  In Active Development
                </span>
              </div>
            )}

            {/* MODAL GALLERY – BIG ON MOBILE */}
            <div className="relative mb-6">
              <div 
                ref={galleryRef}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-3 md:gap-4 px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", cursor: "grab" }}
              >
                {activeProject.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="snap-center flex-shrink-0 w-full max-w-[90vw] md:max-w-md h-auto rounded-2xl overflow-hidden border border-slate-700/60 hover:border-yellow-500/50 transition-all duration-300 bg-slate-900/50 group cursor-pointer relative"
                    onClick={() => openImagePreview(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${activeProject.name} screenshot ${idx + 1}`} 
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none" 
                      draggable="false" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px] pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-400/30 flex items-center justify-center">
                        <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop arrows */}
              {activeProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); galleryRef.current.scrollBy({ left: -300, behavior: 'smooth' }) }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-white hover:bg-slate-700 transition-all duration-300 hidden md:flex items-center justify-center shadow-lg"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); galleryRef.current.scrollBy({ left: 300, behavior: 'smooth' }) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-white hover:bg-slate-700 transition-all duration-300 hidden md:flex items-center justify-center shadow-lg"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="text-left max-w-2xl mx-auto mt-6">
              <p className="text-slate-300 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {activeProject.tech.map(t => (
                  <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-slate-800/60 text-slate-300 text-xs md:text-sm font-medium border border-slate-700/50">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-xs md:text-sm font-semibold">{activeProject.metrics}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-xs md:text-sm">{activeProject.category}</span>
              </div>
            </div>

            <button onClick={() => window.open(activeProject.link, "_blank")} className="mt-4 px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold shadow-lg hover:scale-105 transition-transform text-sm md:text-base cursor-pointer">
              View Live Demo
            </button>

            <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800/60 hover:bg-red-600 text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center text-xl font-light cursor-pointer" aria-label="Close modal">
              X
            </button>
          </div>
        </div>
      )}

      {/* -------------------------- IMAGE PREVIEW (LARGE) -------------------------- */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 md:p-8" onClick={closeImagePreview}>
          <div ref={imagePreviewRef} className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeImagePreview} 
              className="absolute top-4 right-4 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-110 cursor-pointer"
              aria-label="Close preview"
            >
              <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-gradient-to-br from-slate-900 via-slate-950 to-black p-3 md:p-6 w-full h-full flex items-center justify-center">
              <img 
                src={previewImage} 
                alt="Full preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none" 
                draggable="false" 
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-300 text-sm font-medium pointer-events-none">
              Tap to close
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects