//----------------------------------------------------------------------
// VideoPage.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React from 'react';
import Video from './Video';
import Navbar from './Navbar';

function VideoPage() {
    return (
        <div>
            <Navbar />
            <div className="video-page">
                <h2>Please watch the video until the end.</h2>
                <div className="video-wrapper">
                    <Video />
                </div>
            </div>
        </div>
    );
}

export default VideoPage;