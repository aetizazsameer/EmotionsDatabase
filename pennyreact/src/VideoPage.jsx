//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';
import Video from './Video';

function VideoPage() {
    return (
        <div>
            <PennyHeader />
            <Video />
            <Link to="/participant/postsurvey">Video Page</Link>
            <PennyFooter />
        </div >
    );
}

export default VideoPage;
