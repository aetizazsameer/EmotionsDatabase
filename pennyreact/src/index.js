//----------------------------------------------------------------------
// index.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './landing';
import Admin from './admin';
import Researcher from './researcher';
import Participant from './participant';

ReactDOM.render(

    <div>
        <strong>text</strong>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Landing />
                </Route>
                <Route path="/index">,
                    <Landing />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/researcher">
                    <Researcher />
                </Route>
                <Route path="/participant">
                    <Participant />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);
