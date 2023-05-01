//----------------------------------------------------------------------
// GridPost.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Grid.css';

function Grid() {
  const navigate = useNavigate();

  const [arousalFinal, setArousalFinal] = useState(null);
  const [valenceFinal, setValenceFinal] = useState(null);
  const [arousalInitial, setArousalInitial] = useState(null);
  const [valenceInitial, setValenceInitial] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCookieData();
  }, []);

  const getCookieData = () => {
    axios.get('/get_coord')
      .then((response) => {
        const { row, col } = response.data;
        setArousalInitial(row);
        setValenceInitial(col);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/get_videoid')
      .then((response) => {
        const { videoid } = response.data;
        setVideoId(videoid)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCookies = () => {
    axios.post('/remove_cookies')
    .then(response => {
        console.log('Removed selection coordinates and videoid')
    })
    .catch(error => {
        console.log('Error removing selection coordinates and/or videoid')
    });
  };

  const insertResponse = async (valenceDelta, arousalDelta) => {
    try {
      const response = await axios.post('/api/insert_response', {
        video_id: videoId,
        valence_initial: valenceInitial,
        valence_final: valenceFinal,
        valence_delta: valenceDelta,
        arousal_initial: arousalInitial,
        arousal_final: arousalFinal,
        arousal_delta: arousalDelta
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setArousalFinal(row);
    setValenceFinal(col);
  };

  const handleSubmitButton = async () => {
    console.log(`Submitting row ${arousalFinal} and column ${valenceFinal}...`);
    let arousalDelta = arousalFinal - arousalInitial;
    let valenceDelta = valenceFinal - valenceInitial;
    console.log(`Arousal delta: ${arousalDelta}`);
    console.log(`Valence delta: ${valenceDelta}`);

    insertResponse(valenceDelta, arousalDelta)
    .then(() => removeCookies())
    .then(() => {
      setShowModal(true);
    });
  };

  const handleModalButtonClick = () => {
    setShowModal(false);
    navigate('/participant');
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
            <h1>Submission received!</h1>
            <p>Thank you for your submission.</p>
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
