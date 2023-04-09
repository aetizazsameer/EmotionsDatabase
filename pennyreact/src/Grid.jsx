import React, { useState } from 'react';

function Grid() {
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
  };

  return (
    <div>
      {gridData.map((rowData, rowIndex) => (
        <div key={rowIndex}>
          {rowData.map((colData, colIndex) => (
            <span
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: colData ? 'black' : 'white', border: '1px solid black' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
