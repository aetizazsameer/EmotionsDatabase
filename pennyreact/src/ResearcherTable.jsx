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
  const [responses, setResponses] = useState([]);

  useEffect(() => {
      axios.get('/api/responsesearch?id='+id)
      .then(response => {
          setResponses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id, setResponses]);

  const sortedData = responses.sort((a, b) => {
    aValue = a['videoid'];
    bValue = b['videoid'];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    
    aValue = a[sortField];
    bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
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
            <th onClick={() => handleSort('id')}>Response ID</th>
            <th onClick={() => handleSort('sessionid')}>Session ID</th>
            <th onClick={() => handleSort('videoid')}>Video ID</th>
            <th onClick={() => handleSort('videotitle')}>Video Title</th>
            <th onClick={() => handleSort('valence_initial')}>Valence (initial)</th>
            <th onClick={() => handleSort('valence_final')}>Valence (final)</th>
            <th onClick={() => handleSort('valence_delta')}>Valence (delta)</th>
            <th onClick={() => handleSort('arousal_initial')}>Arousal (initial)</th>
            <th onClick={() => handleSort('arousal_final')}>Arousal (final)</th>
            <th onClick={() => handleSort('arousal_delta')}>Arousal (delta)</th>
            <th onClick={() => handleSort('responsetimestamp')}>Timestamp</th>


          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sessionid}</td>
              <td>{item.videoid}</td>
              <td>{item.videoid}</td>
              <td>{item.valence_initial}</td>
              <td>{item.valence_final}</td>
              <td>{item.valence_delta}</td>
              <td>{item.arousal_initial}</td>
              <td>{item.arousal_final}</td>
              <td>{item.arousal_delta}</td>
              <td>{item.responsetimestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherTable;
