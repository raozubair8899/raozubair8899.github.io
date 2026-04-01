import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';
import ResumeDownloadButton from '@/components/ResumeDownloadButton';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32"
      id="contact"
    >
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            Contact
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left content */}
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s Build
              <br />
              <span className="text-white/60">Together</span>
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Have a project in mind or want to collaborate? I&apos;m always open
              to discussing new opportunities, creative ideas, or ways to bring
              your vision to life.
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-10">
              <a
                href="mailto:raozubair8899@gmail.com"
                className="flex items-center gap-4 group"
                data-cursor-hover
              >
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white/40 text-sm block">Email</span>
                  <span className="text-white group-hover:text-blue-400 transition-colors">
                    raozubair8899@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+923218725013"
                className="flex items-center gap-4 group"
                data-cursor-hover
              >
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white/40 text-sm block">Phone</span>
                  <span className="text-white group-hover:text-blue-400 transition-colors">
                    +92 321 8725013
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <span className="text-white/40 text-sm block">Location</span>
                  <span className="text-white">Rawalpindi, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://linkedin.com/in/rao-muhammad-zubair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all group"
                data-cursor-hover
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/raozubair8899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all group"
                data-cursor-hover
              >
                <Github className="w-5 h-5" />
              </a>

              <ResumeDownloadButton
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-none"
                label="Resume"
              />
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 md:p-10 space-y-6"
          >
            <div>
              <label className="text-white/40 text-sm mb-2 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-sm mb-2 block">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-[#050505] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors group"
              data-cursor-hover
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-white font-semibold text-lg">
                Rao Muhammad Zubair
              </span>
              <p className="text-white/40 text-md">
                Full-Stack Developer | AI/ML Enthusiast 
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#about"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="text-white/40 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
