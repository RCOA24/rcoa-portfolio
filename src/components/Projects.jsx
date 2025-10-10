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

  const [activeProject, setActiveProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      name: "E-Commerce Platform",
      gradient: "from-blue-500 via-blue-600 to-purple-600",
      tech: ["React", "Node.js", "Stripe"],
      metrics: "50k+ users",
      link: "https://your-ecommerce-demo.com",
      description:
        "A modern online shopping experience with real-time product tracking, secure Stripe payments, and a blazing-fast React frontend.",
      images: ["/images/ecom-1.png", "/images/ecom-2.png", "/images/ecom-3.png"],
      category: "Web Application",
    },
    {
      name: "SaaS Dashboard",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      tech: ["Next.js", "PostgreSQL", "Redis"],
      metrics: "$2M ARR",
      link: "https://your-saas-demo.com",
      description:
        "A scalable SaaS analytics dashboard with real-time data streaming, optimized caching, and elegant chart visualizations.",
      images: ["/images/saas-1.png", "/images/saas-2.png", "/images/saas-3.png"],
      category: "Enterprise",
    },
    {
      name: "AI Chat Application",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      tech: ["React", "OpenAI", "WebSocket"],
      metrics: "1M+ messages",
      link: "https://your-ai-chat-demo.com",
      description:
        "An interactive chat experience powered by OpenAI, enabling natural, dynamic, and engaging real-time AI conversations.",
      images: ["/images/ai-1.png", "/images/ai-2.png", "/images/ai-3.png"],
      category: "AI/ML",
    },
    {
      name: "Social Media Platform",
      gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
      tech: ["Vue.js", "GraphQL", "AWS"],
      metrics: "100k+ posts",
      link: "https://your-social-demo.com",
      description:
        "A vibrant social network with real-time feeds, story features, and seamless media sharing built for the modern web.",
      images: ["/images/social-1.png", "/images/social-2.png", "/images/social-3.png"],
      category: "Social Network",
    },
    {
      name: "Fintech App",
      gradient: "from-cyan-500 via-blue-600 to-indigo-600",
      tech: ["React Native", "Plaid", "Stripe"],
      metrics: "$10M+ processed",
      link: "https://your-fintech-demo.com",
      description:
        "A secure financial management app with bank integrations, budget tracking, and intelligent spending insights.",
      images: ["/images/fintech-1.png", "/images/fintech-2.png", "/images/fintech-3.png"],
      category: "Finance",
    },
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

  // Drag/Swipe for carousel
  useEffect(() => {
    if (!carouselRef.current) return
    const carousel = carouselRef.current
    let isDown = false
    let startX, scrollLeft

    const startDragging = (x) => {
      isDown = true
      carousel.style.scrollBehavior = "auto"
      startX = x - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
    }

    const stopDragging = () => {
      isDown = false
      carousel.style.scrollBehavior = "smooth"
      const slideWidth = carousel.offsetWidth
      const newIndex = Math.round(carousel.scrollLeft / slideWidth)
      setCurrentIndex(newIndex)
    }

    const move = (x, e) => {
      if (!isDown) return
      e.preventDefault()
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    carousel.addEventListener("mousedown", (e) => startDragging(e.pageX))
    carousel.addEventListener("mouseleave", stopDragging)
    carousel.addEventListener("mouseup", stopDragging)
    carousel.addEventListener("mousemove", (e) => move(e.pageX, e))
    carousel.addEventListener("touchstart", (e) => startDragging(e.touches[0].pageX))
    carousel.addEventListener("touchend", stopDragging)
    carousel.addEventListener("touchmove", (e) => move(e.touches[0].pageX, e))

    return () => {
      carousel.onmousedown = null
      carousel.onmouseleave = null
      carousel.onmouseup = null
      carousel.onmousemove = null
      carousel.ontouchstart = null
      carousel.ontouchend = null
      carousel.ontouchmove = null
    }
  }, [])

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
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Drag/Swipe for modal gallery
  useEffect(() => {
    if (!galleryRef.current) return
    const gallery = galleryRef.current
    let isDown = false
    let startX, scrollLeft

    const startDragging = (x) => {
      isDown = true
      startX = x - gallery.offsetLeft
      scrollLeft = gallery.scrollLeft
    }

    const stopDragging = () => (isDown = false)
    const move = (x, e) => {
      if (!isDown) return
      e.preventDefault()
      const walk = (x - startX) * 1.5
      gallery.scrollLeft = scrollLeft - walk
    }

    gallery.addEventListener("mousedown", (e) => startDragging(e.pageX))
    gallery.addEventListener("mouseleave", stopDragging)
    gallery.addEventListener("mouseup", stopDragging)
    gallery.addEventListener("mousemove", (e) => move(e.pageX, e))
    gallery.addEventListener("touchstart", (e) => startDragging(e.touches[0].pageX))
    gallery.addEventListener("touchend", stopDragging)
    gallery.addEventListener("touchmove", (e) => move(e.touches[0].pageX, e))

    return () => {
      gallery.onmousedown = null
      gallery.onmouseleave = null
      gallery.onmouseup = null
      gallery.onmousemove = null
      gallery.ontouchstart = null
      gallery.ontouchend = null
      gallery.ontouchmove = null
    }
  }, [activeProject])

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>

      <div className="relative z-10 text-center mb-12 px-6">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Award-Winning Projects
        </h2>
        <p ref={subtitleRef} className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Blending design, motion, and engineering to craft immersive digital experiences that inspire and perform.
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="flex-shrink-0 w-full snap-center px-4"
              >
                <div className="group cursor-pointer rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-2xl overflow-hidden hover:border-slate-600/80 transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] mx-auto max-w-5xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Project Visual */}
                    <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} h-96 md:h-full`}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Animated Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                      </div>
                      
                      {/* Project Number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/20 text-9xl font-black leading-none group-hover:text-white/30 transition-colors duration-500">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 mb-4">
                        {project.name}
                      </h3>
                      
                      <p className="text-slate-400 text-base leading-relaxed mb-6">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/50">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics & CTA */}
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-green-400 text-sm font-semibold">{project.metrics}</span>
                        </div>
                        <button
                          onClick={() => setActiveProject(project)}
                          className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "w-2 h-2 bg-slate-700 hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div ref={modalRef} className="relative max-w-4xl w-full mx-6 rounded-3xl border border-slate-700 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 p-8 text-center text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{activeProject.name}</h3>

            {/* Gallery */}
            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto no-scrollbar mb-6 snap-x snap-mandatory px-2 select-none"
            >
              {activeProject.images.map((img, index) => (
                <div key={index} className="snap-center flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-slate-500 transition">
                  <img src={img} alt={activeProject.name} className="w-full h-full object-cover pointer-events-none" />
                </div>
              ))}
            </div>

            <div className="text-left max-w-2xl mx-auto">
              <p className="text-slate-300 text-base mb-6 leading-relaxed">{activeProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-lg bg-slate-800/60 text-slate-300 text-sm font-medium border border-slate-700/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold">{activeProject.metrics}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-sm">{activeProject.category}</span>
              </div>
            </div>

            <button onClick={() => window.open(activeProject.link, "_blank")} className="mt-4 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold shadow-lg hover:scale-105 transition-transform">
              View Live Demo 🚀
            </button>

            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition text-2xl font-light">✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects