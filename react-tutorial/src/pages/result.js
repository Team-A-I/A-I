// src/pages/Result.js

import React, { useEffect, useState } from 'react';
import RoundChart from '../components/roundchart';
import '../css/Result.css'; // CSS 파일 임포트

const Result = () => {
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:8000/files/', {
                method: 'POST',
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                setData(data.sentiment_avg_scores);
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
    }, [file]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <h1>Sentiment Analysis Results</h1>
            <input type="file" onChange={handleFileChange} />
            {data ? (
                Object.keys(data).map((name) => (
                    <div key={name} className="chart-container">
                        <h2>{name}</h2>
                        <RoundChart data={data[name]} />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Result;
