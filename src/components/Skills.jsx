import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const skillsRef = useRef([])
  const gridRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const skills = [
    { 
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'from-orange-500 to-red-500',
      docs: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
    },
    { 
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      color: 'from-cyan-400 to-blue-500',
      docs: 'https://tailwindcss.com/docs'
    },
    { 
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'from-yellow-400 to-yellow-600',
      docs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    { 
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: 'from-red-500 to-orange-600',
      docs: 'https://docs.oracle.com/en/java/'
    },
    { 
      name: 'C#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      color: 'from-purple-500 to-violet-600',
      docs: 'https://learn.microsoft.com/en-us/dotnet/csharp/'
    },
    { 
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: 'from-indigo-400 to-purple-500',
      docs: 'https://www.php.net/docs.php'
    },
    { 
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-blue-400 to-yellow-400',
      docs: 'https://docs.python.org/3/'
    },
    { 
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: 'from-orange-500 to-red-600',
      docs: 'https://git-scm.com/doc'
    },
    { 
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-cyan-400 to-blue-600',
      docs: 'https://react.dev/'
    },
    { 
      name: 'Laravel',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      color: 'from-red-500 to-orange-500',
      docs: 'https://laravel.com/docs'
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split title into words
      const words = titleRef.current.innerText.split(' ')
      titleRef.current.innerHTML = words
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(' ')
      
      const wordElements = titleRef.current.querySelectorAll('span')

      // Animate words with scrub
      gsap.from(wordElements, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        filter: "blur(5px)",
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          once: true,
        },
      })

      // Subtitle fade
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          once: true,
        },
      })

      // Stagger skills animation
      skillsRef.current.forEach((skill, i) => {
        gsap.from(skill, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 90%",
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSkillClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Title */}
        <div className="text-center mb-24 space-y-6 relative">
          {/* Subtle badge/label */}
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs md:text-sm font-medium tracking-[0.3em] text-zinc-500 uppercase">
              Mastery & Precision
            </span>
          </div>
          
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white"
          >
            Skills & Expertise.
          </h2>
          
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            A refined arsenal of technologies, perfected through dedication and real-world application
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillsRef.current[index] = el)}
              className="relative group perspective-1000 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSkillClick(skill.docs)}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                {/* Icon container */}
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-lg blur-sm opacity-40 group-hover:opacity-80 transition duration-300`}></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-zinc-800/80 rounded-lg transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Skill name */}
                <h3 className="text-white font-semibold text-center text-sm md:text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {skill.name}
                </h3>

                {/* Click hint on hover */}
                <div className={`text-[10px] text-zinc-500 text-center mt-2 transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  View docs →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-zinc-700"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 tracking-widest uppercase">Excellence in execution</p>
        </div>
      </div>
    </section>
  )
}

export default Skills