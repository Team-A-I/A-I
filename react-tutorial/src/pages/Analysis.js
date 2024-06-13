import React, { useState } from 'react';
import axios from 'axios'; 
import { Chart, ArcElement } from 'chart.js';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg from '../images/AnalysisImg.png';
import lineChart from '../componets/linechart.js'; //라인 차트 생성 함수 임포트
import Grid from '@mui/material/Grid'; // 그리드 컴포넌트 임포트


// Chart.js 요소 등록
Chart.register(ArcElement);

function Analysis() {
  // 파일 저장
  const [file, setFile] = useState(null);
  // 파일 업로드 후 결과 값 저장
  const [results, setResults] = useState(null);
  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = async (event) => {
    // 기본 이벤트 방지
    event.preventDefault();
    // FormData 생성
    const formData = new FormData();
    // formData에 파일 추가
    formData.append('file', file);

    try {
      // 백엔드로 파일 전송
      const response = await axios.post('http://127.0.0.1:8000/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // 카카오톡 대화 이름 값만 추출
      const keys = Object.keys(response.data.individual_results);
      console.log(keys)
      // 누적 포인트로 라인 차트 생성 (linechart.js로 데이터 전달)
      lineChart(response.data.individual_score_lists_for_graph, keys)
      // 결과 값 저장
      setResults(response.data.individual_results)
 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div className="imgDiv">
        <img src={AnalysisImg} className="upImg" alt="Analysis"/>
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
      {/* 그리드로 차트 생성 */}
      <Grid container>
        <Grid item xs={6} md={6}>
          <Grid id="chart"></Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Analysis;
