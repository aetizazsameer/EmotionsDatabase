//----------------------------------------------------------------------
// Video.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Video()
{
  const navigate = useNavigate();

  const [src, setSrc] = useState('');
  const [id, setId] = useState('');


  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    let videoid = id;
    insertVideoId(JSON.stringify({videoid}));
  }, [id])

  const getVideo = () => {
    axios.get('/participant/get_URL')
      .then(response => {
        setSrc(response.data.url);
        setId(response.data.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const insertVideoId = data => {
    axios.post('/insert_videoid', { data: data })

      .then(response => {
        console.log('Submitted videoid successfully');
      })
      .catch(error => {
        console.log('Error submitting videoid', error);
      });
  };

  const handleVideoEnd = () => {
    navigate('/participant/postsurvey');
  };

  return (
    <div>
      <video onEnded={handleVideoEnd} controls width="100%">
        {src ? <source src={src} type="video/mp4" /> : <p>No video found</p>}
      </video>
    </div>
  );
};

export default Video;