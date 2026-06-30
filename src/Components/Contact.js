import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Note: User needs to replace these with their own EmailJS credentials
    // serviceID, templateID, publicID
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          console.log(result.text);
          setStatus('Message sent successfully!');
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact Me</h2>
          <div className="contact-content">
            <div className="column left reveal-left">
              <div className="text">Get in Touch</div>
              <p>Feel free to reach out for collaborations or just a friendly hello!</p>
              <div className="icons">
                <div className="row">
                  <i className="fas fa-user"></i>
                  <div className="info">
                    <div className="head">Name</div>
                    <div className="sub-title">Manish Zade</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="info">
                    <div className="head">Address</div>
                    <div className="sub-title">Pune, India</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-envelope"></i>
                  <div className="info">
                    <div className="head">Email</div>
                    <div className="sub-title">manishzademz7@gmail.com</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-phone"></i>
                  <div className="info">
                    <div className="head">Phone</div>
                    <div className="sub-title">+91-7875707882</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column right reveal-right">
              <div className="text">Message Me</div>
              <form ref={form} onSubmit={sendEmail}>
                <div className="fields">
                  <div className="field name">
                    <input type="text" name="user_name" placeholder="Name" required />
                  </div>
                  <div className="field email">
                    <input type="email" name="user_email" placeholder="Email" required />
                  </div>
                </div>
                <div className="field">
                  <input type="text" name="subject" placeholder="Subject" required />
                </div>
                <div className="field textarea">
                  <textarea name="message" cols="30" rows="10" placeholder="Message.." required></textarea>
                </div>
                <div className="button-area">
                  <button type="submit" className="magnetic">Send Message</button>
                </div>
                {status && <p className="form-status">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact