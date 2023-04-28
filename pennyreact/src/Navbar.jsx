import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;
