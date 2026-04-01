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
    const ctx = gsap.context(() => {
      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
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
          duration: 60,
          repeat: -1,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 overflow-hidden"
      id="skills"
    >
      {/* Background orbit decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          ref={orbitRef}
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
        >
          {/* Orbit rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-12 border border-white/5 rounded-full" />
          <div className="absolute inset-24 border border-white/5 rounded-full" />

          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                top: `${50 - 45 * Math.cos((i * Math.PI) / 3)}%`,
                left: `${50 + 45 * Math.sin((i * Math.PI) / 3)}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            Skills
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Tech
              <span className="text-white/60"> Stack</span>
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              My technical toolkit spans the full development stack, from
              responsive frontend interfaces to scalable backend architectures
              and intelligent ML models.
            </p>

            {/* Center logo */}
            <div className="relative w-48 h-48 mx-auto lg:mx-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full glass flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">ZS</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>

          {/* Skills grid */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="skill-card glass rounded-xl p-5 hover:bg-white/10 transition-all duration-300 group"
                data-cursor-hover
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <span className="text-white/40 text-sm">{category.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 group-hover:from-blue-400 group-hover:to-cyan-400"
                    style={{ width: `${category.level}%` }}
                  />
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-0.5 bg-white/5 text-white/60 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
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
