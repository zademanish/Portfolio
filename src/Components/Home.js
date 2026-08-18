import React, { useEffect, useRef } from 'react';
import TypingText from './TypingText';

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const homeSection = homeRef.current;
    if (!homeSection) return undefined;

    // The spotlight repaints a full-viewport radial gradient, so it is not
    // worth running where it cannot be seen or is not wanted.
    const skip =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip) return undefined;

    let rect = homeSection.getBoundingClientRect();
    let frame = 0;
    let latest = null;

    // getBoundingClientRect() forces a synchronous layout. Reading it on every
    // mousemove — as this used to — meant layout thrashing at pointer rate;
    // caching it and refreshing on scroll/resize costs a fraction of that.
    const measure = () => {
      rect = homeSection.getBoundingClientRect();
    };

    const handlePointerMove = (event) => {
      latest = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = ((latest.clientX - rect.left) / rect.width) * 100;
        const y = ((latest.clientY - rect.top) / rect.height) * 100;
        homeSection.style.setProperty('--mouse-x', `${x}%`);
        homeSection.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    homeSection.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      homeSection.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section className="home" id="home" ref={homeRef}>
      <div className="particles" aria-hidden="true">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-width">
        <div className="home-content">
          <div className="text-1 shimmer">Hello, This is</div>
          <h1 className="text-2 shimmer">Manish Zade</h1>
          <div className="text-3">And I'm a <TypingText className="typing" /></div>
          <a href="#contact" className="magnetic">Hire me</a>
        </div>
      </div>
    </section>
  );
}

export default Home;
