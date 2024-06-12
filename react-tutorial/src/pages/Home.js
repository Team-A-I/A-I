import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import '../css/Home.css'; // 스타일 파일 임포트
import katalkImage from '../images/katalk.png'; // 이미지 파일 임포트

const Home = () => {
  return (
    <Container maxWidth="lg">
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
              transition={{ duration: 1 }}
            >
              <Typography variant="header" component="p" gutterBottom className="home-text-header">
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
    </Container>
  );
};

export default Home;
