import React, { useState } from 'react';
import axios from 'axios';
import './Table.css';

const Form = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/insert_video', {
        title,
        url,
      });
      console.log('Data submitted successfully');
      setShowModal(true);
      setModalMessage(`"${title}" has been added.`);
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setModalMessage(`Failed to add "${title}" to database.`);
    }

    setTitle('');
    setUrl('');
  };

  const handleModalButtonClick = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className="search-input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
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
          <h1>Video Added</h1>
          <p>{modalMessage}</p>
          <button className="modal-button" onClick={handleModalButtonClick}>
            Close
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Form;
