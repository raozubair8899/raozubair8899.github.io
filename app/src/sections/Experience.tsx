import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: 'Frontend Web Developer - Internship',
    company: 'Siber Koza Alpha',
    location: 'NASTP Rawalpindi',
    period: 'Jul 2025 - Sep 2025',
    description:
      'Built a data analytics dashboard using vanilla JavaScript and Canvas API. Delivered 3 production-ready projects including e-commerce product page, interactive to-do app, and analytics dashboard. Improved workflow efficiency by 40%.',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Responsive Design'],
    featured: true,
  },
  {
    id: 2,
    role: 'Management Team Member',
    company: 'NUTECH Punjab Student Council',
    location: 'Islamabad',
    period: 'Sep 2024 - Present',
    description:
      'Coordinated logistics and digital promotion for 5+ university-wide events, managing a 10-member team and increasing attendance by approximately 20%. Delivered technical workshops demonstrating resource planning.',
    skills: ['Team Leadership', 'Event Management', 'Communication'],
    featured: false,
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline line draw animation - faster
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.5,
        },
      }
    );

    // Cards stagger animation - faster
    const cards = cardsRef.current?.querySelectorAll('.experience-card');
    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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
      id="experience"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Experience
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 sm:mb-16">
          Professional
          <span className="text-white/60"> Journey</span>
        </h2>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-blue-500/0 origin-top"
              style={{ height: '100%', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Experience cards */}
          <div className="space-y-8 sm:space-y-10 md:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative md:grid md:grid-cols-2 md:gap-12 ${
                  index !== experiences.length - 1 ? 'md:pb-12 lg:pb-16' : ''
                }`}
              >
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 top-0 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-blue-500 ring-4 ring-[#050505] z-10" />

                {/* Mobile timeline dot */}
                <div className="md:hidden absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-500" />

                {/* Content */}
                <div
                  className={`pl-5 sm:pl-6 md:pl-0 ${
                    index % 2 === 0
                      ? 'md:pr-12 lg:pr-16 md:text-right'
                      : 'md:col-start-2 md:pl-12 lg:pl-16'
                  }`}
                >
                  <div
                    className={`glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 ${
                      exp.featured ? 'ring-1 ring-blue-500/30' : ''
                    }`}
                  >
                    {exp.featured && (
                      <span className="inline-block px-2.5 sm:px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full mb-3 sm:mb-4">
                        Latest
                      </span>
                    )}

                    <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-2 sm:mb-3">
                      <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1.5 sm:mb-2">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/60 text-xs sm:text-sm mb-3 sm:mb-4">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed mb-3 sm:mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 text-white/70 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
