//----------------------------------------------------------------------
// index.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Landing from './landing';
import Admin from './admin';
import Researcher from './researcher';
import Participant from './participant';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/index" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/researcher" element={<Researcher />} />
            <Route path="/participant" element={<Participant />} />
        </Routes>
        <Outlet />
    </BrowserRouter>,
    document.getElementById('root')
);
