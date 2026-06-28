import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect for background image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Fast initial reveal animation
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        subheadingRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

    // Floating particles animation
    const particles = particlesRef.current?.querySelectorAll('.particle');
    if (particles) {
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -30 - Math.random() * 50,
          x: (Math.random() - 0.5) * 30,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: i * 0.5,
          ease: 'power1.out',
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Cinematic Background Image - Horse on Clouds */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ zIndex: 0 }}
      >
        <img
          src="/images/hero-horse.png"
          alt="Majestic horse galloping on clouds"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Floating particles - ethereal effect */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${60 + Math.random() * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Literature-inspired quote */}
        <p
          ref={taglineRef}
          className="text-white/60 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 font-light italic"
        >
          &ldquo;The wind of heaven is that which blows between a horse&apos;s ears.&rdquo;
        </p>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight mb-3 sm:mb-4"
        >
          Rao Muhammad
          <br />
          <span className="text-gradient">Zubair</span>
        </h1>

        <p
          ref={subheadingRef}
          className="text-base sm:text-lg md:text-xl text-white/80 font-light tracking-wide"
        >
          Full-Stack Developer <span className="text-white/40 mx-2">|</span> AI/ML Enthusiast
        </p>

        {/* Scroll indicator */}
        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
