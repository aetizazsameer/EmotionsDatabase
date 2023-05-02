//----------------------------------------------------------------------
// NavbarAdmin.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import LogoutButton from './LogoutButton';

function NavbarAdmin() {
  return (
    <nav>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/admin">Admin panel</Link></li>
        <li><Link to="/researcher">Researcher view</Link></li>
        <li><Link to="/participant/presurvey">Contribute</Link></li>
        <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
