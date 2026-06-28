import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Linkedin, Github, Download, BookOpen, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Literature quotes for the creative touch
const quotes = [
  "Code is poetry written in logic.",
  "Building digital cathedrals, one line at a time.",
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Image fade in
    gsap.fromTo(
      imageRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content fade in
    gsap.fromTo(
      contentRef.current?.children || [],
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Quote typewriter effect
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Stats counter animation
    gsap.fromTo(
      statsRef.current?.children || [],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current || st.vars.trigger === statsRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 sm:py-20 md:py-24 lg:py-32"
      id="about"
    >
      {/* Ancient architecture decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 80 L50 20 L90 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M20 80 L50 35 L80 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="20" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            About Me
          </span>
        </div>

        {/* Literature quote */}
        <p
          ref={quoteRef}
          className="text-white/40 text-sm sm:text-base italic mb-8 sm:mb-12 max-w-2xl"
        >
          &ldquo;{quotes[0]}&rdquo;
        </p>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src="/images/profile.jpg"
                alt="Rao Muhammad Zubair"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 sm:w-32 h-20 sm:h-32 border border-white/10 rounded-xl sm:rounded-2xl -z-10 hidden sm:block" />
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-xl sm:rounded-2xl -z-10 backdrop-blur-sm hidden sm:block" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Crafting Digital
              <br />
              <span className="text-white/60">Experiences</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              I&apos;m a passionate Software Engineering student at NUTECH,
              dedicated to building innovative solutions that bridge the gap
              between complex problems and user-friendly experiences.
            </p>

            <p className="text-white/50 text-sm sm:text-base leading-relaxed">
              With a strong foundation in full-stack development and a keen
              interest in AI/ML, I thrive in collaborative environments where
              creativity meets technology. My internship at NASTP gave me
              real-world experience shipping production code, and my RouteMate
              project showcases my ability to architect complete solutions from
              database to deployment.
            </p>

            {/* Interests badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-full flex items-center gap-1.5">
                <Building2 className="w-3 h-3" />
                Ancient Architecture
              </span>
              <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-full flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                Literature
              </span>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="mailto:raozubair8899@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-xs sm:text-sm">raozubair8899@gmail.com</span>
              </a>
              <a
                href="tel:+923218725013"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-xs sm:text-sm">+92 321 8725013</span>
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-xs sm:text-sm">Rawalpindi, Pakistan</span>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="pt-2 sm:pt-4">
              <a
                href="/resume.pdf"
                download="Rao_Muhammad_Zubair_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
              <a
                href="https://linkedin.com/in/rao-muhammad-zubair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </a>
              <a
                href="https://github.com/raozubair8899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 border-t border-white/10"
        >
          {[
            { value: '6+', label: 'Projects Completed' },
            { value: '3+', label: 'Years Coding' },
            { value: '10+', label: 'Certifications' },
            { value: '1', label: 'Internship' },
          ].map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
