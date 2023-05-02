//----------------------------------------------------------------------
// AboutPage.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Navbar from './Navbar';
import logo from './logo_black.png';
import './AboutPage.css'

function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="aboutpage-container">
                <div style={{ display: 'inline-block' }}>
                    <h1>About EmotionsNet</h1>
                    <hr className='line-separator'/>
                </div>
                <p>
                    In the fields of psychology and neuroscience, often researchers seek to study the effect of mood and emotion on
                    measurable characteristics -- such as health, willingness to take risks, and other behaviors. In order to conduct
                    this kind of research, scientists turn to movie and video clips to induce particular emotions in their viewers.
                    However, this can prove difficult since video clips that are studied and curated are spread across a large number
                    of paper publications in different journals.
                </p>
                <p>
                    <b>EmotionsNet</b> is a modern platform that aims to modernize and streamlize this process, addressing the data
                    scarcity problem faced by researchers. By allowing everyday participants to share their emotions before and after
                    watching a video clip, we are able to quantify the emotional impact of a video.
                </p>
                <p>
                    <b>EmotionsNet</b> aims to create a large database of video clips and their associated emotions. This helps both
                     <a href='/researcher'> researchers</a> in need of data as well as <a href='/participant/presurvey'>contributors</a> wondering how their emotional responses compare to the general
                    population.
                </p>
            </div>
            <img src={logo} alt="Logo" className="logo_img" />
            <p className="credit">Created by Tyler Vu, Aetizaz Sameer, Andrew Hwang</p>
        </>
    );
}

export default AboutPage;
