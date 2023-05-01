//----------------------------------------------------------------------
// Logo.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo_black.png';
import './Logo.css';

function Logo() {
  return (
    <nav className="Navbar">
      <Link to="/participant" className="Navbar__logo-link">
        <img src={logo} alt="Logo" className="Navbar__logo" />
      </Link>
    </nav>
  );
}

export default Logo;