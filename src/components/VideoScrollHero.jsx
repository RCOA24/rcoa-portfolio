import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ScrollStack, ScrollStackItem } from "./UI/ScrollStack";
import Squares from "./UI/Squares";
import TextType from "./UI/TextType";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollHero() {
  const headerRef = useRef(null);
  const awardRef = useRef(null);
  const textTypeRef = useRef(null);
  const hasAnimated = useRef(false);
  const hasTypingCompleted = useRef(false);
  const [showStaticText, setShowStaticText] = useState(false);

  useEffect(() => {
    const header = headerRef.current;

    // Smoother fade + move Hero as you scroll down
    const headerScrollTrigger = gsap.to(header, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: header,
        start: "top top",
        end: "bottom top+=300",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    // Award text: Animate once on enter, then stay in final state
    const splitAward = new SplitType(awardRef.current, { types: "chars" });
    splitAward.chars.forEach((char) => char.classList.add("inline-block"));

    const awardTl = gsap.timeline({ paused: true });

    awardTl.from(splitAward.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.8,
      ease: "power3.out",
    }).to(splitAward.chars, {
      color: "#FFD700",
      textShadow: "0 0 12px #FFD700, 0 0 24px #FFD700",
      duration: 1,
      ease: "power2.out",
    }, "-=0.6");

    ScrollTrigger.create({
      trigger: awardRef.current,
      start: "top 85%",
      end: "bottom 20%",
      onEnter: () => {
        if (!hasAnimated.current) {
          awardTl.play();
          hasAnimated.current = true;
        }
      },
      toggleActions: "none none none none",
      invalidateOnRefresh: true,
    });

    // ScrollStack items
    gsap.utils.toArray(".scroll-card").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Timer to switch to static text after typing completes
    const typingTimer = setTimeout(() => {
      if (!hasTypingCompleted.current) {
        hasTypingCompleted.current = true;
        setShowStaticText(true);
      }
    }, 2500); // Adjust based on your typing speed

    const handleResize = () => {
      ScrollTrigger.refresh(true);
    };
    
    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh(true);

    return () => {
      clearTimeout(typingTimer);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (splitAward) {
        splitAward.revert();
      }
      awardTl.kill();
      hasAnimated.current = false;
      hasTypingCompleted.current = false;
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-x-hidden hide-scrollbar">
      {/* Aurora background */}
      <div className="fixed inset-0 -z-10">
        <Squares
          speed={0.5}
          squareSize={100}
          direction="diagonal"
          borderColor="#403c49ff"
          hoverFillColor="#444444"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          ref={headerRef}
          className="text-center text-white px-6 max-w-6xl"
          style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-lg sm:text-xl md:text-2xl font-mono tracking-wide drop-shadow-lg backdrop-blur-md">
              {"<Rodney Charles O. Austria />"}
            </span>
          </div>

          <h1 
            ref={textTypeRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold mb-10 leading-[1.1] drop-shadow-2xl tracking-tight"
          >
            {showStaticText ? (
              <span>Full Stack Developer</span>
            ) : (
              <TextType
                text={["Full Stack Developer"]}
                typingSpeed={70}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={false}
              />
            )}
          </h1>

          <p
            ref={awardRef}
            className="text-base sm:text-xl md:text-2xl lg:text-4xl opacity-90 mb-12 drop-shadow-2xl font-light tracking-wide px-4 max-w-full"
          >
            Delivering innovative digital solutions
          </p>
        </div>
      </section>

      {/* SCROLL STACK SECTION */}
      <section className="relative text-white">
        <ScrollStack className="min-h-screen space-y-[30vh] px-4 sm:px-8 pb-[40vh]">
          {/* Card 1 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Digital Creator
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              Detail-oriented developer skilled in full-stack web solutions, responsive interfaces, and seamless API integrations for real-world impact.
            </p>
          </ScrollStackItem>

          {/* Card 2 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Technologies
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              React, Tailwind, GSAP, Restful APIs, Laravel, PHP, SQL, and more.
            </p>
          </ScrollStackItem>

          {/* Card 3 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Let's Collaborate
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              Open to freelance, remote projects, and cross-functional collaborations—let's build innovative solutions together.
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </section>
    </div>
  );
}