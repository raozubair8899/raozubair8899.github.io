import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Star, Users, Database, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: 'React.js', icon: Code2 },
  { name: 'Node.js', icon: Code2 },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Express.js', icon: Code2 },
  { name: 'PostGIS', icon: Database },
  { name: 'JWT Auth', icon: Users },
];

const features = [
  'Multi-tenant architecture with separate admin dashboards per university',
  'Geospatial ride matching using PostGIS ST_DWithin queries',
  'Full authentication flow with JWT and bcrypt password hashing',
  'Role-based access for students, drivers, and admins',
  'Real-time ride posting and finding functionality',
];

const FeaturedProject = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax effect
      gsap.fromTo(
        imageRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features stagger
      gsap.fromTo(
        featuresRef.current?.children || [],
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32"
      id="projects"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            Featured Project
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Project Image */}
          <div ref={imageRef} className="relative group">
            <div className="relative rounded-2xl overflow-hidden glass ring-1 ring-white/10">
              <img
                src="/images/routemate.png"
                alt="RouteMate - Carpooling Platform"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full">
                <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                <span className="text-blue-400 text-sm font-medium">
                  Full-Stack PERN
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              RouteMate
            </h2>

            <p className="text-xl text-white/60">
              Pakistan&apos;s First Student-Verified Carpooling Platform
            </p>

            <p className="text-white/50 leading-relaxed">
              A comprehensive full-stack carpooling solution built specifically
              for university students. RouteMate connects verified classmates
              for shared rides, reducing transportation costs and carbon
              footprint while building campus community.
            </p>

            {/* Features list */}
            <div ref={featuresRef} className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="pt-4">
              <span className="text-white/40 text-xs uppercase tracking-wider mb-3 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 text-white/70 text-sm rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <tech.icon className="w-3.5 h-3.5" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                className="px-6 py-3 bg-white text-[#050505] rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-colors"
                data-cursor-hover
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </button>
              <button
                className="px-6 py-3 glass rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                data-cursor-hover
              >
                <Github className="w-4 h-4" />
                Source Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
