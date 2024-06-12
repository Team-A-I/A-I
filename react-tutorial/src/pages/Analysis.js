import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg from '../images/AnalysisImg.png';
import lineChart from '../componets/linechart.js';
import Grid from '@mui/material/Grid';


// Chart.js 요소 등록
Chart.register(ArcElement);

function Analysis() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [scorelist, setScorelist] = useState(null)
  const [percentages, setPercentages] = useState(null);
  const [scores, setScores] = useState(null);
  const [avgscore, SetAvgscore] = useState(null);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const keys = Object.keys(response.data.individual_results);
      console.log(keys)
      lineChart(response.data.individual_score_lists_for_graph, keys)
      // console.log(response.data)
      setResults(response.data.individual_results)
      setScorelist(response.data.individual_score_lists_for_graph)
      setScores(response.data.individual_scores)
      SetAvgscore(response.data.sentiment_avg_scores)
      
      const responseList = response.data.individual_score_lists_for_graph;
      
    

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getPieChartData = (data) => {
    const labels = Object.keys(data);
    const values = Object.values(data);
    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };
  };

  return (
    <div>
      <div className="imgDiv">
        <img src={AnalysisImg} className="upImg"/>
      </div>
      <h1>AI 기반 채팅 분석 서비스</h1>
      <form onSubmit={handleSubmit}>
        <div className="formBox">
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </div>
      </form>
      {results && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
      <Grid container>
        <Grid item xs={6} md={6}>
          <Grid id="chart"></Grid>
        </Grid>
      
      </Grid>
      
      
      {percentages && (
        <div>
          <h2>Percentages</h2>
          {Object.entries(percentages).map(([name, data]) => (
            <div key={name} className="chart-container">
              <h3>{name}</h3>
              <Pie data={getPieChartData(data)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Analysis;
