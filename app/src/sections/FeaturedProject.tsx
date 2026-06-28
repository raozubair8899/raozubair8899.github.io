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
    // Image animation
    gsap.fromTo(
      imageRef.current,
      { y: 50, opacity: 0 },
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

    // Content reveal
    gsap.fromTo(
      contentRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Features stagger
    gsap.fromTo(
      featuresRef.current?.children || [],
      { x: -15, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 sm:py-20 md:py-24 lg:py-32"
      id="projects"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[500px] md:h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section label */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Featured Project
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Project Image */}
          <div ref={imageRef} className="relative group order-1">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden glass ring-1 ring-white/10">
              <img
                src="/images/project-routemate.png"
                alt="RouteMate - Carpooling Platform"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full">
                <Star className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 fill-blue-400" />
                <span className="text-blue-400 text-xs font-medium">
                  Full-Stack PERN
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border border-white/10 rounded-xl sm:rounded-2xl -z-10" />
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6 order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              RouteMate
            </h2>

            <p className="text-lg sm:text-xl text-white/60">
              Pakistan&apos;s First Student-Verified Carpooling Platform
            </p>

            <p className="text-white/50 text-sm sm:text-base leading-relaxed">
              A comprehensive full-stack carpooling solution built specifically
              for university students. RouteMate connects verified classmates
              for shared rides, reducing transportation costs and carbon
              footprint while building campus community.
            </p>

            {/* Features list */}
            <div ref={featuresRef} className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blue-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span className="text-white/60 text-xs sm:text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="pt-2 sm:pt-4">
              <span className="text-white/40 text-xs uppercase tracking-wider mb-2 sm:mb-3 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 text-white/70 text-xs sm:text-sm rounded-lg flex items-center gap-1.5 sm:gap-2 hover:bg-white/10 transition-colors"
                  >
                    <tech.icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-[#050505] rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-colors text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </button>
              <button
                className="px-4 sm:px-6 py-2.5 sm:py-3 glass rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-colors text-sm sm:text-base"
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
