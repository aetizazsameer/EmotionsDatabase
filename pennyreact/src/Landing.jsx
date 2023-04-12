//----------------------------------------------------------------------
// landing.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';

function Landing() {
    return (
        <div>
            <PennyHeader />
            <a href="/admin">Admin login</a>
            <br />
            <a href="/researcher">Researcher login</a>
            <br />
            <a href="/participant">Participant login</a>
            <br />
            <PennyFooter />
        </div >
    );
}

export default Landing;