import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Grid.css';


function Grid_post() {
  const [selectedRow, setRow] = useState(null);
  const [selectedCol, setCol] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setRow(row);
    setCol(col);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/insert_video', {
        title,
        url,
      });
      console.log('Data submitted successfully');
      await axios.post('/api/insert_video', {
        _title: title,
        _url: url,
      });
      // Add code here to handle successful submission
    } catch (error) {
      console.log(error);
      // Add code here to handle submission error
    }
  };

  const handleSubmitButton = async (e) => {
    console.log(`Submitting row ${selectedRow} and column ${selectedCol}`);

    data = document.cookie()
    // ai and vi from cookies
    const vi = 1;
    const ai = 2;
    const id = '';
    const sessionid = '';

    const vf = selectedRow;
    const af = selectedCol;
    const vd = vf - vi;
    const ad = af - ai;

    e.preventDefault();
    try {
      await axios.post('/api/insert_response', {
        id,
        sessionid,
        vi,
        vf,
        vd,
        ai,
        af,
        ad
      });
      console.log('Data submitted successfully');
      await axios.post('/api/insert_response', {
        _id: id,
        _sessionid: sessionid,
        _vi: vi,
        _vf: vf,
        _vd: vd,
        _ai: ai,
        _af: af,
        _ad: ad
      });
      // Add code here to handle successful submission
    } catch (error) {
      console.log(error);
      // Add code here to handle submission error
    }
  
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
