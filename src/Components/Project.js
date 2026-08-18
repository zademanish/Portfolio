import React from 'react'

function Project() {
  return (
    <>
      <section className="projects" id="projects">
        <div className="max-width">
          <h2 className="title">My Projects</h2>
          {/* Owl Carousel removed: it pulled in jQuery + Owl (~120KB) to lay
              out four static cards. A CSS grid does the same job for free and
              stops jQuery from fighting Lenis over the scroll position. */}
          <div className="carousel">
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&auto=format&fit=crop&q=60"
                  alt="ShopNow"
                  width="150"
                  height="150"
                  loading="lazy"
                  decoding="async"
                />
                <div className="text">ShopNow</div>
                <div className="badges">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Tailwind</span>
                </div>
                <p>
                  Full-stack eCommerce platform with 40+ products, secure PayPal payments, and RESTful APIs (Node.js, Express, MongoDB).
                </p>
                <div className="wrap">
                  <div className="fill-wrap">
                    <a href="https://ecommerce-app-frontend-psi-five.vercel.app/" className="btn btn-color btn-l-r" target="_blank" rel="noreferrer">Live Demo</a>
                    <a href="https://github.com/zademanish/Ecommerce-App" className="btn btn-color btn-l-r" target="_blank" rel="noreferrer" style={{ marginTop: '10px' }}>GitHub</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&auto=format&fit=crop&q=60"
                  alt="Vybe"
                  width="150"
                  height="150"
                  loading="lazy"
                  decoding="async"
                />
                <div className="text">Vybe</div>
                <div className="badges">
                  <span>React</span>
                  <span>Express</span>
                  <span>WebSockets</span>
                  <span>Cloudinary</span>
                </div>
                <p>
                  Social platform with posts, likes, reels, comments, and real-time media uploads using Cloudinary and WebSockets.
                </p>
                <div className="wrap">
                  <div className="fill-wrap">
                    <a href="https://vybe-frontend-x5it.onrender.com" className="btn btn-color btn-l-r" target="_blank" rel="noreferrer">Live Demo</a>
                    <a href="https://github.com/zademanish/Vybe-Social-Media" className="btn btn-color btn-l-r" target="_blank" rel="noreferrer" style={{ marginTop: '10px' }}>GitHub</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=60"
                  alt="Kavach"
                  width="150"
                  height="150"
                  loading="lazy"
                  decoding="async"
                />
                <div className="text">Kavach</div>
                <div className="badges">
                  <span>MERN Stack</span>
                  <span>Redis</span>
                  <span>Socket.io</span>
                </div>
                <p>
                  Real-time communication platform (MERN) with Redis caching, WebSockets, and optimized MongoDB queries.
                </p>
                <div className="wrap">
                  <div className="fill-wrap">
                    {/* Not a link — href="#" jumped the page to the top. */}
                    <span className="btn btn-color btn-l-r btn-disabled">Private Repo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=60"
                  alt="Portfolio"
                  width="150"
                  height="150"
                  loading="lazy"
                  decoding="async"
                />
                <div className="text">Portfolio</div>
                <div className="badges">
                  <span>React</span>
                  <span>GSAP</span>
                  <span>Lenis</span>
                </div>
                <p>
                  Award-winning animated portfolio with GSAP, ScrollTrigger, Lenis smooth scrolling, and custom 3D interactions.
                </p>
                <div className="wrap">
                  <div className="fill-wrap">
                    <span className="btn btn-color btn-l-r btn-disabled">Current Site</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Project
