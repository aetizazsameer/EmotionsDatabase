//----------------------------------------------------------------------
// Video.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Video.css';

function Video() {
  const navigate = useNavigate();

  const [src, setSrc] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = () => {
    axios.get('/api/get_URL')
      .then(response => {
        setSrc(response.data.url);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleModalButtonClick = () => {
    navigate('/participant/postsurvey');
  };

  return (
    <div>
      <video onEnded={handleVideoEnd} controls width="100%">
        {src ? <source src={src} type="video/mp4" /> : <p>No video found</p>}
      </video>
      {videoEnded && (
        <div className="modal">
          <div className="modal-content">
            <h1>Thanks for watching!</h1>
            <p>Please continue to the post survey.</p>
            <button className="modal-button" onClick={handleModalButtonClick}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
