//----------------------------------------------------------------------
// participant.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Grid from './Grid_post';

function PostSurvey() {
    return (
        <div className="container">
            <div className="instructions">
                <h1>Instructions</h1>
                <p>These are the instructions for the survey. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum eu lorem malesuada efficitur at quis dolor. Donec varius quam ac felis consectetur, eget fringilla lorem fringilla. Vestibulum in ultricies ex. Praesent malesuada odio vel nunc hendrerit, ac luctus nulla dapibus. Sed euismod aliquet urna, sit amet imperdiet augue bibendum sed. Vivamus semper massa et libero venenatis, id euismod lectus lobortis. </p>
            </div>
            <div className="grid">
                <Grid />
            </div>
        </div>
    );
}

export default PostSurvey;
