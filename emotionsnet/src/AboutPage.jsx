//----------------------------------------------------------------------
// AboutPage.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import Navbar from './Navbar';
import './AboutPage.css'

function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="aboutpage-container">
                <h1>About EmotionsNet</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac quam at arcu porttitor
                    facilisis. Sed feugiat mi vel risus tristique vehicula. Sed eu sapien elit. Sed ultrices,
                    nisl ac malesuada pulvinar, lacus augue bibendum tortor, eget maximus eros metus vel nisi.
                    Donec at massa sed dolor feugiat tincidunt a in mauris. Maecenas consequat magna id quam
                    congue luctus. Sed ultricies quam id diam pharetra ultricies. Sed vel nulla augue. Nam
                    posuere sem sit amet tortor tincidunt, ac pharetra est interdum. Nulla ut tellus non velit
                    imperdiet tristique. Aenean sodales nibh sit amet nibh semper, vel posuere lorem malesuada.
                </p>
                <p>
                    In hac habitasse platea dictumst. Sed at orci quis nisi blandit laoreet. Sed rhoncus
                    tristique semper. Nulla facilisi. Morbi vitae ligula vel mauris feugiat porttitor a nec
                    augue. Ut id quam id ipsum tincidunt congue vel vel tellus. Duis eu tortor nunc. In hac
                    habitasse platea dictumst. Morbi suscipit metus et mauris malesuada hendrerit. Morbi vel
                    tincidunt nunc, in rutrum justo.
                </p>
            </div>
        </>
    );
}

export default AboutPage;
