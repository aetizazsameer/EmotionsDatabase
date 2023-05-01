//----------------------------------------------------------------------
// PostSurvey.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState } from 'react';
import GridPost from './GridPost';
import Navbar from './Navbar';
import InstructionsPopup from './InstructionsPopup';

function PostSurvey() {
    const [showPopup, setShowPopup] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="instructions">
                    <h1>Post-Video Survey</h1>
                    <h2>Instructions</h2>
                    <p>Select on the grid where it best fits your current emotions after the video.</p>
                    <p>
                    Valence is a measure of how positive or negative an emotion is.
                    The left represents negative valence and the right represents positive valence.
                    </p>
                    <p>
                    Arousal is defined as a state of alertness and activation in your body that is linked to an emotion.
                    The top represents emotions that are high arousal and the bottom represents emotions that are low arousal.
                    </p>
                    <b>
                    Click Submit when finished.
                    </b>
                    <p></p>
                    <button
                        className="show-full-instructions"
                        onClick={() => setShowPopup(true)}
                    >
                        Show Full Instructions
                    </button>
                </div>
                <div className="grid">
                    <GridPost />
                </div>
            </div>
            {showPopup && (
                <InstructionsPopup
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    closePopup={closePopup}
                />
            )}
        </div>
    );
}

export default PostSurvey;
