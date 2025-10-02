import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollStack, ScrollStackItem } from "./UI/ScrollStack";
import Aurora from "./UI/Aurora";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollHero() {
  const headerRef = useRef(null);
  const auroraRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    // Fade + move Hero as you scroll down
    gsap.to(header, {
      opacity: 0,
      y: -200,
      scrollTrigger: {
        trigger: header,
        start: "top top",
        end: "bottom top+=200",
        scrub: true,
      },
    });

    // Animate Aurora speed on scroll
    if (auroraRef.current) {
      gsap.to(auroraRef.current, {
        "--speed": 1.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom+=300% top",
          scrub: true,
        },
      });
    }

    // ScrollStack items animation
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
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative w-full min-h-[350vh] overflow-hidden"> 
      {/* Aurora background */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          ref={auroraRef}
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.3}
          className="w-full h-full object-cover"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          ref={headerRef}
          className="text-center text-white px-6 max-w-6xl"
          style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
        >
          <div className="mb-6 text-blue-300 text-2xl font-mono tracking-wider drop-shadow-2xl animate-pulse">
            {"<Developer />"}
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-[0.9] drop-shadow-2xl tracking-tight">
            Full Stack
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x">
              Developer
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl opacity-90 mb-12 drop-shadow-2xl font-light tracking-wide">
            Building award-winning digital experiences
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
              I design and build modern web apps with smooth animations,
              beautiful UI, and scalable backends.
            </p>
          </ScrollStackItem>

          {/* Card 2 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Technologies
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              React, Tailwind, GSAP, Node.js, Laravel, PHP, SQL, and more.
            </p>
          </ScrollStackItem>

          {/* Card 3 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Let’s Collaborate
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              Open to freelance, remote opportunities, and collaborations.
            </p>
          </ScrollStackItem>
           {/* Card 4 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Let’s Collaborate
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              Open to freelance, remote opportunities, and collaborations.
            </p>
          </ScrollStackItem>
           {/* Card 5 */}
          <ScrollStackItem className="scroll-card flex flex-col items-center justify-center text-center min-h-screen">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Let’s Collaborate
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl opacity-80 max-w-3xl">
              Open to freelance, remote opportunities, and collaborations.
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </section>
    </div>
  );
}
