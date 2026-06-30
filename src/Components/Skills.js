import React from 'react'

function Skills() {
  return (
    <>
    <section className="skills" id="skills">
        <div className="max-width">
          <h2 className="title">My Skills & Journey</h2>
          <div className="skills-content">
            <div className="column left reveal-left">
              <div className="text">PROFESSIONAL JOURNEY</div>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">Feb 2026 - Present</div>
                  <div className="timeline-content">
                    <h3>KAYCOMM SERVICES PVT LTD</h3>
                    <p>MERN Stack Developer</p>
                    <small>Developed Ledger Documentation System and implemented granular permission control for HRMS project. Enhanced Urban Pillar platform with Vastu checks and location mapping.</small>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">Jul 2025 - Jan 2026</div>
                  <div className="timeline-content">
                    <h3>TechnoNexis</h3>
                    <p>MERN Stack Intern</p>
                    <small>Developed multi-role dashboards and mall navigation systems with QR scanning and real-time shop location display.</small>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">2022 - 2024</div>
                  <div className="timeline-content">
                    <h3>MCA Degree</h3>
                    <p>Suryadatta Institute, Pune</p>
                    <small>Master of Computer Applications | CGPA: 7.40</small>
                  </div>
                </div>
              </div>

              <br/>
              <div className="text">DEVELOPMENT SKILLS</div>
              <p>
                <strong>Frontend:</strong> React.js, Redux, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap.<br/>
                <strong>Backend:</strong> Node.js, Express.js, RESTful APIs, WebSockets, Socket.io, Redis, Auth.<br/>
                <strong>Tools:</strong> MongoDB, Mongoose, Docker, Git, GitHub, Cloudinary, Postman, VS Code, npm.
              </p>
            </div>
            <div className="column right reveal-right">
              <div className="bars">
                <div className="info">
                  <span>MERN Stack</span>
                  <span>90%</span>
                </div>
                <div className="line javaScript"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>React.js / Redux</span>
                  <span>85%</span>
                </div>
                <div className="line html"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Node.js / Express</span>
                  <span>80%</span>
                </div>
                <div className="line css"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Redis / WebSockets</span>
                  <span>75%</span>
                </div>
                <div className="line node"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>MongoDB / SQL</span>
                  <span>80%</span>
                </div>
                <div className="line bootstraps"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Tailwind / Bootstrap</span>
                  <span>85%</span>
                </div>
                <div className="line react"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Docker / Git</span>
                  <span>70%</span>
                </div>
                <div className="line mongodb"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Skills