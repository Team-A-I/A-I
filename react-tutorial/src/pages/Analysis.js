import React, { useState } from 'react';
import { Chart, ArcElement } from 'chart.js';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg from '../images/AnalysisImg.png';
import { useNavigate } from 'react-router-dom';


// Chart.js 요소 등록
Chart.register(ArcElement);

function Analysis() {
  // 파일 저장
  const [file, setFile] = useState(null);
  //페이지 이동 함수 생성
  const navigate = useNavigate();

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = async (event) => {
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
    </div>
  );
}
export default Analysis;
