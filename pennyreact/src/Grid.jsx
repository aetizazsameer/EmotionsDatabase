import React, { useState } from 'react';

function Grid() {
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      {gridData.map((rowData, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {rowData.map((colData, colIndex) => (
            <span
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: '10px',
                height: '10px',
                border: 'none',
                boxSizing: 'border-box',
                flexShrink: 0,
                borderTop: rowIndex === 0 ? '1px solid black' : 'none',
                borderRight: colIndex === 49 ? '1px solid black' : 'none',
                borderBottom: rowIndex === 49 ? '1px solid black' : 'none',
                borderLeft: colIndex === 0 ? '1px solid black' : 'none',
              }}
            />
          ))}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'black',
          borderTop: 'none',
          borderBottom: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '100%',
          backgroundColor: 'black',
          borderLeft: 'none',
          borderRight: 'none',
        }}
      />
    </div>
  );
}

export default Grid;
