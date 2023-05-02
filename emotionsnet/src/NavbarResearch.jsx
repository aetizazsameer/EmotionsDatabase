//----------------------------------------------------------------------
// NavbarResearch.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import LogoutButton from './LogoutButton';

function NavbarResearch() {
  return (
    <nav>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/participant/presurvey">Contribute</Link></li>
        <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavbarResearch;
