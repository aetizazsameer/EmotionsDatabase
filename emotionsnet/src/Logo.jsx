//----------------------------------------------------------------------
// Logo.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import logo from './logo_black.png';
import './Logo.css';

function Logo() {
  return (
    <nav className="Navbar">
      <a href="/index" className="Navbar__logo-link">
        <img src={logo} alt="Logo" className="Navbar__logo" />
      </a>
    </nav>
  );
}

export default Logo;