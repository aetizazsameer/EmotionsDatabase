//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React, { useState } from 'react';
import Grid from './Grid';
import './PreSurvey.css';
import Navbar from './Navbar';
import InstructionsPopup from './InstructionsPopup';

function PreSurvey() {
    const [showPopup, setShowPopup] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Navbar />
            <div className="grid">
                <Grid />
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

export default PreSurvey;

