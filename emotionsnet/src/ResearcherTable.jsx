//----------------------------------------------------------------------
// ResearcherTable.jsx
// Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
//----------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Table.css';

const ResearcherTable = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });

  useEffect(() => {
    axios
      .get("/api/video_data")
      .then((response) => {
        setVideoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  const sortData = (key) => {
    const direction = sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });

    setVideoData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const getColumnClassName = (key) => {
    if (sortConfig.key === key) {
      return `sort-${sortConfig.direction}`;
    }
    return "";
  };

  // Filter videoData based on the search term
  const filteredVideoData = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadCSV = () => {
    axios
      .get("/api/downloadcsv", {
        responseType: "arraybuffer", // Set responseType to 'arraybuffer' to handle binary data
        headers: {
          "Content-Type": "application/json",
          Accept: "text/csv",
        },
      })
      .then((response) => {
        // Create a temporary link to download the CSV file
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "text/csv" })
        );
        const link = document.createElement("a");
        link.href = url;

        // Set the filename with the date, time, and "emotionsnet" prefix in a more readable format
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString().replace(/\//g, "-");
        const timeString = currentDate.toLocaleTimeString().replace(/:/g, "-");
        const filename = `emotionsnet_${dateString}_${timeString}.csv`;

        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();

        // Remove the temporary link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };

  return (
    <div className="table-container">
      <div className="actions-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button class="export-csv-button" onClick={handleDownloadCSV}>
          Download
        </button>
      </div>
      <table class="content-table">
        <thead>
          <tr className="labels">
            <th className={getColumnClassName("id")} onClick={() => sortData("id")}>
              ID
            </th>
            <th className={getColumnClassName("title")} onClick={() => sortData("title")}>
              Title
            </th>
            <th
              className={getColumnClassName("avg_valence_initial")}
              onClick={() => sortData("avg_valence_initial")}
            >
              Avg Valence Initial
            </th>
            <th
              className={getColumnClassName("avg_valence_final")}
              onClick={() => sortData("avg_valence_final")}
            >
              Avg Valence Final
            </th>
            <th
              className={getColumnClassName("avg_valence_delta")}
              onClick={() => sortData("avg_valence_delta")}
            >
              Avg Valence Delta
            </th>
            <th
              className={getColumnClassName("avg_arousal_initial")}
              onClick={() => sortData("avg_arousal_initial")}
            >
              Avg Arousal Initial
            </th>
            <th
              className={getColumnClassName("avg_arousal_final")}
              onClick={() => sortData("avg_arousal_final")}
            >
              Avg Arousal Final
            </th>
            <th
              className={getColumnClassName("avg_arousal_delta")}
              onClick={() => sortData("avg_arousal_delta")}
            >
              Avg Arousal Delta
            </th>
            <th>
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredVideoData.map((video) => (
            <tr key={video.id}>
              <td>
                <Link to={`/researcher/${video.id}`}>{video.id}</Link>
              </td>
              <td>{video.title}</td>
              <td>{video.avg_valence_initial.toFixed(2)}</td>
              <td>{video.avg_valence_final.toFixed(2)}</td>
              <td>{video.avg_valence_delta.toFixed(2)}</td>
              <td>{video.avg_arousal_initial.toFixed(2)}</td>
              <td>{video.avg_arousal_final.toFixed(2)}</td>
              <td>{video.avg_arousal_delta.toFixed(2)}</td>
              <td>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherTable;
