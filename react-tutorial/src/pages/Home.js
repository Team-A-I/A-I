import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/Home.css'; // 스타일 파일 임포트
import katalkImage from '../images/katalk.png'; // 이미지 파일 임포트
import gifImage from '../images/some.gif'; // GIF 이미지 파일 임포트
import chartImage from '../images/chart.png'; // 이미지 파일 임포트

const Home = () => {
  const { ref: secondSectionRef, inView: secondSectionInView } = useInView({ triggerOnce: true });

  return (
    <Container maxWidth="lg">

      {/* 세션1 */}
      <Grid container spacing={2} className="home-container">
        <Grid item xs={12} md={6} className="home-image">
          <motion.img 
            src={katalkImage} 
            alt="Pigeon AI" 
            className="image"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </Grid>
        <Grid item xs={12} md={6} className="home-text">
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                AI Chat Emotion Analyzer 💑
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom>
                AI 채팅 감정 분석기
              </Typography>
              <Typography variant="body1" component="p" gutterBottom style={{ marginTop: '40px' }}>
                AI기반으로 채팅내용을 분석하여 
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                상대방의 감정을 알아보세요
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                href="#" 
                style={{ 
                  marginTop: '30px', 
                  padding: '10px 60px', 
                  fontSize: '15px'
                }}
              >
                알아보러 가기 
              </Button>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
      

      {/* 세션2 */}
      <Grid container spacing={2} className="home-container" ref={secondSectionRef}>
        <Grid item xs={12} md={6} className="home-text">
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: secondSectionInView ? 1 : 0, x: secondSectionInView ? 0 : 50 }}
              transition={{ duration: 2 }}
            >
              <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                AI Chat Emotion Analyzer 🤭
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom>
                나한테 호감 있는건가 ?
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text" style={{ marginTop: '40px' }}>
                뭐지, 이시간에 연락이 오는 이유는 
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text">
                무슨 마음일지 궁금해 ! 
              </Typography>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="home-image">
          <motion.img 
            src={gifImage} 
            alt="Pigeon AI" 
            className="image"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: secondSectionInView ? 1 : 0, y: secondSectionInView ? 0 : -50 }}
            transition={{ duration: 2 }}
          />
        </Grid>
      </Grid>


       {/* 세션3 */}
      <Grid container spacing={2} className="home-container" ref={secondSectionRef}>
        <Grid item xs={12} md={6} className="home-text">
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: secondSectionInView ? 1 : 0, x: secondSectionInView ? 0 : 50 }}
              transition={{ duration: 2 }}
            >
              <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                AI Chat Emotion Analyzer 🤭
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom>
                간단한 차트로 한눈에 !
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text" style={{ marginTop: '40px' }}>
                대화별 감정기복과 비율
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text">
                상대방과 나의 감정을 비교해줘요
              </Typography>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="home-image">
          <motion.img 
            src={chartImage} 
            alt="Pigeon AI" 
            className="image"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: secondSectionInView ? 1 : 0, y: secondSectionInView ? 0 : -50 }}
            transition={{ duration: 2 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
