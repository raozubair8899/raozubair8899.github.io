import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, User, Briefcase, Code2, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'projects', icon: Code2, label: 'Projects' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const FloatingDock = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show dock after scrolling past hero
    ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    // Track active section
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === document.body || sections.includes(st.vars.trigger as string)) {
          st.kill();
        }
      });
    };
  }, []);

  // Magnetic effect for dock items
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={dockRef}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              data-cursor-hover
            >
              <item.icon className="w-5 h-5" />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingDock;
