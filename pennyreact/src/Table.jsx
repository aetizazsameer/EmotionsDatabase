//----------------------------------------------------------------------
// Table.jsx
// Author: Tyler Vu
//----------------------------------------------------------------------

import React, { useState } from 'react';
import './style.css';

const data = [
  { title: 'Vancouver City Highlight', url: 'https://mediacentral.princeton.edu/media/Walk%20in%20the%20City%20(Neutral)/1_evlgwt6z', datetimeUploaded: 25 },
  { title: 'Blended', url: 'https://mediacentral.princeton.edu/media/Blended+%28Funny%29/1_v2sgkiqw', datetimeUploaded: 32 },
  { title: 'Marley and Me', url: 'https://mediacentral.princeton.edu/media/Marley+and+Me+%28Sad%29/1_kn9ryovr', datetimeUploaded: 19 },
  { title: 'Vacancy', url: 'https://mediacentral.princeton.edu/media/Vacancy+%28Fear%29/1_xyl6m690', datetimeUploaded: 28 },
  { title: 'Pride and Prejudice', url: 'https://mediacentral.princeton.edu/media/Pride+and+Prejudice+%28Calm%29/1_nr0xosoo', datetimeUploaded: 35 },
];

const SortableTable = () => {
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedData = data.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = searchTerm
    ? sortedData.filter(
        item =>
          item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.datetimeUploaded.toString().includes(searchTerm)
      )
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
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('url')}>URL</th>
            <th onClick={() => handleSort('datetimeUploaded')}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.title}>
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
