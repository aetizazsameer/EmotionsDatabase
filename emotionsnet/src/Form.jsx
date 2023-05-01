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
  const [submittedTitle, setSubmittedTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/insert_video', {
        title,
        url,
      });
      console.log('Data submitted successfully');
      setSubmittedTitle(title);
      setShowModal(true);
    } catch (error) {
      console.log(error);
      // Add code here to handle submission error
    }

    setTitle('');
    setUrl('');
  };

  const closeModal = () => {
    setShowModal(false);
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
            <h1>Success</h1>
            <p>{submittedTitle} has been added.</p>
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
