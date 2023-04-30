//----------------------------------------------------------------------
// ResearcherTableIndividual.jsx
// Author: Tyler Vu, Aetizaz Sameer
//----------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './Table.css';

const ResearcherTableIndividual = () => {
    const [videoData, setVideoData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
    const { videoId } = useParams();

    useEffect(() => {
        axios.get(`/api/responses/${videoId}`)
        .then((response) => {
            setVideoData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching video data:", error);
        });
    }, [videoId]);

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
    const filteredVideoData = videoData == null ? null :
        videoData.filter((video) =>
            video.id.toString().includes(searchTerm));

    const filteredVideoTable = (data) =>
        data.length == 0
        ? <tr key={videoId}>
            <td colSpan="8">No response exists for a video with ID {videoId}.</td>
        </tr>
        : data.map((video) => (
            <tr key={video.id}>
                <td>{video.id}</td>
                <td>{video.sessionid}</td>
                <td>{video.valence_initial.toFixed(2)}</td>
                <td>{video.valence_final.toFixed(2)}</td>
                <td>{video.valence_delta.toFixed(2)}</td>
                <td>{video.arousal_initial.toFixed(2)}</td>
                <td>{video.arousal_final.toFixed(2)}</td>
                <td>{video.arousal_delta.toFixed(2)}</td>
                <td>{video.responsetimestamp}</td>
            </tr>
        ));

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
                <Link to="/researcher" className="go-back-button">Go Back</Link>
            </div>
            <table class="content-table">
                <thead>
                    <tr className="labels">
                    <th className={getColumnClassName("id")} onClick={() => sortData("id")}>
                        ID
                    </th>
                    <th className={getColumnClassName("sessionid")} onClick={() => sortData("sessionid")}>
                        Session ID
                    </th>
                    <th
                        className={getColumnClassName("valence_initial")}
                        onClick={() => sortData("valence_initial")}
                    >
                        Valence Initial
                    </th>
                    <th
                        className={getColumnClassName("valence_final")}
                        onClick={() => sortData("valence_final")}
                    >
                        Valence Final
                    </th>
                    <th
                        className={getColumnClassName("valence_delta")}
                        onClick={() => sortData("valence_delta")}
                    >
                        Valence Delta
                    </th>
                    <th
                        className={getColumnClassName("arousal_initial")}
                        onClick={() => sortData("arousal_initial")}
                    >
                        Arousal Initial
                    </th>
                    <th
                        className={getColumnClassName("arousal_final")}
                        onClick={() => sortData("arousal_final")}
                    >
                        Arousal Final
                    </th>
                    <th
                        className={getColumnClassName("arousal_delta")}
                        onClick={() => sortData("arousal_delta")}
                    >
                        Arousal Delta
                    </th>
                    <th
                        className={getColumnClassName("responsetimestamp")}
                        onClick={() => sortData("responsetimestamp")}
                    >
                        Timestamp
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVideoData != null
                        && filteredVideoTable(filteredVideoData)}
                </tbody>
            </table>
        </div>
    );
};

export default ResearcherTableIndividual;
