//----------------------------------------------------------------------
// ResearcherTable.jsx
// Author: Tyler Vu, Aetizaz Sameer
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResearcherTable = () => {
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [id, setId] = useState('');
  const [responseAvg, setResponseAvg] = useState([]);

  useEffect(() => {
    axios.get('/api/responseavg')
    .then(response => {
      setResponseAvg(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    }, [setResponseAvg]);

  const sortedData = responseAvg.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;

    if (sortField != 'videoid') {
      aValue = a['videoid'];
      bValue = b['videoid'];
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    }

    return 0;
  });

  const filteredData = id
    ? sortedData.filter(
      item => String(item.id).toLowerCase().includes(id.toLowerCase())
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
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('videoid')}>Video ID</th>
            <th onClick={() => handleSort('videotitle')}>Video Title</th>
            <th onClick={() => handleSort('valence_initial')}>Valence (initial)</th>
            <th onClick={() => handleSort('valence_final')}>Valence (final)</th>
            <th onClick={() => handleSort('valence_delta')}>Valence (delta)</th>
            <th onClick={() => handleSort('arousal_initial')}>Arousal (initial)</th>
            <th onClick={() => handleSort('arousal_final')}>Arousal (final)</th>
            <th onClick={() => handleSort('arousal_delta')}>Arousal (delta)</th>


          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.videoid}>
              <td>{item.videoid}</td>
              <td>{item.videotitle}</td>
              <td>{item.valence_initial}</td>
              <td>{item.valence_final}</td>
              <td>{item.valence_delta}</td>
              <td>{item.arousal_initial}</td>
              <td>{item.arousal_final}</td>
              <td>{item.arousal_delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherTable;
