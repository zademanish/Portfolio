import React, { useEffect, useRef, useState } from 'react';
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
import { setLenis, scrollToTarget } from './lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Touch devices get native scrolling: smooth-scroll hijacking feels wrong on
// them, and the pointer effects below have no meaning without a hover state.
const isTouchDevice = () =>
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const mainRef = useRef(null);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);

  // Preloader: dismiss on the real load event instead of a blind 2s timer, so
  // fast connections are not held back and slow ones are not cut off early.
  useEffect(() => {
    let settle;
    const finish = () => {
      // Small floor so the loader animation does not just flash and vanish.
      settle = setTimeout(() => setLoading(false), 350);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    // Hard cap: never let one slow third-party asset hold the page hostage.
    const cap = setTimeout(() => setLoading(false), 2500);

    return () => {
      clearTimeout(settle);
      clearTimeout(cap);
      window.removeEventListener('load', finish);
    };
  }, []);

  useEffect(() => {
    if (loading) return undefined;

    const reduceMotion = prefersReducedMotion();
    const touch = isTouchDevice();
    const cleanups = [];

    /* ---------------------------------------------------------------- *
     * Smooth scroll
     * ---------------------------------------------------------------- */
    if (!reduceMotion && !touch) {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      setLenis(lenis);

      // Named function so it can actually be removed again. The previous
      // version passed an inline arrow to gsap.ticker.add and never removed
      // it, so every re-run of this effect (React StrictMode mounts twice,
      // and the preloader flips `loading`) left another RAF loop driving an
      // already-destroyed Lenis instance. Those orphaned loops are what made
      // scrolling stutter and eventually stop responding.
      const raf = (time) => lenis.raf(time * 1000);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanups.push(() => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        setLenis(null);
      });
    }

    /* ---------------------------------------------------------------- *
     * Scroll-driven animations
     * ---------------------------------------------------------------- */
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.utils.toArray('section').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                // `once` disposes the trigger after it fires. The old
                // toggleActions kept every trigger alive and re-measured on
                // each scroll for animations that could never play again.
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        gsap.fromTo(
          '.timeline-item',
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.timeline', start: 'top 85%', once: true },
          }
        );
      }

      // Reading progress. Driven with scaleX rather than width: width forces
      // a layout pass on every scroll frame, a transform does not.
      gsap.to('#progressBar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: '.skills',
        start: 'top 78%',
        once: true,
        onEnter: () => document.querySelector('.skills')?.classList.add('reveal'),
      });
    }, mainRef);

    /* ---------------------------------------------------------------- *
     * Pointer effects
     * ---------------------------------------------------------------- */

    // Caches each element's rect on pointerenter and throttles moves to one
    // frame. Previously every mousemove called getBoundingClientRect() (a
    // forced synchronous layout) and spawned a brand new tween, so a single
    // hover could queue hundreds of competing tweens per second.
    const attachPointerEffect = (elements, onMove, onLeave) => {
      elements.forEach((el) => {
        let rect = null;
        let frame = 0;
        let latest = null;

        const enter = () => {
          rect = el.getBoundingClientRect();
        };
        const move = (event) => {
          if (!rect) rect = el.getBoundingClientRect();
          latest = event;
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            onMove(el, latest, rect);
          });
        };
        const leave = () => {
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
          rect = null;
          onLeave(el);
        };

        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointermove', move, { passive: true });
        el.addEventListener('pointerleave', leave);

        // These listeners live outside gsap.context on purpose: ctx.revert()
        // only reverts animations, it never removes event listeners.
        cleanups.push(() => {
          if (frame) cancelAnimationFrame(frame);
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });
    };

    if (!reduceMotion && !touch) {
      attachPointerEffect(
        gsap.utils.toArray('.services .card, .projects .card'),
        (el, event, rect) => {
          gsap.to(el, {
            rotateX: (event.clientY - rect.top - rect.height / 2) / 12,
            rotateY: (rect.width / 2 - (event.clientX - rect.left)) / 12,
            scale: 1.04,
            duration: 0.4,
            overwrite: 'auto',
          });
        },
        (el) =>
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            overwrite: 'auto',
          })
      );

      attachPointerEffect(
        gsap.utils.toArray('.magnetic'),
        (el, event, rect) => {
          gsap.to(el, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.3,
            y: (event.clientY - rect.top - rect.height / 2) * 0.3,
            duration: 0.3,
            overwrite: 'auto',
          });
        },
        (el) =>
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto',
          })
      );

      // Custom cursor. quickSetter/quickTo write straight to the element
      // instead of allocating a tween object per mouse event.
      const cursor = document.getElementById('cursor');
      const cursorBlur = document.getElementById('cursorBlur');

      if (cursor && cursorBlur) {
        const setX = gsap.quickSetter(cursor, 'x', 'px');
        const setY = gsap.quickSetter(cursor, 'y', 'px');
        const blurX = gsap.quickTo(cursorBlur, 'x', { duration: 0.6, ease: 'power3' });
        const blurY = gsap.quickTo(cursorBlur, 'y', { duration: 0.6, ease: 'power3' });

        let frame = 0;
        let px = 0;
        let py = 0;

        const onPointerMove = (event) => {
          px = event.clientX;
          py = event.clientY;
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            setX(px);
            setY(py);
            blurX(px - 130);
            blurY(py - 130);
          });
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        // Scopes `cursor: none` to devices that actually have the custom
        // cursor, instead of hiding the pointer for everyone.
        document.body.classList.add('has-custom-cursor');

        cleanups.push(() => {
          if (frame) cancelAnimationFrame(frame);
          window.removeEventListener('pointermove', onPointerMove);
          document.body.classList.remove('has-custom-cursor');
        });
      }
    }

    /* ---------------------------------------------------------------- *
     * In-page anchors
     * ---------------------------------------------------------------- */

    // Delegated so links anywhere in the tree ("Hire me", the footer) scroll
    // through Lenis. A native hash jump would move window.scrollY without
    // Lenis knowing, and the two then fight over the scroll position.
    const onAnchorClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || event.defaultPrevented) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') {
        // Placeholder links ("Private Repo") should do nothing at all rather
        // than jump the page to the top.
        event.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
    };

    document.addEventListener('click', onAnchorClick);
    cleanups.push(() => document.removeEventListener('click', onAnchorClick));

    /* ---------------------------------------------------------------- *
     * Keep measurements honest
     * ---------------------------------------------------------------- */

    // The GitHub section mounts after its API call resolves and remote images
    // settle later still, both of which change the document height by
    // thousands of pixels. Without a refresh every ScrollTrigger keeps its
    // stale start/end, so sections stay stuck at opacity 0 and the progress
    // bar desyncs. This was the second half of the scrolling bug.
    let refreshTimer;
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);
    window.addEventListener('load', scheduleRefresh);
    document.fonts?.ready.then(scheduleRefresh).catch(() => {});

    cleanups.push(() => {
      clearTimeout(refreshTimer);
      observer.disconnect();
      window.removeEventListener('load', scheduleRefresh);
    });

    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [loading]);

  return (
    <div ref={mainRef} className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      {loading && (
        <div id="preloader">
          <div className="loader-content">
            <h1 className="loader-text">MANISH ZADE</h1>
            <div className="loader-bar"></div>
          </div>
        </div>
      )}

      <div id="progressBarContainer"><div id="progressBar"></div></div>
      <div id="cursor"></div>
      <div id="cursorBlur"></div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>

      <Navbar />
      <main>
        <Home />
        <About />
        <Services />
        <Skills />
        <Project />
        <Github />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
