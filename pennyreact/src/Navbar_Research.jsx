import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

function Navbar_Research() {
  return (
    <nav>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/researcher">Research Home</Link></li>
        <li><Link to="/participant">Go to Participant</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar_Research;
