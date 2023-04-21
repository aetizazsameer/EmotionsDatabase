//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Grid from './Grid_post';
import Navbar from './Navbar';

function PostSurvey() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="instructions">
                    <h1>Instructions</h1>
                    <p>Select on the grid where it best fits your current emotions after the video.</p>
                    <p>
                    Valence is a measure of how positive or negative an emotion is.
                    The left represents negative valence and the right represents positive valence.
                    </p>
                    <p>
                    Arousal is defined as a state of alertness and activation in your body that is linked to an emotion.
                    The top represents emotions that are high arousal and the bottom represents emotions that are low arousal:
                    </p>
                </div>
                <div className="grid">
                    <Grid />
                </div>
            </div>
        </div>
    );
}

export default PostSurvey;
