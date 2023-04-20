//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import './Participant.css';
import Navbar from './Navbar';

function Participant() {
    return (
        <div className="Participant">
            <Navbar />
            <h1>Welcome to Emotions Net!</h1>
            <p>Thank you for visiting our booth.</p>
            <Link to="/participant/presurvey" className="my-button">Click Here to Begin</Link>
        </div>
    );
}

export default Participant;
