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
      'Built a data analytics dashboard using vanilla JavaScript and Canvas API. Delivered 3 production-ready projects including e-commerce product page, interactive to-do app, and analytics dashboard. Improved workflow efficiency by 40% through CLI-based development practices.',
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
      'Coordinated logistics and digital promotion for 5+ university-wide events, managing a 10-member team and increasing attendance by approximately 20%. Delivered technical workshops demonstrating resource planning and execution under time pressure.',
    skills: ['Team Leadership', 'Event Management', 'Communication'],
    featured: false,
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              x: index % 2 === 0 ? -80 : 80,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32"
      id="experience"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            Experience
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16">
          Professional
          <span className="text-white/60"> Journey</span>
        </h2>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-blue-500/0 origin-top"
              style={{ height: '100%', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Experience cards */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative md:grid md:grid-cols-2 md:gap-12 ${
                  index !== experiences.length - 1 ? 'md:pb-16' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-blue-500 ring-4 ring-[#050505] z-10" />

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 ${
                    index % 2 === 0
                      ? 'md:pr-16 md:text-right'
                      : 'md:col-start-2 md:pl-16'
                  }`}
                >
                  <div
                    className={`glass rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500 ${
                      exp.featured ? 'ring-1 ring-blue-500/30' : ''
                    }`}
                    data-cursor-hover
                  >
                    {exp.featured && (
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full mb-4">
                        Latest
                      </span>
                    )}

                    <div className="flex items-center gap-2 text-white/50 text-sm mb-3 md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-4 text-white/60 text-sm mb-4 md:justify-start">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-white/50 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div
                      className={`flex flex-wrap gap-2 md:justify-start`}
                    >
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/5 text-white/70 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && (
                  <div className="hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
