//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import Video from './Video';
import Navbar from './Navbar';

function VideoPage() {
    return (
        <div>
            <Navbar />
            <Video />
            <Link to="/participant/postsurvey">Post-survey</Link>
        </div>
    );
}

export default VideoPage;
