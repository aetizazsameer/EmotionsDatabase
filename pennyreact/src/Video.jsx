//----------------------------------------------------------------------
// Video.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Video = () => {
    const [src, setSrc] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
      axios.get('/participant/get_URL')
        .then(response => {
          setSrc(response.data.url);
          setId(response.data.id);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    Cookies.set('video_id', id);

    return (
        <video controls width="100%">
        {src ? <source src={src} type="video/mp4" /> : <p>No video found</p>}
        </video>
    );
};

export default Video;