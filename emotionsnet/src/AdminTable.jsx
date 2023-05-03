//----------------------------------------------------------------------
// AdminTable.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

const AdminTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
      axios.get('/api/videosearch?query='+searchTerm)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchTerm, setVideos]);

  const sortData = (key) => {
    const direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    setVideos((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const getColumnClassName = (key) => {
    if (sortConfig.key === key) {
      return `sort-${sortConfig.direction}`;
    }
    return '';
  };

  const handleSort = (field) => {
    sortData(field);
  };

  const filter = field => {
      return String(field).toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredData = searchTerm
    ? videos.filter(
      item => {
        return filter(item.title) || filter(item.url) || filter(item.uploadtimestamp);
      })
    : videos;

  return (
    <div className="table-container">
      <div className="actions-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <table class="content-table">
        <thead>
          <tr className="labels">
            <th className={getColumnClassName('title')} onClick={() => handleSort('title')}>Title</th>
            <th className={getColumnClassName('url')} onClick={() => handleSort('url')}>URL</th>
            <th className={getColumnClassName('uploadtimestamp')} onClick={() => handleSort('uploadtimestamp')}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td><a href={item.url}>Link</a></td>
              <td>{item.uploadtimestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
