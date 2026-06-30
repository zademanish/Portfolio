import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Skills from './Components/Skills';
import Project from './Components/Project';
import Github from './Components/Github';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const mainRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (window.$ && window.$(".carousel").length > 0) {
        window.$(".carousel").owlCarousel({
          margin: 20,
          loop: true,
          autoplay: true,
          autoplayTimeOut: 2000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false }
          }
        });
      }
      ScrollTrigger.refresh();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    let ctx = gsap.context(() => {
      gsap.utils.toArray('section').forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray('.services .card, .projects .card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = (y - rect.height / 2) / 10;
          const rotateY = (rect.width / 2 - x) / 10;
          gsap.to(card, { rotateX, rotateY, scale: 1.05, duration: 0.5 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5 });
        });
      });

      gsap.utils.toArray('.magnetic').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
      });

      gsap.to('#progressBar', {
        width: '100%',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Skills Section Stagger Reveal
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
          }
        }
      );

      ScrollTrigger.create({
        trigger: '.skills',
        start: 'top 75%',
        onEnter: () => {
          const skillsSection = document.querySelector('.skills');
          if (skillsSection) skillsSection.classList.add('reveal');
        }
      });
    }, mainRef);

    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursorBlur');
    const handleMouseMoveCursor = (e) => {
      if (cursor && cursorBlur) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursorBlur, { x: e.clientX - 150, y: e.clientY - 150, duration: 0.8 });
      }
    };
    window.addEventListener('mousemove', handleMouseMoveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMoveCursor);
      ctx.revert();
    };
  }, [loading]);

  return (
    <div ref={mainRef} className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <div id="preloader" style={{ display: loading ? 'flex' : 'none', pointerEvents: loading ? 'all' : 'none' }}>
        <div className="loader-content">
          <h1 className="loader-text">MANISH ZADE</h1>
          <div className="loader-bar"></div>
        </div>
      </div>

      <div id="progressBarContainer"><div id="progressBar"></div></div>
      <div id="cursor"></div>
      <div id="cursorBlur"></div>

      <div className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '🌞' : '🌙'}
      </div>

      <Navbar />
      <Home />
      <About />
      <Services />
      <Skills />
      <Project />
      <Github />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
