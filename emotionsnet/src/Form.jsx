//----------------------------------------------------------------------
// Form.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState } from 'react';
import axios from 'axios';
import './Table.css';

const Form = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(null);
  const [submittedTitle, setSubmittedTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/insert_video', {
        title,
        url,
      });
      if (response.data == 'SUCCESS') {
        console.log('Video submitted');
        setSuccess(true);
      }
      else {
        console.error('Failed to submit video.');
        setSuccess(false);
      };

      setSubmittedTitle(title);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setTitle('');
    setUrl('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccess(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            className="search-input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="url">URL:</label>
          <input
            className="search-input"
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!title || !url}
          className={!title || !url ? 'disabled-button' : ''}
        >
          Add
        </button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {success===true &&
              <div>
                <h1>Success</h1>
                <p>{submittedTitle} has been added to database.</p>
              </div>
            }
            {success===false &&
              <div>
                <h1>Failed</h1>
                <p>{submittedTitle} was not added to database. Check URL and try again.</p>
              </div>
            }
            {success===null &&
              <div>
                <h1>Unknown error</h1>
                <p>{submittedTitle} was not added to database. Contact a site administrator.</p>
              </div>
            }
            <button className="modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
