import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal animation - only on desktop
      if (!isMobile && imageMaskRef.current) {
        gsap.fromTo(
          imageMaskRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }

      // Content fade in
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            About Me
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with mask reveal */}
          <div ref={imageRef} className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
            <div
              ref={imageMaskRef}
              className="absolute inset-0 overflow-hidden rounded-2xl"
              style={{ 
                clipPath: isMobile ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' 
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Rao Muhammad Zubair"
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-white/10 rounded-2xl -z-10 hidden md:block" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-2xl -z-10 backdrop-blur-sm hidden md:block" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Crafting Digital
              <br />
              <span className="text-white/60">Experiences</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed">
              I&apos;m a passionate Software Engineering student at NUTECH,
              dedicated to building innovative solutions that bridge the gap
              between complex problems and user-friendly experiences.
            </p>

            <p className="text-white/50 leading-relaxed">
              With a strong foundation in full-stack development and a keen
              interest in AI/ML, I thrive in collaborative environments where
              creativity meets technology. My internship at NASTP gave me
              real-world experience shipping production code, and my RouteMate
              project showcases my ability to architect complete solutions from
              database to deployment.
            </p>

            {/* Contact info */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:raozubair8899@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                data-cursor-hover
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">raozubair8899@gmail.com</span>
              </a>
              <a
                href="tel:+923218725013"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                data-cursor-hover
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+92 321 8725013</span>
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Rawalpindi, Pakistan</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com/in/rao-muhammad-zubair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                data-cursor-hover
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/raozubair8899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                data-cursor-hover
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10"
        >
          {[
            { value: '6+', label: 'Projects Completed' },
            { value: '3+', label: 'Years Coding' },
            { value: '10+', label: 'Certifications' },
            { value: '1', label: 'Internship' },
          ].map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
