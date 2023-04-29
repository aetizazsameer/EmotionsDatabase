import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

function Navbar_Admin() {
  return (
    <nav>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/admin">Admin Home</Link></li>
        <li><Link to="/researcher">Go to Research</Link></li>
        <li><Link to="/participant">Go to Participant</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar_Admin;
