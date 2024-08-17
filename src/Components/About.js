import React from 'react'
import resume from '../Assets/M-Z resume (1).pdf'

function About() {
  return (
    <>
     <section class="about" id="about">
        <div class="max-width">
          <h2 class="title">About Me</h2>
          <div class="about-content">
            <div class="column left">
              <img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile Image 626x626"/>
            </div>
            <div class="column right">
              <div class="text">I'm Manish and I'm a <span class="typing-2"></span></div>
              <p>Seeking an entry-level opportunity with an esteemed organization where I can utilize my skills & enhance learning in the field of work. Capable of mastering new technologies.</p>
              <br/>
              <div class="text">Why Work With Me</div>
              <p>I'm a great communicator & love to invest the necessary time to understand the customer's problem very well.</p>
    
              <a href={resume} download='resume'>Download CV</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
