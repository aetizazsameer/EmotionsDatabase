//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';
import Video from './Video';

function Participant() {
    return (
        <div>
            <PennyHeader />
            <Video />
            <PennyFooter />
        </div >
    );
}

export default Participant;
