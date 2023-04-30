import React from 'react';
import './InstructionsPopup.css';
import gridimg from './grid.png';
import arousalimg from './arousal.png';
import valenceimg from './valence.png';

function InstructionsPopup({ currentSlide, setCurrentSlide, closePopup }) {
    const instructions = [
        {
            text: 'The emotion grid is kind of like a map for describing how we feel.\n \
            Here is what it looks like:',
            imageUrl: gridimg,
        },
        {
            subheader: 'Valence',
            text: "Let's look at the grid going from left to right -- this represents Valence.\
            Valence is a measure of how positive or negative an emotion is.\
            The blue on the left represents negative valence and the green on the right represents positive valence:",
            imageUrl: valenceimg,
        },
        {
            subheader: 'Arousal',
            text: "Now let's look at the grid going from top to bottom -- this represents Arousal.\
            Arousal is defined as a state of alertness and activation in your body that is linked to an emotion.\
            The red at the top represents emotions that are high arousal and the grey at the bottom represents emotions that are low arousal:",
            imageUrl: arousalimg,
        },
    ];

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const nextSlide = () => {
        if (currentSlide < instructions.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    return (
        <div className="instructions-overlay">
            <div className="instructions-popup">
                <h2>Instructions</h2>
                <h3>{instructions[currentSlide].subheader}</h3>
                <p dangerouslySetInnerHTML={{ __html: instructions[currentSlide].text }}></p>
                <img src={instructions[currentSlide].imageUrl} alt={`Slide ${currentSlide + 1}`} />

                <div className="instructions-buttons">
                    {currentSlide > 0 && <button onClick={prevSlide}>Previous</button>}
                    {currentSlide < instructions.length - 1 ? (
                        <button onClick={nextSlide}>Next</button>
                    ) : (
                        <button onClick={closePopup}>Close</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InstructionsPopup;
