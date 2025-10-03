import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Split title ---
      const splitTitle = new SplitType(titleRef.current, { types: "words" })
      const inspireWord = splitTitle.words.find(w => w.textContent.toLowerCase().includes("inspire"))
      const splitInspire = new SplitType(inspireWord, { types: "chars" })

      // Animate all words
      gsap.from(splitTitle.words, {
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

      // Flame background behind "Inspire"
      const flameBg = document.createElement("span")
      flameBg.style.position = "absolute"
      flameBg.style.top = "50%"
      flameBg.style.left = "0"
      flameBg.style.width = "100%"
      flameBg.style.height = "100%"
      flameBg.style.transform = "translateY(-50%)"
      flameBg.style.background = "linear-gradient(180deg, rgba(255,69,0,0.15) 0%, rgba(255,140,0,0.1) 50%, transparent 100%)"
      flameBg.style.filter = "blur(15px)"
      flameBg.style.zIndex = "-1"
      flameBg.style.borderRadius = "0.2em"
      inspireWord.style.position = "relative"
      inspireWord.appendChild(flameBg)

      // Subtle flame flicker (once)
      gsap.fromTo(
        flameBg,
        { opacity: 0.6, scale: 0.95 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: inspireWord,
            start: "top 85%",
            once: true,
          },
        }
      )

      // Animate each letter flicker once
      splitInspire.chars.forEach((char, i) => {
        gsap.to(char, {
          color: "#FF4500",
          textShadow: "0 0 5px #FF6347, 0 0 10px #FF4500, 0 0 15px #FFA500",
          y: -2,
          scale: 1.03,
          duration: 0.3,
          delay: i * 0.05,
          ease: "sine.out",
          scrollTrigger: {
            trigger: char,
            start: "top 85%",
            once: true,
          },
        })
      })

      // Floating sparks
      const sparks = []
      const numSparks = 8
      for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement("span")
        spark.className = "spark"
        spark.style.position = "absolute"
        spark.style.width = `${2 + Math.random() * 3}px`
        spark.style.height = spark.style.width
        spark.style.background = `rgba(255,${100 + Math.random() * 155},0,${0.5 + Math.random() * 0.5})`
        spark.style.borderRadius = "50%"
        spark.style.top = `${50 + Math.random() * 20 - 10}%`
        spark.style.left = `${Math.random() * 100}%`
        spark.style.pointerEvents = "none"
        spark.style.zIndex = "-1"
        inspireWord.appendChild(spark)
        sparks.push(spark)

        gsap.fromTo(
          spark,
          { y: 10, opacity: 1, scale: 0.5 },
          {
            y: -20 - Math.random() * 20,
            opacity: 0,
            scale: 0.8 + Math.random() * 0.4,
            duration: 1 + Math.random() * 0.5,
            delay: i * 0.08,
            ease: "power1.out",
            scrollTrigger: {
              trigger: inspireWord,
              start: "top 85%",
              once: true,
            },
          }
        )
      }

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

      // Content paragraphs
      const paragraphs = contentRef.current.querySelectorAll("p")
      paragraphs.forEach((p, i) => {
        gsap.from(p, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 90%",
            once: true,
          },
        })
      })

      // Image parallax
      gsap.to(imageRef.current, {
        y: -50,
        scale: 1.05,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 py-32 max-w-7xl">
        {/* Hero Title */}
        <div className="text-center mb-32 space-y-8 relative">
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none relative inline-block"
          >
            Designed to inspire.
          </h2>
          <p
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-zinc-400 max-w-4xl mx-auto leading-snug"
          >
            Crafting digital experiences that blend form and function.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          <div ref={contentRef} className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-zinc-300">
            <p>
              I'm a full-stack developer who believes in the power of simplicity. Every line of code, every pixel placed with intention.
            </p>
            <p>
              Specializing in <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Node.js</span>, and <span className="text-white font-medium">modern design systems</span> — I build products that people love to use.
            </p>
            <p className="text-3xl md:text-4xl font-normal text-white leading-tight">
              Less but better.
            </p>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800/50 shadow-2xl shadow-black/50">
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-700/10 to-transparent"></div>
              
              {/* Your picture */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/Profile.jpg" // <-- replace with your actual file name
                  alt="Rodney Austria"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              {/* Subtle grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
