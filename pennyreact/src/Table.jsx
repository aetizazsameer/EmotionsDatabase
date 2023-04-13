//----------------------------------------------------------------------
// Table.jsx
// Author: Tyler Vu, Aetizaz Sameer
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortableTable = () => {
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/searchresults?query='+searchTerm)
      .then(response => {
        setVideos(response.data.videos);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const sortedData = videos.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filter = field => {
    return field.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredData = searchTerm
    ? sortedData.filter(
      item => {
        return filter(item.id) || filter(item.title) ||
          filter(item.url) || filter(item.uploadtimestamp);
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
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Video ID</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('url')}>URL</th>
            <th onClick={() => handleSort('uploadtimestamp')}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.url}</td>
              <td>{item.datetimeUploaded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
