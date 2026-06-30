import React, { useEffect, useRef } from 'react'

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!homeRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = homeRef.current.getBoundingClientRect();
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;
      
      homeRef.current.style.setProperty('--mouse-x', `${x}%`);
      homeRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const homeSection = homeRef.current;
    if (homeSection) {
      homeSection.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (homeSection) {
        homeSection.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      <section className="home" id="home" ref={homeRef}>
        <div className="particles">
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
            <div className="text-2 shimmer">Manish Zade</div>
            <div className="text-3">And I'm a <span className="typing"></span></div>
            <a href="#contact" className="magnetic">Hire me</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home