import React, { useState } from 'react';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg1 from '../images/AnalysisImg1.png';
import AnalysisImg2 from '../images/AnalysisImg2.png';
import AnalysisImg3 from '../images/AnalysisImg3.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // 구름 아이콘 임포트
import { motion } from 'framer-motion'; // motion 컴포넌트 임포트
import { Button, Typography, Grid, styled, Container, Box } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


function Analysis() {
  // 파일 저장
  const [file, setFile] = useState(null);

  // 파일명 저장
  const [fileName, setFileName] = useState("파일을 선택해주세요. "); // 파일명을 저장하기 위한 상태 추가
  
  // 파일 업로드 후 결과 값 저장
  const navigate = useNavigate();

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); // 파일명을 상태에 저장
  };

  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 페이지 이동
    navigate('/load', { state: { file: file }});
  };

  // 파일 업로드
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Container maxWidth="lg">

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        pagination={{clickable: true}}
        clickable={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Grid container spacing={2} className="anaContainer twoAna">
            <Grid item xs={12} md={6} className="anaImage">
              <motion.img
                src={AnalysisImg1}
                alt="AnalysisImg1"
                className="AnalysisImg"
              />
            </Grid>
            <Grid item xs={12} md={6} className="anaText">
              <Box>
                <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                  AI Chat Emotion Analyzer 👋
                </Typography>
                <Typography variant="header" component="h1" gutterBottom>
                  카카오톡에서 대화를 추출해주세요!
                </Typography>
                <Typography variant="body1" component="p" gutterBottom style={{ marginTop: '40px' }}>
                  1. 상단 더보기 클릭 후 대화 내용을 클릭하세요
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  2. 대화 내보내기를 클릭해주세요!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </SwiperSlide>

        <SwiperSlide>
          <Grid container spacing={2} mt={6} className="anaContainer">
            <Grid item xs={12} md={6} className="anaImage">
              <motion.img
                src={AnalysisImg2}
                alt="AnalysisImg2"
                className="AnalysisImg"
              />
            </Grid>
            <Grid item xs={12} md={6} className="anaText">
              <Box>
                <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                  AI Chat Emotion Analyzer 😺
                </Typography>
                <Typography variant="header" component="h1" gutterBottom>
                  카카오톡에서 대화를 추출해주세요!
                </Typography>
                <Typography variant="body1" component="p" gutterBottom style={{ marginTop: '40px' }}>
                  3. Text Files(.txt)파일로 저장해주세요
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </SwiperSlide>

        <SwiperSlide>
          <Grid container spacing={2} mt={6} className="anaContainer">
            <Grid item xs={12} md={6} className="anaImage">
              <motion.img
                src={AnalysisImg3}
                alt="AnalysisImg3"
                className="AnalysisImg"
              />
            </Grid>
            <Grid item xs={12} md={6} className="anaText">
              <Box>
                <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                  AI Chat Emotion Analyzer 📂
                </Typography>
                <Typography variant="header" component="h1" gutterBottom>
                  대화를 업로드 해주세요!
                </Typography>
                <Typography variant="body1" component="p" gutterBottom style={{ marginTop: '40px' }}>
                  4. UPLOAD FILE을 클릭 후 파일을 선택해주세요
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  5. UPLOAD를 클릭해 파일을 업로드해주세요!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </SwiperSlide>

      </Swiper>

      <Typography variant="header" component="h1" gutterBottom mt={8}>
        AI 채팅 감정 분석기
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid className="formBox">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className='fileBtn'
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} /> {/* 파일 선택 시 handleFileChange 함수 호출 */}
          </Button>
          {fileName && <span className="fileName">{fileName}</span>} {/* 파일명이 있을 경우 화면에 표시 */}
          <Button variant="outlined" type="submit">Upload</Button>
        </Grid>
      </form>

    </Container>
  );
}
export default Analysis;