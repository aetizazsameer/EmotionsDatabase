import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Grid.css';

function getCookieData() {
  const cookieValue = Cookies.get('gridSelection');
  let preRow = null;
  let preCol = null;
  if (cookieValue) {
    const decodedCookie = decodeURIComponent(cookieValue);
    const jsonCookie = JSON.parse(decodedCookie);
    preRow = jsonCookie.row;
    preCol = jsonCookie.col;
  }
  return { preRow, preCol };
}

function Grid() {
  const navigate = useNavigate();

  const [arousalFinal, setArousalFinal] = useState(null);
  const [valenceFinal, setValenceFinal] = useState(null);
  const [arousalInitial, setArousalInitial] = useState(null);
  const [valenceInitial, setValenceInitial] = useState(null);
  const videoId = parseInt(Cookies.get('video_id'));
  const [gridData, setGridData] = useState(Array(50).fill(Array(50).fill(false)));
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    const { preRow, preCol } = getCookieData();
    setArousalInitial(preRow);
    setValenceInitial(preCol);
  }, []);

  const handleClick = (row, col) => {
    console.log(`Clicked on row ${row} and column ${col}`);
    setArousalFinal(row);
    setValenceFinal(col);
    setShowSubmitButton(true);
  };

  const handleSubmitButton = async () => {
    console.log(`Submitting row ${arousalFinal} and column ${valenceFinal}`);
    let arousalDelta = arousalFinal - arousalInitial;
    let valenceDelta = valenceFinal - valenceInitial;
    console.log(`Arousal delta: ${arousalDelta}`);
    console.log(`Valence delta: ${valenceDelta}`);

    try {
      const response = await axios.post('/api/insert_response', {
        sessionid: 1234,
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

    Cookies.remove('video_id')
    Cookies.remove('last_query')
    Cookies.remove('gridSelection')


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
      {showSubmitButton && (
          <div className="submit-button-container">
            <button className="submit-button" onClick={()=> handleSubmitButton()}>Submit</button>
          </div>
        )}
    </div>
  );
}

export default Grid;
