import React from 'react'

function Footer() {
  return (
    <footer>
      <span>
        <a href="#home"> Manish Zade</a> | <span className="far fa-copyright" aria-hidden="true"></span> {new Date().getFullYear()} All Rights Reserved. Privacy Policy
      </span>
    </footer>
  )
}

export default Footer