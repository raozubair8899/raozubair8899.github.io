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
    image: '/images/project-food.png',
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
    image: '/images/project-music.png',
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
    image: '/images/project-rental.png',
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
    image: '/images/project-ecommerce.png',
    color: 'from-purple-500/20 to-pink-500/20',
    accent: 'purple',
  },
  {
    id: 5,
    title: "Domino's Website Clone",
    description:
      "A responsive website clone using Figma, replicating Domino's UI with enhanced features. Modern design with improved user experience.",
    tech: ['Figma', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
    icon: Pizza,
    image: '/images/project-dominos.png',
    color: 'from-red-500/20 to-orange-500/20',
    accent: 'red',
  },
];

const ProjectGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.project-card');
    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
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

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            More Projects
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 sm:mb-16">
          Other
          <span className="text-white/60"> Works</span>
        </h2>

        {/* Projects grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative glass rounded-xl sm:rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                
                {/* Icon badge */}
                <div className={`absolute top-3 left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-${project.accent}-500/20 backdrop-blur-sm flex items-center justify-center`}>
                  <project.icon className={`w-4 sm:w-5 h-4 sm:h-5 text-${project.accent}-400`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-3 sm:mb-4 group-hover:text-white/70 transition-colors line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 sm:py-1 bg-white/5 text-white/60 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 sm:py-1 bg-white/5 text-white/40 text-xs rounded">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
