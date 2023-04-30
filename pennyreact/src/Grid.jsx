import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Grid.css';

function Grid() {
  const navigate = useNavigate();

  const [selectedRow, setRow] = useState(null);
  const [selectedCol, setCol] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setRow(row);
    setCol(col);
  };

  const insertCookie = data => {
    axios.post('/insert_coord', { data: data })
      .then(response => {
        console.log('Submitted grid selection successfully');
      })
      .catch(error => {
        console.log('Error submitting grid selection', error);
      });
  };

  const handleSubmitButton = (row, col) => {
    console.log(`Submitting row ${selectedRow} and column ${selectedCol}...`);
    insertCookie(JSON.stringify({row, col}))
    navigate('/participant/video');
  };

  return (
    <div>
      <div className="label-container">
        <div className="valence-label negative">Negative Valence</div>
        <div className="valence-label positive">Positive Valence</div>
        <div className="arousal-label negative">Negative Arousal</div>
        <div className="arousal-label positive">Positive Arousal</div>
      </div>
      <div className="grid">
        <div className="grid-container">
          {Array.from({ length: 9 }, (_, i) => (
            <React.Fragment key={i}>
              <div
                className="grid-line--horizontal"
                style={{ top: `${(i + 1) * 50}px` }}
              />
              <div
                className="grid-line--vertical"
                style={{ left: `${(i + 1) * 50}px` }}
              />
            </React.Fragment>
          ))}
          {gridData.map((rowData, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {rowData.map((colData, colIndex) => (
                <span
                  key={colIndex}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  className={`grid-cell ${rowIndex === 0 ? 'grid-cell--top' : ''} ${colIndex === 49 ? 'grid-cell--right' : ''} ${rowIndex === 49 ? 'grid-cell--bottom' : ''} ${colIndex === 0 ? 'grid-cell--left' : ''} ${selectedRow === rowIndex && selectedCol === colIndex ? 'grid-cell--selected' : ''}`}
                />
              ))}
            </div>
          ))}
          <div className="grid-line--horizontal" />
          <div className="grid-line--vertical" />
        </div>
      </div>
      <div className="submit-button-container">
        <button
          className={`submit-button${selectedRow !== null && selectedCol !== null ? '' : ' submit-button--disabled'}`}
          onClick={() => handleSubmitButton(selectedRow, selectedCol)}
          disabled={selectedRow === null || selectedCol === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Grid;