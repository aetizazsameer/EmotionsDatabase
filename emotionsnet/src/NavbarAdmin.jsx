//----------------------------------------------------------------------
// NavbarAdmin.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import './Navbar.css';
import logo from './logo.png';
import LogoutButton from './LogoutButton';

function NavbarAdmin() {
  return (
    <nav>
      <div className="logo">
        <a href="/"><img src={logo} alt="Logo" /></a>
      </div>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/researcher">Data</a></li>
        <li><a href="/participant/presurvey">Contribute</a></li>
        <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
