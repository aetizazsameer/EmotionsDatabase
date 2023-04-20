//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';

import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';
import './Participant.css';

function Participant() {
    return (
        <div className="Participant">
            <h1>Welcome to Emotions Net!</h1>
            <p>Thank you for visiting our booth.</p>
            <Link to="/participant/presurvey" className="my-button">Click Here to Begin</Link>
        </div>
    );
}

export default Participant;
