//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Link from 'react-router-dom';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';

function PreSurvey() {
    return (
        <div>
            <PennyHeader />
            <Grid />
            <Link to="/participant/video">Video Page</Link>
            <PennyFooter />
        </div>
    );
}

export default PreSurvey;
