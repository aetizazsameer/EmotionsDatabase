//----------------------------------------------------------------------
// Navbar.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import './Navbar.css';
import logo from './logo.png';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <a href="/"><img src={logo} alt="Logo" /></a>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/researcher">Data</a></li>
        <li><a href="/participant/presurvey">Contribute</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
