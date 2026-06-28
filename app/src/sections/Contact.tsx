import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Quote } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

// Literature-inspired closing quote
const closingQuote = "The journey of a thousand miles begins with a single line of code.";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
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
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Form reveal
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Quote reveal
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 sm:py-20 md:py-24 lg:py-32"
      id="contact"
    >
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[400px] sm:h-[500px] md:h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/30" />
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Contact
          </span>
        </div>

        {/* Closing quote */}
        <div ref={quoteRef} className="mb-10 sm:mb-16 text-center">
          <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white/20 mx-auto mb-3 sm:mb-4" />
          <p className="text-white/40 text-sm sm:text-base italic max-w-xl mx-auto">
            &ldquo;{closingQuote}&rdquo;
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-24">
          {/* Left content */}
          <div ref={contentRef}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Let&apos;s Build
              <br />
              <span className="text-white/60">Together</span>
            </h2>

            <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Have a project in mind or want to collaborate? I&apos;m always open
              to discussing new opportunities, creative ideas, or ways to bring
              your vision to life.
            </p>

            {/* Contact info */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <a
                href="mailto:raozubair8899@gmail.com"
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white/40 text-xs sm:text-sm block">Email</span>
                  <span className="text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                    raozubair8899@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+923218725013"
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white/40 text-xs sm:text-sm block">Phone</span>
                  <span className="text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                    +92 321 8725013
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-white/60" />
                </div>
                <div>
                  <span className="text-white/40 text-xs sm:text-sm block">Location</span>
                  <span className="text-white text-sm sm:text-base">Rawalpindi, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://linkedin.com/in/rao-muhammad-zubair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="https://github.com/raozubair8899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 space-y-5 sm:space-y-6"
          >
            <div>
              <label className="text-white/40 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-xs sm:text-sm mb-1.5 sm:mb-2 block">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-white text-[#050505] rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors group text-sm sm:text-base"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-20 sm:mt-24 md:mt-32 pt-8 sm:pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <span className="text-white font-semibold text-base sm:text-lg">
                Rao Muhammad Zubair
              </span>
              <p className="text-white/40 text-xs sm:text-sm">
                Full-Stack Developer | AI/ML Enthusiast
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="#about"
                className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="text-white/40 text-xs sm:text-sm">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
