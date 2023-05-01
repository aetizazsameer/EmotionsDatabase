//----------------------------------------------------------------------
// Navbar.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/researcher">Go to Research</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;