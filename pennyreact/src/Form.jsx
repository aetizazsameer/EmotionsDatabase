import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [uploadTimestamp, setUploadTimestamp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submit', {
        id,
        title,
        url,
        uploadTimestamp,
      });
      console.log('Data submitted successfully');
      // Add code here to handle successful submission
    } catch (error) {
      console.log(error);
      // Add code here to handle submission error
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="uploadTimestamp" className="form-label">
            Upload Timestamp
          </label>
          <input
            type="text"
            className="form-control"
            id="uploadTimestamp"
            value={uploadTimestamp}
            onChange={(e) => setUploadTimestamp(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
