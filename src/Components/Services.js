import React from 'react'

function Services() {
  return (
    <section className="services" id="services">
    <div className="max-width">
      <h2 className="title">My services</h2>
      <div className="serv-content">
        <div className="card">
          <div className="box">
            <i className="fas fa-laptop-code"></i>
            <div className="text">Web Design</div>
            <p>Your Next Web Developer, who is working in Shopify Dropshipping Stores, High Converting Ecommerce stores, Product Page also having Custom code, liquid template design.</p>
          </div>
        </div>
        <div className="card">
          <div className="box">
            <i className="fas fa-user-secret"></i>
            <div className="text">User Secret</div>
            <p>I ensures that, there is no sensitive data included in the source code and are stored outside of the project folder. And all the data which is stored by User Secrets is not encrypted.</p>
          </div>
        </div>
        <div className="card">
          <div className="box">
            <i className="fas fa-code"></i>
            <div className="text">Apps Design</div>
            <p>I encompasses both the user interface(UI) & user experience(UX). The overall style of the app, including things like the colour scheme, font selection, and the types of buttons and widgets which will use.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Services