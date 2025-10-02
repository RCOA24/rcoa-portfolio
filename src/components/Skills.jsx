import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const skillsRef = useRef([])

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'GSAP', level: 80 },
    { name: 'Git', level: 88 },
  ]

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )

    skillsRef.current.forEach((skill) => {
      gsap.fromTo(
        skill,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
    })
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding min-h-screen bg-gray-50 dark:bg-slate-800 overflow-hidden"
    >
      <h2
        ref={titleRef}
        className="text-5xl md:text-7xl font-extrabold text-center mb-12 gradient-text"
      >
        Skills
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => (skillsRef.current[index] = el)}
            className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
            <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
