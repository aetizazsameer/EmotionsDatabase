//----------------------------------------------------------------------
// index.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Landing from './Landing';
import Admin from './Admin';
import Researcher from './Researcher';
import Researcher_Individual from './Researcher_Individual';
import Participant from './Participant';
import PreSurvey from './PreSurvey';
import VideoPage from './VideoPage';
import PostSurvey from './PostSurvey';
// import './font.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/index" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/researcher" element={<Researcher />} />
            <Route path="/researcher/:videoId" element={<Researcher_Individual />} />
            <Route path="/participant" element={<Participant />} />
            <Route path="/participant/presurvey" element={<PreSurvey />} />
            <Route path="/participant/video" element={<VideoPage />} />
            <Route path="/participant/postsurvey" element={<PostSurvey />} />
        </Routes>
        <Outlet />
    </BrowserRouter>,
    document.getElementById('root')
);
