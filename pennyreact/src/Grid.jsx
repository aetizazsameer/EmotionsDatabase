import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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

  const handleSubmitButton = (row, col) => {
    console.log(`Submitting row ${selectedRow} and column ${selectedCol}`);
    Cookies.set('gridSelection', JSON.stringify({ row, col }));
    navigate('/participant/video');
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




// function Grid() {
//   const [selectedRow, setRow] = useState(null);
//   const [selectedCol, setCol] = useState(null);
//   const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

//   const handleClick = (row, col) => {
//     console.log(`Clicked on row ${row} and column ${col}`);
//     setRow(row);
//     setCol(col);

//     Cookies.set('row', row);
//     Cookies.set('col', col);
//     // axios to send row and col (either to cookies or db)
//   };

//   const handleSubmitButton = () => {
//     console.log(`Submitting row ${selectedRow} and column ${selectedCol}`);
//     // send selected row and column to backend
//     // axios.post('/api/presurvey', {
//     //   row: selectedRow,
//     //   col: selectedCol,
//     // })
//     //   .then(response => {
//     //     console.log(response);
//     //     // handle successful response
//     //   })
//     //   .catch(error => {
//     //     console.error(error);
//     //     // handle error
//     //   });

//     Cookies.set('row', row);
//     Cookies.set('col', col);
//   };

//   return (
//     <div className="grid">
//       <div className="grid-container">
//         {gridData.map((rowData, rowIndex) => (
//           <div key={rowIndex} className="grid-row">
//             {rowData.map((colData, colIndex) => (
//               <span
//                 key={colIndex}
//                 onClick={() => handleClick(rowIndex, colIndex)}
//                 className={`grid-cell ${rowIndex === 0 ? 'grid-cell--top' : ''} ${colIndex === 49 ? 'grid-cell--right' : ''} ${rowIndex === 49 ? 'grid-cell--bottom' : ''} ${colIndex === 0 ? 'grid-cell--left' : ''} ${selectedRow === rowIndex && selectedCol === colIndex ? 'grid-cell--selected' : ''}`}
//               />
//             ))}
//           </div>
//         ))}
//         <div className="grid-line--horizontal" />
//         <div className="grid-line--vertical" />
//       </div>
//       {selectedRow !== null && selectedCol !== null && (
//         <button onClick={handleSubmitButton}>Submit Row {selectedRow} Col {selectedCol}</button>
//       )}
//     </div>

//   );
// }

// export default Grid;
