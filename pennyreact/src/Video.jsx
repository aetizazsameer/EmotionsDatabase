//----------------------------------------------------------------------
// Video.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Video = () => {
    const [src, setSrc] = useState('');

    useEffect(() => {
      axios.get('/participant/get_URL')
        .then(response => {
          setSrc(response.data.url);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
        <video controls width="100%">
        {src ? <source src={src} type="video/mp4" /> : <p>No video found</p>}
        </video>
    );
};

export default Video;