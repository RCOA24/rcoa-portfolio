import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const projectsRef = useRef([])

  const projects = [
    {
      name: 'E-Commerce Platform',
      gradient: 'from-blue-500 via-blue-600 to-purple-600',
      tech: 'React • Node.js • Stripe',
      metrics: '50k+ users',
    },
    {
      name: 'SaaS Dashboard',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      tech: 'Next.js • PostgreSQL • Redis',
      metrics: '$2M ARR',
    },
    {
      name: 'AI Chat Application',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      tech: 'React • OpenAI • WebSocket',
      metrics: '1M+ messages',
    },
  ]

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    projectsRef.current.forEach((project) => {
      gsap.fromTo(
        project,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' }
      )
    })
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding min-h-screen bg-white dark:bg-slate-900 overflow-hidden"
    >
      <h2
        ref={titleRef}
        className="text-5xl md:text-7xl font-extrabold text-center mb-12 gradient-text"
      >
        Projects
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.name}
            ref={(el) => (projectsRef.current[i] = el)}
            className={`bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition group cursor-pointer backdrop-blur p-6`}
            style={{backgroundImage:`linear-gradient(to bottom right, var(--tw-gradient-stops))`, backgroundPosition:"center", backgroundRepeat:"no-repeat"}}
          >
            <div
              className={`w-full h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}
            >
              <div className="text-white text-6xl font-black opacity-10 absolute">{i + 1}</div>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-300 transition">
                {project.name}
              </h3>
              <p className="text-slate-400 text-sm mb-3 font-mono">{project.tech}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-sm font-medium">{project.metrics}</span>
                <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
