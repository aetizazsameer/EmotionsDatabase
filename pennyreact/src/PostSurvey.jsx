//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Link from 'react-router-dom';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';

function PostSurvey() {
    return (
        <div>
            <PennyHeader />
            <Grid />
            <Link to="/">Home Page</Link>
            <PennyFooter />
        </div >
    );
}

export default PostSurvey;
