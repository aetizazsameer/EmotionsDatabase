//----------------------------------------------------------------------
// Landing.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import './Landing.css';
import Navbar from './Navbar';
import Logo from './Logo'

function Landing() {
    return (
        <div className="page-container">
            <Navbar />
            <div className="Landing">
                <Logo />
                <h1>Welcome to EmotionsNet!</h1>
                <p>Thank you for contributing to our research. Learn more about our mission <a href='/about'>here</a>.</p>
                <span>
                    <a href="/participant/presurvey" className="participant-button">Contribute</a>
                    <a href="/researcher" className="researcher-button">View data</a>
                </span>
            </div>
        </div>
    );
}

export default Landing;