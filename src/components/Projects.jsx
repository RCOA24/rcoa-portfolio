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
        "A modern online sReal-time weather, tide, and dam monitoring platform for the Philippines. Built with Laravel 11, Tailwind CSS, and powered by public environmental APIs including PAG-ASA, Tomorrow.io, and WeatherAPI.",
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
    // {
    //   name: "AI Chat Application",
    //   image: "/images/ai-chat-preview.png",
    //   tech: ["React", "OpenAI", "WebSocket"],
    //   metrics: "1M+ messages",
    //   link: "https://your-ai-chat-demo.com",
    //   description:
    //     "An interactive chat experience powered by OpenAI, enabling natural, dynamic, and engaging real-time AI conversations.",
    //   images: ["/images/ai-1.png", "/images/ai-2.png", "/images/ai-3.png"],
    //   category: "AI/ML",
    // },
    // {
    //   name: "Social Media Platform",
    //   image: "/images/social-preview.png",
    //   tech: ["Vue.js", "GraphQL", "AWS"],
    //   metrics: "100k+ posts",
    //   link: "https://your-social-demo.com",
    //   description:
    //     "A vibrant social network with real-time feeds, story features, and seamless media sharing built for the modern web.",
    //   images: ["/images/social-1.png", "/images/social-2.png", "/images/social-3.png"],
    //   category: "Social Network",
    // },
    // {
    //   name: "Fintech App",
    //   image: "/images/fintech-preview.png",
    //   tech: ["React Native", "Plaid", "Stripe"],
    //   metrics: "$10M+ processed",
    //   link: "https://your-fintech-demo.com",
    //   description:
    //     "A secure financial management app with bank integrations, budget tracking, and intelligent spending insights.",
    //   images: ["/images/fintech-1.png", "/images/fintech-2.png", "/images/fintech-3.png"],
    //   category: "Finance",
    // },
  ]


  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Carousel navigation
  const goToSlide = (index) => {
    if (index < 0 || index >= projects.length) return
    setCurrentIndex(index)
    const carousel = carouselRef.current
    if (carousel) {
      const slideWidth = carousel.offsetWidth
      gsap.to(carousel, {
        scrollLeft: slideWidth * index,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % projects.length
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    goToSlide(prevIndex)
  }

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  // Improved touch handling for mobile
  useEffect(() => {
    if (!carouselRef.current) return
    const carousel = carouselRef.current
    let touchStartX = 0
    let touchStartY = 0
    let carouselScrollStart = 0
    let isSwiping = false
    let swipeDirection = null

    const handleTouchStart = (e) => {
      // Don't start drag if clicking on image
      if (e.target.tagName === 'IMG') return
      
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      carouselScrollStart = carousel.scrollLeft
      isSwiping = false
      swipeDirection = null
    }

    const handleTouchMove = (e) => {
      if (!touchStartX || !touchStartY) return

      const touchEndX = e.touches[0].clientX
      const touchEndY = e.touches[0].clientY
      const deltaX = touchStartX - touchEndX
      const deltaY = touchStartY - touchEndY

      if (!swipeDirection) {
        if (Math.abs(deltaX) > Math.abs(deltaY) * 2.5 && Math.abs(deltaX) > 10) {
          swipeDirection = 'horizontal'
          isSwiping = true
        } else if (Math.abs(deltaY) > 5) {
          swipeDirection = 'vertical'
        }
      }

      if (swipeDirection === 'horizontal' && isSwiping) {
        e.preventDefault()
        carousel.scrollLeft = carouselScrollStart + deltaX
      }
    }

    const handleTouchEnd = (e) => {
      if (isSwiping && swipeDirection === 'horizontal') {
        const touchEndX = e.changedTouches[0].clientX
        const deltaX = touchStartX - touchEndX
        const threshold = carousel.offsetWidth * 0.2

        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            nextSlide()
          } else {
            prevSlide()
          }
        } else {
          goToSlide(currentIndex)
        }
      }

      touchStartX = 0
      touchStartY = 0
      isSwiping = false
      swipeDirection = null
    }

    let isMouseDown = false
    let mouseStartX = 0
    let scrollStart = 0
    let hasDragged = false

    const handleMouseDown = (e) => {
      // Don't start drag if clicking on image
      if (e.target.tagName === 'IMG') return
      
      isMouseDown = true
      hasDragged = false
      carousel.style.scrollBehavior = "auto"
      mouseStartX = e.pageX
      scrollStart = carousel.scrollLeft
      carousel.style.cursor = "grabbing"
    }

    const handleMouseMove = (e) => {
      if (!isMouseDown) return
      e.preventDefault()
      hasDragged = true
      const x = e.pageX
      const walk = (mouseStartX - x) * 1.5
      carousel.scrollLeft = scrollStart + walk
    }

    const handleMouseUp = () => {
      if (isMouseDown) {
        isMouseDown = false
        carousel.style.cursor = "grab"
        carousel.style.scrollBehavior = "smooth"
        if (hasDragged) {
          const slideWidth = carousel.offsetWidth
          const newIndex = Math.round(carousel.scrollLeft / slideWidth)
          setCurrentIndex(newIndex)
        }
      }
    }

    carousel.addEventListener("touchstart", handleTouchStart, { passive: true })
    carousel.addEventListener("touchmove", handleTouchMove, { passive: false })
    carousel.addEventListener("touchend", handleTouchEnd, { passive: true })
    carousel.addEventListener("mousedown", handleMouseDown)
    carousel.addEventListener("mousemove", handleMouseMove)
    carousel.addEventListener("mouseup", handleMouseUp)
    carousel.addEventListener("mouseleave", handleMouseUp)

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart)
      carousel.removeEventListener("touchmove", handleTouchMove)
      carousel.removeEventListener("touchend", handleTouchEnd)
      carousel.removeEventListener("mousedown", handleMouseDown)
      carousel.removeEventListener("mousemove", handleMouseMove)
      carousel.removeEventListener("mouseup", handleMouseUp)
      carousel.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [currentIndex])

  // Modal animations
  useEffect(() => {
    if (activeProject) {
      gsap.fromTo(modalRef.current, { opacity: 0, y: 100, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" })
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, stagger: 0.15, delay: 0.3, duration: 0.5, ease: "power2.out" }
        )
      }
    }
  }, [activeProject])

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setActiveProject(null),
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (previewImage) {
          closeImagePreview()
        } else {
          closeModal()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [previewImage])

  // Image preview functions
  const openImagePreview = (imageSrc) => {
    setPreviewImage(imageSrc)
    if (imagePreviewRef.current) {
      gsap.fromTo(
        imagePreviewRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      )
    }
  }

  const closeImagePreview = () => {
    if (imagePreviewRef.current) {
      gsap.to(imagePreviewRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setPreviewImage(null),
      })
    }
  }

  // Gallery touch handling for modal
  useEffect(() => {
    if (!galleryRef.current) return
    const gallery = galleryRef.current
    
    let isMouseDown = false
    let startX, scrollLeft
    let hasDragged = false

    const handleMouseDown = (e) => {
      // Don't start drag if clicking on image
      if (e.target.tagName === 'IMG') return
      
      isMouseDown = true
      hasDragged = false
      gallery.style.cursor = "grabbing"
      startX = e.pageX - gallery.offsetLeft
      scrollLeft = gallery.scrollLeft
    }

    const handleMouseMove = (e) => {
      if (!isMouseDown) return
      e.preventDefault()
      hasDragged = true
      const x = e.pageX - gallery.offsetLeft
      const walk = (x - startX) * 1.5
      gallery.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      isMouseDown = false
      gallery.style.cursor = "grab"
    }

    gallery.addEventListener("mousedown", handleMouseDown)
    gallery.addEventListener("mouseleave", handleMouseUp)
    gallery.addEventListener("mouseup", handleMouseUp)
    gallery.addEventListener("mousemove", handleMouseMove)

    return () => {
      gallery.removeEventListener("mousedown", handleMouseDown)
      gallery.removeEventListener("mouseleave", handleMouseUp)
      gallery.removeEventListener("mouseup", handleMouseUp)
      gallery.removeEventListener("mousemove", handleMouseMove)
    }
  }, [activeProject])

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-24">
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
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="flex-shrink-0 w-full snap-center px-2 md:px-4"
              >
                <div className="group rounded-2xl md:rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-2xl overflow-hidden hover:border-slate-600/80 transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] mx-auto max-w-5xl h-full">
                  <div className="grid md:grid-cols-2 gap-0 h-full md:min-h-[24rem]">
                    {/* Project Image */}
                    <div 
                      className="relative overflow-hidden h-64 md:h-full bg-slate-900 cursor-pointer"
                      onClick={() => openImagePreview(project.image)}
                    >
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-contain transition-all duration-700 group-hover:scale-105 pointer-events-none"
                        draggable="false"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Zoom Icon Hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                      {/* Project Number */}
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 pointer-events-none">
                        <div className="text-white/40 text-5xl md:text-7xl font-black leading-none group-hover:text-white/60 transition-colors duration-500 select-none">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 mb-3 md:mb-4">
                        {project.name}
                      </h3>
                      
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/50">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics & CTA */}
                      <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-green-400 text-xs md:text-sm font-semibold">{project.metrics}</span>
                        </div>
                        <button
                          onClick={() => setActiveProject(project)}
                          className="ml-auto px-4 py-2 md:px-6 md:py-2.5 rounded-xl bg-gradient-to-r from-yellow-500/80 to-amber-600/80 hover:from-yellow-400 hover:to-amber-500 text-white text-xs md:text-sm font-semibold shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105"
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-6 h-1.5 md:w-8 md:h-2 bg-gradient-to-r from-yellow-400 to-amber-500"
                  : "w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={closeModal}>
          <div ref={modalRef} className="relative max-w-4xl w-full rounded-3xl border border-slate-700 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 p-6 md:p-8 text-center text-white shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">{activeProject.name}</h3>

            {/* Gallery */}
            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto no-scrollbar mb-4 md:mb-6 snap-x snap-mandatory px-2 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {activeProject.images.map((img, index) => (
                <div 
                  key={index} 
                  className="snap-center flex-shrink-0 w-72 md:w-80 h-48 md:h-56 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-yellow-500/50 transition-all duration-300 bg-slate-900/50 group cursor-pointer relative"
                  onClick={() => openImagePreview(img)}
                >
                  <img 
                    src={img} 
                    alt={`${activeProject.name} screenshot ${index + 1}`} 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none" 
                    draggable="false"
                  />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-400/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-left max-w-2xl mx-auto">
              <p className="text-slate-300 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">{activeProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-slate-800/60 text-slate-300 text-xs md:text-sm font-medium border border-slate-700/50">
                    {tech}
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

            <button onClick={() => window.open(activeProject.link, "_blank")} className="mt-4 px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold shadow-lg hover:scale-105 transition-transform text-sm md:text-base">
              View Live Demo 🚀
            </button>

            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition text-2xl font-light" aria-label="Close modal">✕</button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8" 
          onClick={closeImagePreview}
        >
          <div 
            ref={imagePreviewRef}
            className="relative max-w-7xl max-h-[95vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeImagePreview}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-110"
              aria-label="Close preview"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image container with modern frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-gradient-to-br from-slate-900 via-slate-950 to-black p-4 max-w-full max-h-full">
              <img 
                src={previewImage} 
                alt="Full preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                draggable="false"
              />
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>
            </div>

            {/* Hint text */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-300 text-sm font-medium">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects