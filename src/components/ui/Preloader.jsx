import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onDone }) {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);
  const counterRef = useRef(null);
  const ringRefs = useRef([]);
  const particlesRef = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const logoContainer = logoContainerRef.current;
    const logo = logoRef.current;
    const counterEl = counterRef.current;
    const progress = progressRef.current;

    if (!container || !logo || !counterEl || !logoContainer) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof onDone === "function") onDone();
      },
    });

    gsap.set(container, { perspective: 1000 });
    gsap.set(logoContainer, {
      transformStyle: "preserve-3d",
      rotationY: -90,
      rotationX: 20,
      scale: 0.5,
      opacity: 0,
    });
    gsap.set(logo, { scale: 0.8, opacity: 0 });
    gsap.set(counterEl, { y: 50, opacity: 0, scale: 0.8 });
    gsap.set(progress, { scaleX: 0, transformOrigin: "left" });

    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        gsap.set(ring, {
          scale: 0,
          rotation: i * 60,
          opacity: 0,
        });
      }
    });

    particlesRef.current.forEach((particle) => {
      if (particle) {
        gsap.set(particle, { scale: 0, opacity: 0 });
      }
    });

    // === ENTRANCE ANIMATIONS ===

    // Logo container 3D entrance
    tl.to(
      logoContainer,
      {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      0.3
    );

    // Logo scale in
    tl.to(
      logo,
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      0.5
    );

    // Rings appear and rotate
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        tl.to(
          ring,
          {
            scale: 1,
            opacity: 0.6,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          0.6 + i * 0.1
        );

        // Continuous rotation during loading
        gsap.to(ring, {
          rotation: `+=${360 * (i % 2 === 0 ? 1 : -1)}`,
          duration: 8 + i * 2,
          repeat: -1,
          ease: "none",
        });
      }
    });

    // Particles appear
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        tl.to(
          particle,
          {
            scale: 1,
            opacity: 0.8,
            duration: 0.5,
            ease: "back.out(2)",
          },
          0.8 + i * 0.05
        );
      }
    });

    // Counter entrance
    tl.to(
      counterEl,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      0.9
    );

    // === LOADING ANIMATIONS ===

    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function () {
          const val = Math.floor(this.targets()[0].value);
          setCounter(val);
        },
      },
      1
    );

    // Progress bar fills
    tl.to(
      progress,
      {
        scaleX: 1,
        duration: 3,
        ease: "power2.inOut",
      },
      1
    );

    // Logo gentle pulse during loading
    tl.to(
      logo,
      {
        scale: 1.08,
        duration: 0.8,
        repeat: 2,
        yoyo: true,
        ease: "sine.inOut",
      },
      1.5
    );

    // Logo container subtle 3D rotation
    tl.to(
      logoContainer,
      {
        rotationY: 5,
        rotationX: -5,
        duration: 1.5,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      1.5
    );

    // Hold at 100%
    tl.to({}, { duration: 0.2 });

    // === EXIT ANIMATIONS ===

    tl.to(counterEl, {
      y: -80,
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "back.in(2)",
    });

    // Particles scatter
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const angle = (i / particlesRef.current.length) * Math.PI * 2;
        const distance = 500;
        tl.to(
          particle,
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.25"
        );
      }
    });

    // Rings expand and fade
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        tl.to(
          ring,
          {
            scale: 3,
            opacity: 0,
            duration: 0.1,
            ease: "power3.in",
          },
          "-=0.1"
        );
      }
    });

    // Logo 3D spin out
    tl.to(
      logoContainer,
      {
        rotationY: 90,
        rotationX: -90,
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      },
      "-=0.3"
    );

    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.05,
        ease: "power3.in",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [onDone]);

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 180;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden font-"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
        perspective: "1000px",
      }}
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 173, 51, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 173, 51, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 173, 51, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* 3D Logo container with rings */}
        <div className="relative mb-16">
          {/* Rotating rings */}
          <div
            ref={(el) => (ringRefs.current[0] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-[#FFAD33]/30"
            style={{ willChange: "transform, opacity" }}
          />
          <div
            ref={(el) => (ringRefs.current[1] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-[#fd4444]/20"
            style={{ willChange: "transform, opacity" }}
          />
          <div
            ref={(el) => (ringRefs.current[2] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-[#FFAD33]/20"
            style={{ willChange: "transform, opacity" }}
          />

          {/* Particles in circle */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              ref={(el) => (particlesRef.current[particle.id] = el)}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{
                transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
                background: "linear-gradient(135deg, #FFAD33, #fd4444)",
                boxShadow:
                  "0 0 15px rgba(255, 173, 51, 0.8), 0 0 30px rgba(255, 173, 51, 0.4)",
                willChange: "transform, opacity",
              }}
            />
          ))}

          {/* Logo with 3D transform */}
          <div
            ref={logoContainerRef}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}
          >
            {/* Glow layers */}
            <div
              className="absolute inset-0 w-60 h-60 rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle, #FFAD33 0%, transparent 70%)",
                transform: "translateZ(-30px)",
              }}
            />
            <div
              className="absolute inset-0 w-60 h-60 rounded-full blur-2xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #fd4444 0%, transparent 70%)",
                transform: "translateZ(-20px)",
              }}
            />

            {/* Logo */}
            <div
              ref={logoRef}
              className="relative w-60 h-60"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src="/images/brand/logo.png"
                alt="The Director"
                className="w-full h-full object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 30px rgba(255, 173, 51, 0.6)) drop-shadow(0 0 60px rgba(255, 173, 51, 0.3))",
                  transform: "translateZ(10px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Counter */}
        <div
          ref={counterRef}
          className="mb-10 relative"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Counter glow */}
          <div
            className="absolute inset-0 blur-2xl opacity-60"
            style={{
              background: `radial-gradient(circle, rgba(255, 173, 51, ${
                counter / 150
              }) 0%, transparent 70%)`,
            }}
          />

          <div className="relative flex items-baseline gap-3">
            <span
              className="text-8xl md:text-9xl font-black tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #FFAD33 0%, #ffd700 50%, #FFAD33 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Mulish, sans-serif",
                filter: "drop-shadow(0 0 20px rgba(255, 173, 51, 0.5))",
              }}
            >
              {counter.toString().padStart(2, "0")}
            </span>
            <span className="text-5xl md:text-6xl font-bold text-white/30">
              %
            </span>
          </div>
        </div>

        <div className="mb-8 text-sm md:text-base tracking-[0.5em] uppercase text-[#FFAD33]/60 font-light">
          Loading Experience
        </div>

        {/* Progress bar */}
        <div className="w-80 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden relative backdrop-blur-sm">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #FFAD33 0%, #ffd700 50%, #FFAD33 100%)",
              boxShadow:
                "0 0 20px rgba(255, 173, 51, 0.8), 0 0 40px rgba(255, 173, 51, 0.4)",
              willChange: "transform",
            }}
          />
        </div>

        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FFAD33] animate-pulse" />
          <span className="text-xs text-white/40 font-mono tracking-wider">
            THE DIRECTOR
          </span>
        </div>

        <div className="absolute top-8 right-8 flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono tracking-wider">
            v1.0
          </span>
          <div className="w-2 h-2 rounded-full bg-[#fd4444] animate-pulse" />
        </div>

        <div className="absolute bottom-8 left-8 text-xs text-white/40 font-mono">
          {new Date().getFullYear()}
        </div>

        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-xs text-white/40 font-mono">
          <span>LOADING</span>
          <div className="flex gap-1">
            <div
              className="w-1 h-1 rounded-full bg-[#FFAD33] animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-[#FFAD33] animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-[#FFAD33] animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
