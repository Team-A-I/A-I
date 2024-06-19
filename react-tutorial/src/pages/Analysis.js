import React, { useState } from 'react';
import '../css/Analysis.css'; // CSS 파일 임포트
import AnalysisImg1 from '../images/AnalysisImg1.png';
import AnalysisImg2 from '../images/AnalysisImg2.png';
import AnalysisImg3 from '../images/AnalysisImg3.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // 구름 아이콘 임포트
import { motion } from 'framer-motion'; // motion 컴포넌트 임포트
import { Button, Typography, Grid, styled, Container, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

function Analysis() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("파일을 선택해주세요. ");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 페이지 이동
    navigate('/load', { state: { file: file }});
  };

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

  const matches = useMediaQuery('(max-width:600px)');
  let itemXsValue = matches ? 6 : 4;

  return (
    <Container maxWidth="lg" style={{ marginTop: '64px' }}>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{delay : 5000}}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Grid container spacing={2} className="anaContainer">
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
          <Grid container spacing={2} mt={10} className="anaContainer">
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
          <Grid container spacing={2} mt={10} className="anaContainer">
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

      <Typography variant="header" component="h1" gutterBottom mt={7}>
        AI 채팅 감정 분석기
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid className="formBox" container spacing={2}>
          <Grid item xs={itemXsValue} className="formTitle">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className='fileBtn'
            >
              Upload file
              <VisuallyHiddenInput type="file" accept=".txt" onChange={handleFileChange} /> {/* 파일 선택 시 handleFileChange 함수 호출 */}
            </Button>
          </Grid>
          <Grid item xs={itemXsValue} className="formFileName">
            {fileName && <span className="fileName">{fileName}</span>} {/* 파일명이 있을 경우 화면에 표시 */}
          </Grid>
          <Grid item xs={itemXsValue} className="formTitle">
            <Button variant="outlined" type="submit">Upload</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Analysis;
