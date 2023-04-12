//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';

function Participant() {
    return (
        <div>
            <PennyHeader />
            <Link to="/participant/presurvey">Start</Link>
            <PennyFooter />
        </div >
    );
}

export default Participant;
