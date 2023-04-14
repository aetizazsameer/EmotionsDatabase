import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Grid.css';

function Grid() {
  const [selectedRow, setRow] = useState(null);
  const [selectedCol, setCol] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  useEffect(() => {
    const arousalInitial = Cookies.get('arousal_initial');
    const valenceInitial = Cookies.get('valence_initial');
    setRow(arousalInitial);
    setCol(valenceInitial);
  }, []);

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setRow(row);
    setCol(col);
    // axios to send row and col (either to cookies or db)
  };

  const handleSubmitButton = (row, col) => {
    console.log(`Submitting row ${selectedRow} and column ${selectedCol}`);
    const arousalDelta = selectedRow - Cookies.get('arousal_initial');
    const valenceDelta = selectedCol - Cookies.get('valence_initial');
    console.log(`Arousal delta: ${arousalDelta}`);
    console.log(`Valence delta: ${valenceDelta}`);
    // set cookies with arousal_final and valence_final
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
      <button onClick={()=> handleSubmitButton(selectedRow, selectedCol)}>Submit</button>
    </div>
  );
}

export default Grid;
