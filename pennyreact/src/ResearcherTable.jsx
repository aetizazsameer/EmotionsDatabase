//----------------------------------------------------------------------
// ResearcherTable.jsx
// Author: Tyler Vu, Aetizaz Sameer
//----------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <table>
        <thead>
          <tr>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherTable;
