import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/participant" className="Navbar__logo-link">
        <img src={logo} alt="Logo" className="Navbar__logo" />
      </Link>
    </nav>
  );
}

export default Navbar;
