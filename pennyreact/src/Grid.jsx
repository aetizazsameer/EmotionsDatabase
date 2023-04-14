import React, { useState } from 'react';
import axios from 'axios';
import './Grid.css';

function Grid() {
  const [selectedRow, setRow] = useState(null);
  const [selectedCol, setCol] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setRow(row);
    setCol(col);
    // axios to send row and col (either to cookies or db)
  };

  const handleSubmitButton = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    // axios to send row and col (either to cookies or db)
    
    axios.post('/api/insert_response', {
      // handle presurvey cookies
      row,
      col,
    })
  };

  return (
    <div className="grid">
      <div className="grid-container">
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
      <button onClick={()=> handleSubmitButton(selectedRow, selectedCol)}></button> 
    </div>

  );
}

export default Grid;
