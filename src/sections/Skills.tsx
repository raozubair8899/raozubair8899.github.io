import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'TailwindCSS'],
    level: 90,
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'JWT Auth'],
    level: 85,
  },
  {
    name: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'PostGIS', 'MongoDB', 'Firebase'],
    level: 80,
  },
  {
    name: 'AI/ML',
    skills: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Prompt Engineering'],
    level: 75,
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'Figma', 'Postman', 'Jira', 'Linux CLI'],
    level: 85,
  },
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
    level: 88,
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cards stagger animation
    const cards = cardsRef.current?.querySelectorAll('.skill-card');
    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    // Orbit continuous rotation
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
      id="skills"
    >
      {/* Horse silhouette decorative element */}
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 lg:w-80 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 80" className="w-full h-auto">
          <path
            d="M20 60 Q15 50 20 40 Q25 30 35 25 Q40 20 50 20 Q60 20 70 25 Q75 28 80 25 Q85 22 88 25 Q90 28 88 32 Q85 35 80 35 Q75 35 70 40 Q65 45 60 50 Q55 55 50 55 Q45 55 40 50 Q35 55 30 60 Q25 65 20 60"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Background orbit decoration - hidden on mobile */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          ref={orbitRef}
          className="relative w-[500px] lg:w-[700px] h-[500px] lg:h-[700px]"
        >
          {/* Orbit rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-10 lg:inset-14 border border-white/5 rounded-full" />
          <div className="absolute inset-20 lg:inset-28 border border-white/5 rounded-full" />

          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{
                top: `${50 - 42 * Math.cos((i * Math.PI) / 3)}%`,
                left: `${50 + 42 * Math.sin((i * Math.PI) / 3)}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Skills
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Tech
              <span className="text-white/60"> Stack</span>
            </h2>

            <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              My technical toolkit spans the full development stack, from
              responsive frontend interfaces to scalable backend architectures
              and intelligent ML models.
            </p>

            {/* Center logo */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto lg:mx-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">ZS</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
            </div>
          </div>

          {/* Skills grid */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3 sm:gap-4">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="skill-card glass rounded-lg sm:rounded-xl p-4 sm:p-5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{category.name}</h3>
                  <span className="text-white/40 text-xs sm:text-sm">{category.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-white/10 rounded-full mb-3 sm:mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 group-hover:from-blue-400 group-hover:to-cyan-400"
                    style={{ width: `${category.level}%` }}
                  />
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {category.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-1.5 sm:px-2 py-0.5 bg-white/5 text-white/60 text-[10px] sm:text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 bg-white/5 text-white/40 text-[10px] sm:text-xs rounded">
                      +{category.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
