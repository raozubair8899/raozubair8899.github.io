import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResumeDownloadButton from '@/components/ResumeDownloadButton';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initial reveal animation
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        subheadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

    // Scroll-triggered exit animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress > 0.3) {
          const exitProgress = (progress - 0.3) / 0.7;
          gsap.set(headingRef.current, {
            opacity: 1 - exitProgress,
            y: -exitProgress * 50,
            filter: `blur(${exitProgress * 10}px)`,
          });
          gsap.set(subheadingRef.current, {
            opacity: 1 - exitProgress,
            y: -exitProgress * 30,
          });
          gsap.set(taglineRef.current, {
            opacity: 1 - exitProgress,
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* 90% viewport video frame with crop-to-fill */}
      <div
        className="absolute left-1/2 top-1/2 w-[90vw] h-[90svh] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black"
        style={{ zIndex: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay 1: Soft dark gradient for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Overlay 2: Subtle glass haze effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(1px)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p
          ref={taglineRef}
          className="text-white/70 text-sm md:text-base tracking-[0.3em] uppercase mb-6 drop-shadow-lg"
        >
          Building Software That Moves People
        </p>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4 drop-shadow-2xl"
        >
          Rao Muhammad
          <br />
          <span className="text-gradient">Zubair</span>
        </h1>

        <p
          ref={subheadingRef}
          className="text-xl md:text-3xl text-white/80 font-light tracking-wide drop-shadow-lg"
        >
          Full-Stack Developer <span className="text-white/50">|</span> AI/ML
          Enthusiast
        </p>

        <div className="mt-8 flex items-center justify-center">
          <ResumeDownloadButton />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-widest uppercase drop-shadow">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
