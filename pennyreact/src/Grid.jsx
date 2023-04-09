import React, { useState } from 'react';

function Grid() {
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`(${row}, ${col})`);
  };

  return (
    <div>
      {gridData.map((rowData, rowIndex) => (
        <div key={rowIndex}>
          {rowData.map((colData, colIndex) => (
            <span
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{  width: '30px', height: '10px',  border: '10px solid white' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
