//----------------------------------------------------------------------
// GridPost.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Grid.css';

function Grid() {
  const navigate = useNavigate();

  const [arousalFinal, setArousalFinal] = useState(null);
  const [valenceFinal, setValenceFinal] = useState(null);
  const [success, setSuccess] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));
  const [showModal, setShowModal] = useState(false);

  const insertResponse = async () => {
    try {
      const response = await axios.post('/api/insert_response', {
        arousal_final: arousalFinal,
        valence_final: valenceFinal
      });
      console.log(response.data);
      if (response.data == 'SUCCESS') {
        console.log('Response submitted');
        setSuccess(true);
      }
      else {
        console.log('Data submitted');
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setArousalFinal(row);
    setValenceFinal(col);
  };

  const handleSubmitButton = async () => {
    console.log(`Submitting row ${arousalFinal} and column ${valenceFinal}...`);

    insertResponse()
    .then(() => {
      setShowModal(true);
    });
  };

  const handleModalButtonClick = () => {
    setShowModal(false);
    setSuccess(null);
    navigate('/index');
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
                  className={`grid-cell ${rowIndex === 0 ? 'grid-cell--top' : ''} ${colIndex === 49 ? 'grid-cell--right' : ''} ${rowIndex === 49 ? 'grid-cell--bottom' : ''} ${colIndex === 0 ? 'grid-cell--left' : ''} ${arousalFinal === rowIndex && valenceFinal === colIndex ? 'grid-cell--selected' : ''}`}
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
          className={`submit-button${arousalFinal !== null && valenceFinal !== null ? '' : ' submit-button--disabled'}`}
          onClick={handleSubmitButton}
          disabled={arousalFinal === null || valenceFinal === null}
        >
          Submit
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            { success===true &&
              <div>
                <h1>Submission received!</h1>
                <p>Thank you for your submission.</p>
              </div>
            }
            { success===false &&
              <div>
                <h1>Submission failed.</h1>
                <p>Please try again.</p>
              </div>
            }
            { success===null &&
              <div>
                <h1>Unknown error.</h1>
                <p>Please contact a site administrator.</p>
              </div>
            }
            <button className="modal-button" onClick={handleModalButtonClick}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grid;
