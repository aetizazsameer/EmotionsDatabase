//----------------------------------------------------------------------
// index.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import PennyHeader from './PennyHeader';
import PennyFooter from './PennyFooter';

ReactDOM.render(
    <div>
        <PennyHeader />
        <a href="/admin">Admin login</a>
        <br/>
        <a href="/researcher">Researcher login</a>
        <br/>
        <a href="/participant">Participant login</a>
        <br />
        <PennyFooter />
    </div>,
    document.getElementById('root')
);
