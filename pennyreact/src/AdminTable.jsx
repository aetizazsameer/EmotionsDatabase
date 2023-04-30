//----------------------------------------------------------------------
// AdminTable.jsx
// Author: Tyler Vu, Aetizaz Sameer
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

const AdminTable = () => {
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
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

  const sortedData = videos.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filter = field => {
      return String(field).toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredData = searchTerm
    ? sortedData.filter(
      item => {
        return filter(item.title) || filter(item.url) || filter(item.uploadtimestamp);
      })
    : sortedData;

  const handleSort = field => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

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
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('url')}>URL</th>
            <th onClick={() => handleSort('uploadtimestamp')}>Timestamp</th>
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
