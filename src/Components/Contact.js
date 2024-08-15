import React from 'react'

function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact Me</h2>
          <div className="contact-content">
            <div className="column left">
              <div className="text">Get in Touch</div>
              <p>Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be a part of your visions. Email me with any questions or inquiries. I'll happy to answer your questions and set up a meeting with you.</p>
              <div className="icons">
    
                
                  <div className="row">
                    <i className="fa-solid fa-user-large"></i>
                    <div className="info">
                      <div className="head">Name</div>
                      <div className="sub-title text-#ccc">Manish Zade</div>
                    </div>
                  </div>
                
    
                <div className="row">
                  <i className="fa-solid fa-location-dot"></i>
                  <div className="info">
                    <div className="head"> Address</div>
                    <div className="sub-title"> Flat no 13, Vadgaon Budruk, Narhe road, <br/>
                      Pune Maharashtra-411041</div>
                  </div>
                </div>
    
                <div className="row">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="info">
                    <div className="head">Email</div>
                    <div className="sub-title"><a href="mailto:#" className=' text-decoration-none text-#ccc'> manishzademz7@gmail.com</a></div>
                  </div>
                </div>
    
                <div className="row">
                  <i className="bi bi-translate"></i>
                  <div className="info">
                    <div className="head">Language Known</div>
                    <div className="sub-title">Hindi, English, Marathi</div>
                  </div>
                </div>
    
                <br/>
    
                <div className="social-menu">
                  <ul>
                    <li><a href="https://github.com/zademanish"><i className="fa-brands fa-github"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/manish-zade-9a76bb13a"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a href="https://www.instagram.com/77x_manish_x77?utm_source=qr&igsh=MTl1eHlveXRsNzA1aQ=="><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href="#" title="Get Educate with Us"><i className="fa-solid fa-graduation-cap"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="column right">
              <div className="text">Message me</div>
              <form action="#">
                <div className="fields">
                  <div className="field name">
                    <input type="text" placeholder="Your Name" required/>
                  </div>
                  <div className="field email">
                    <input type="email" placeholder="Your Email" required/>
                  </div>
                </div>
                <div className="field">
                  <input type="text" placeholder="Subject" required/>
                </div>
                <div className="field textarea">
                  <textarea cols="30" rows="10" placeholder="Message.." required></textarea>
                </div>
                <div className="button-area">
                  <button type="submit">Send message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact