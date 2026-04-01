import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Brain, Music, Home, ShoppingCart, Pizza } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Food Recommendation System',
    description:
      'ML-powered food recommendation system using collaborative filtering with 85% accuracy. Built end-to-end data pipeline with Python and scikit-learn.',
    tech: ['Python', 'scikit-learn', 'SQL', 'Pandas'],
    icon: Brain,
    color: 'from-orange-500/20 to-red-500/20',
    accent: 'orange',
  },
  {
    id: 2,
    title: 'Music Recommendation System',
    description:
      'Data pipeline integrating Spotify Web API to analyze listening habits. Features normalized database schema optimized for 1000+ records.',
    tech: ['Python', 'SQL', 'Spotify API', 'NumPy'],
    icon: Music,
    color: 'from-green-500/20 to-emerald-500/20',
    accent: 'green',
  },
  {
    id: 3,
    title: 'Property Rental Web App',
    description:
      'Full-stack MVC application with Django backend and MySQL database. Features user authentication, session management, and role-based views.',
    tech: ['Django', 'MySQL', 'HTML/CSS', 'JavaScript'],
    icon: Home,
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: 'blue',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description:
      'CLI-based e-commerce platform with product listings, cart management, and order processing. Relational database managing 100+ products.',
    tech: ['Java', 'SQL', 'OOP', 'Database Design'],
    icon: ShoppingCart,
    color: 'from-purple-500/20 to-pink-500/20',
    accent: 'purple',
  },
  {
    id: 5,
    title: "Domino's Website Clone",
    description:
      'A responsive website clone using Figma, replicating Domino\'s UI with enhanced features. Modern design with improved user experience and additional functionality.',
    tech: ['Figma', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
    icon: Pizza,
    color: 'from-red-500/20 to-orange-500/20',
    accent: 'red',
  },
];

const ProjectGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            More Projects
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16">
          Other
          <span className="text-white/60"> Works</span>
        </h2>

        {/* Projects grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative glass rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden"
              data-cursor-hover
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-${project.accent}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <project.icon
                    className={`w-6 h-6 text-${project.accent}-400`}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-white/5 text-white/60 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    data-cursor-hover
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    data-cursor-hover
                  >
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
