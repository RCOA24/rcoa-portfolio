import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);               // "Design to inspire."
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const certificatesButtonRef = useRef(null);

  // NEW REF for the whole “Focused Excellence” line
  const excellenceLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------- 1. “Design to inspire.” ---------- */
      const splitTitle = new SplitType(titleRef.current, { types: "words" });
      const inspireWord = splitTitle.words.find(w =>
        w.textContent?.toLowerCase().includes("inspire")
      );

      // line entrance
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
      });

      // gold halo for “Inspire”
      const goldBgInspire = document.createElement("span");
      goldBgInspire.style.position = "absolute";
      goldBgInspire.style.top = "50%";
      goldBgInspire.style.left = "0";
      goldBgInspire.style.width = "100%";
      goldBgInspire.style.height = "100%";
      goldBgInspire.style.transform = "translateY(-50%)";
      goldBgInspire.style.background =
        "linear-gradient(180deg, rgba(255,215,0,0.15) 0%, rgba(255,223,0,0.1) 50%, transparent 100%)";
      goldBgInspire.style.filter = "blur(15px)";
      goldBgInspire.style.zIndex = "-1";
      goldBgInspire.style.borderRadius = "0.2em";
      inspireWord.style.position = "relative";
      inspireWord.appendChild(goldBgInspire);

      gsap.fromTo(
        goldBgInspire,
        { opacity: 0.6, scale: 0.95 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
          ease: "sine.inOut",
          scrollTrigger: { trigger: inspireWord, start: "top 85%", once: true },
        }
      );

      const splitInspire = new SplitType(inspireWord, { types: "chars" });
      splitInspire.chars.forEach((char, i) => {
        gsap.to(char, {
          color: "#FFD700",
          textShadow:
            "0 0 8px #FFD700, 0 0 16px #FFA500, 0 0 24px #FFD700",
          y: -2,
          scale: 1.03,
          duration: 0.3,
          delay: i * 0.05,
          ease: "sine.out",
          scrollTrigger: { trigger: char, start: "top 85%", once: true },
        });
      });

      /* ---------- 2. Subtitle ---------- */
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: subtitleRef.current, start: "top 85%", once: true },
      });

      /* ---------- 3. Paragraphs ---------- */
      const paragraphs = contentRef.current?.querySelectorAll("p");
      paragraphs?.forEach((p, i) => {
        gsap.from(p, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: p, start: "top 90%", once: true },
        });
      });

      /* ---------- 4. Image ---------- */
      gsap.to(imageRef.current, {
        y: -50,
        scale: 1.05,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: imageRef.current, start: "top 85%", once: true },
      });

      /* ---------- 5. Buttons ---------- */
      gsap.from(buttonRef.current, {
        opacity: 0,
        x: -15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: buttonRef.current, start: "top 90%", once: true },
      });
      gsap.from(certificatesButtonRef.current, {
        opacity: 0,
        x: -15,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: certificatesButtonRef.current,
          start: "top 90%",
          once: true,
        },
      });

      /* ---------- 6. “Focused Excellence” – SAME AS “Inspire” ---------- */
      // split the whole line into words (keeps HTML)
      const line = excellenceLineRef.current;
      if (!line) return;

      line.innerHTML = ""; // clear
      const phrase = "Focused Excellence";
      const words = phrase.split(" ");
      words.forEach(w => {
        const span = document.createElement("span");
        span.textContent = w;
        line.appendChild(span);
        line.appendChild(document.createTextNode(" "));
      });

      // entrance for the whole line (same as title)
      const splitLine = new SplitType(line, { types: "words" });
      gsap.from(splitLine.words, {
        opacity: 0,
        y: 80,
        scale: 0.85,
        filter: "blur(4px)",
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          once: true,
        },
      });

      // pick the **whole phrase** (first word) to attach the gold halo
      const targetWord = splitLine.words[0]; // “Focused” – will cover the whole phrase because of positioning
      const goldBgEx = document.createElement("span");
      goldBgEx.style.position = "absolute";
      goldBgEx.style.top = "50%";
      goldBgEx.style.left = "0";
      goldBgEx.style.width = "100%";
      goldBgEx.style.height = "100%";
      goldBgEx.style.transform = "translateY(-50%)";
      goldBgEx.style.background =
        "linear-gradient(180deg, rgba(255,215,0,0.15) 0%, rgba(255,223,0,0.1) 50%, transparent 100%)";
      goldBgEx.style.filter = "blur(15px)";
      goldBgEx.style.zIndex = "-1";
      goldBgEx.style.borderRadius = "0.2em";
      targetWord.style.position = "relative";
      targetWord.appendChild(goldBgEx);

      gsap.fromTo(
        goldBgEx,
        { opacity: 0.6, scale: 0.95 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
          ease: "sine.inOut",
          scrollTrigger: { trigger: targetWord, start: "top 85%", once: true },
        }
      );

      // shimmer on **every character** of the whole phrase
      const splitChars = new SplitType(line, { types: "chars" });
      splitChars.chars.forEach((char, i) => {
        gsap.to(char, {
          color: "#FFD700",
          textShadow:
            "0 0 8px #FFD700, 0 0 16px #FFA500, 0 0 24px #FFD700",
          y: -2,
          scale: 1.03,
          duration: 0.3,
          delay: i * 0.04,
          ease: "sine.out",
          scrollTrigger: { trigger: char, start: "top 85%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleResumeClick = () => {
    window.open(`${import.meta.env.BASE_URL}Rodney_Austria_Resume_2026.pdf`, "_blank");
  };

  const handleCertificatesClick = () => {
    window.open(`${import.meta.env.BASE_URL}Scan_Copy_of_Certificates_2025.pdf`, "_blank");
  };

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
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800/50 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-700/10 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/FormalPicture.jpg"
                  alt="Rodney Austria"
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>
          </div>

          {/* Text + Buttons */}
          <div
            ref={contentRef}
            className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-zinc-300 text-justify"
          >
            <p>
              I'm a Front-End Developer passionate about building responsive,
              scalable web applications with clean, maintainable code. Every
              feature designed with purpose and precision.
            </p>
            <p>
              Specializing in{" "}
              <span className="text-white font-medium">React</span>,{" "}
              <span className="text-white font-medium">Laravel</span>, and{" "}
              <span className="text-white font-medium">
                modern responsive systems
              </span>{" "}
              — I create products that deliver seamless user experiences and
              robust performance.
            </p>

            {/* ---- Focused Excellence (same as Inspire) ---- */}
            <div className="mt-12">
              <p
                ref={excellenceLineRef}
                className="text-3xl md:text-4xl font-normal text-white leading-tight mb-4 text-center"
              >
                Focused Excellence
              </p>

              <div className="flex flex-wrap gap-4 text-center justify-center">
                <button
                  ref={buttonRef}
                  onClick={handleResumeClick}
                  className="group overflow-hidden rounded-full border border-zinc-700 bg-zinc-900/70 px-6 py-2 text-base md:text-lg font-medium text-white shadow-lg backdrop-blur transition duration-300 hover:bg-zinc-800"
                >
                  <span className="relative z-10">View Resume</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </button>

                <button
                  ref={certificatesButtonRef}
                  onClick={handleCertificatesClick}
                  className="group overflow-hidden rounded-full border border-zinc-700 bg-zinc-900/70 px-6 py-2 text-base md:text-lg font-medium text-white shadow-lg backdrop-blur transition duration-300 hover:bg-zinc-800"
                >
                  <span className="relative z-10">View Certificates</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;