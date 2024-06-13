import React, { useState } from 'react';
import { Chart, ArcElement } from 'chart.js';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg from '../images/AnalysisImg.png';

//import Grid from '@mui/material/Grid'; // 그리드 컴포넌트 임포트
import { useNavigate } from 'react-router-dom';


// Chart.js 요소 등록
Chart.register(ArcElement);

function Analysis() {
  // 파일 저장
  const [file, setFile] = useState(null);
  // 파일 업로드 후 결과 값 저장
  //const [results, setResults] = useState(null);
  const navigate = useNavigate();

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = async (event) => {
    // 기본 이벤트 방지
    // event.preventDefault();
    // FormData 생성
    // const formData = new FormData();
    // formData에 파일 추가
    // formData.append('file', file);
    // const data = {};
    // formData.forEach((value, key) => {
    //   data[key] = value;
    // });

    // 페이지 이동
    navigate('/load', { state: { file: file }});
  };

  return (
    <div>
      <div className="imgDiv">
        <img src={AnalysisImg} className="upImg" alt="Analysis"/>
      </div>
      <h1>AI 기반 채팅 분석 서비스!</h1>
      <form onSubmit={handleSubmit}>
        <div className="formBox">
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </div>
      </form>
      {/* {results && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )} */}
      {/* 그리드로 차트 생성 */}
      {/* <Grid container>
        <Grid item xs={6} md={6}>
          <Grid id="chart"></Grid>
        </Grid>
      </Grid> */}
    </div>
  );
}
export default Analysis;