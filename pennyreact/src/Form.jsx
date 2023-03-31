import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/insert_video', {
        title,
        url,
      });
      console.log('Data submitted successfully');
      await axios.post('/api/insert_video', {
        _title: title,
        _url: url,
      });
      // Add code here to handle successful submission
    } catch (error) {
      console.log(error);
      // Add code here to handle submission error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
