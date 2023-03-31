import React, { useState } from 'react';
import axios from 'axios';
// import 'admindatabase.py'

const Form = () => {
  const [title, setFirstName] = useState('');
  const [url, setLastName] = useState('');
  const [uploadtimestamp, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/insert_video', {
        title,
        url,
        uploadtimestamp,
      });
      console.log('Data submitted successfully');
      // admindatabase.insert_video(title,url,uploadtimestamp)
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
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="uploadtimestamp">Timestamp:</label>
        <input
          type="text"
          id="uploadtimestamp"
          value={uploadtimestamp}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
