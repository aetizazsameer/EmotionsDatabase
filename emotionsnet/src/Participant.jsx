//----------------------------------------------------------------------
// Participant.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Participant.css';
import Navbar from './Navbar';
import Logo from './Logo'

function Participant() {
    return (
        <div className="page-container">
            <Navbar />
            <div className="Participant">
                <Logo />
                <h1>Welcome to Emotions Net!</h1>
                <p>Thank you for visiting.</p>
                <Link to="/participant/presurvey" className="my-button">Click Here to Begin</Link>
            </div>
        </div>
    );
}

export default Participant;
