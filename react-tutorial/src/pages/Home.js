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
              <Typography variant="h3" component="h1" gutterBottom>
                What is Pigeon AI?
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                We are a small group of individuals looking to build software that helps small businesses with a focus on shipping.
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                If you are a business that ships items we would appreciate it if you would fill out this quick 5 min survey to see if you may be a fit to test drive our product early.
              </Typography>
              <Button variant="contained" color="primary" href="#">
                채팅 업로드 
              </Button>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
