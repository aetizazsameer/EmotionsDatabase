//----------------------------------------------------------------------
// Landing.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Navbar from './Navbar';
import Logo from './Logo'

function Landing() {
    return (
        <div className="page-container">
            <Navbar />
            <div className="Landing">
                <Logo />
                <h1>Welcome to Emotions Net!</h1>
                <p>Thank you for contributing to our research. Learn more about our mission <a href='/about'>here</a>.</p>
                <span>
                    <Link to="/participant/presurvey" className="participant-button">Contribute</Link>
                    <Link to="/researcher" className="researcher-button">View data</Link>
                </span>
            </div>
        </div>
    );
}

export default Landing;