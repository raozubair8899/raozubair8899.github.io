import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import FeaturedProject from './sections/FeaturedProject';
import ProjectGrid from './sections/ProjectGrid';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import FloatingDock from './sections/FloatingDock';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if touch device - disable Lenis on mobile for better performance
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouch) {
      // Initialize Lenis smooth scroll only on desktop
      lenisRef.current = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#050505] min-h-screen">
      <CustomCursor />
      
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <FeaturedProject />
        <ProjectGrid />
        <Skills />
        <Contact />
      </main>
      
      <FloatingDock />
    </div>
  );
}

export default App;
