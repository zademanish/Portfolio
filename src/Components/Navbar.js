import React, { useEffect, useState } from 'react';
import { scrollToTarget, setScrollEnabled } from '../lib/smoothScroll';

const LINKS = [
  ['#home', 'Home'],
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#skills', 'Skills'],
  ['#projects', 'Projects'],
  ['#github', 'GitHub'],
  ['#contact', 'Contact'],
];

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Replaces the jQuery handler in public/Script.js, which re-queried the DOM
  // with $(".navbar") on every single scroll event. This coalesces to one
  // frame and React skips the render entirely when the flags do not change.
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setSticky(y > 20);
        setShowScrollTop(y > 500);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock the page behind the open mobile menu.
  useEffect(() => {
    setScrollEnabled(!menuOpen);
    return () => setScrollEnabled(true);
  }, [menuOpen]);

  // Anchor clicks route through Lenis. A native hash jump would move
  // window.scrollY without telling Lenis, leaving the two out of sync.
  const handleNavClick = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <button
        type="button"
        className={`scroll-up-btn${showScrollTop ? ' show' : ''}`}
        onClick={() => scrollToTarget(0, { offset: 0 })}
        aria-label="Scroll back to top"
      >
        <i className="fas fa-angle-up" aria-hidden="true"></i>
      </button>

      <nav className={`navbar${sticky ? ' sticky' : ''}`}>
        <div className="max-width">
          <div className="logo">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
              <span>PORTFOLIO</span><span>.com</span>
            </a>
          </div>

          <ul className={`menu${menuOpen ? ' active' : ''}`}>
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={(e) => handleNavClick(e, href)}>
                  <strong>{label}</strong>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
