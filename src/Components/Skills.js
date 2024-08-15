import React from 'react'

function Skills() {
  return (
    <>
    <section className="skills" id="skills">
        <div className="max-width">
          <h2 className="title">My Skills</h2>
          <div className="skills-content">
            <div className="column left">
    
              <div className="text">INTERNSHIP</div>
              <p>
                <li className="intern">#Company Name "Where You work"</li>
                <li className="intern">#Company Name "Where You work"</li>
                <li className="intern">#Company Name "Where You work"</li>
              </p>
    
              <br/>
              <div className="text">PROJECT</div>
    
              <p>
                <li className="project">Portfolio (HTML, CSS, js, React, Bootstraps)</li>
                <li className="project">eCommerce Website (Shopify liquid-code, HTML, CSS)</li>
                <li className="project">QuickShop - eCommerce Website (Shopzen application.)</li>
                <li className="project">Fully Responsive Design Email Subscribe form</li>
                <li className="project">Blog (HTML, CSS, Bootstraps)</li>
              </p>
    
              <br/>
              <div className="text">DEVELOPMENT SKILLS</div>
    
              <p>
                I'm familiar & work on a daily basis with HTML, CSS, JavaScript, Bootstrap, React js and other modern frameworks.
              </p>
              <a href="#" target="blank">Get Educate...</a>
            </div>
            <div className="column right">
              <div className="bars">
                <div className="info">
                  <span>JavaScript</span>
                  <span>90%</span>
                </div>
                <div className="line javaScript"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>HTML</span>
                  <span>80%</span>
                </div>
                <div className="line html"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>CSS</span>
                  <span>75%</span>
                </div>
                <div className="line css"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>NodeJs</span>
                  <span>60%</span>
                </div>
                <div className="line node"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>Bootstraps</span>
                  <span>70%</span>
                </div>
                <div className="line bootstraps"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>ReactJs</span>
                  <span>65%</span>
                </div>
                <div className="line react"></div>
              </div>
              <div className="bars">
                <div className="info">
                  <span>MongoDb</span>
                  <span>65%</span>
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