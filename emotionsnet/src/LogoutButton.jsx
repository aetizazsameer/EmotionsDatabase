//----------------------------------------------------------------------
// LogoutButton.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './LogoutButton.css';

function LogoutButton() {
    return (
        <Link to="/logoutapp" className="logout-button">Logout</Link>
    );
}

export default LogoutButton;
