import React, { useState, useEffect , useCallback} from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink} from 'react-scroll';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import '../css/Home.css'; // 스타일 파일 임포트
import katalkImage from '../images/katalk.png'; // 이미지 파일 임포트
import gifImage from '../images/some.gif'; // GIF 이미지 파일 임포트
import chartImage from '../images/chart.png'; // 이미지 파일 임포트
import averageImage from '../images/average.png'; // 이미지 파일 임포트

const Home = () => {
  const { ref: secondSectionRef, inView: secondSectionInView } = useInView({ triggerOnce: true });
  const { ref: thirdSectionRef, inView: thirdSectionInView } = useInView({ triggerOnce: true });
  const { ref: fourthSectionRef, inView: fourthSectionInView } = useInView({ triggerOnce: true });

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [checkScrollTop]);

  return (
    <Container maxWidth="lg">
      {/* 세션1 */}
      <Grid container spacing={2} className="home-container" mt={5} style={{ width: '100vw', marginLeft: 'calc(-50vw + 49.3%)' }}>
        <Grid item xs={12} md={6} className="home-image">
          <motion.img 
            src={katalkImage} 
            alt="Pigeon AI" 
            className="main-image"
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
              <ScrollLink 
                to="second-section" 
                smooth={true} 
                duration={1000}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/analysis"
                  style={{ 
                    marginTop: '30px', 
                    padding: '10px 60px', 
                    fontSize: '15px'
                  }}
                >
                  알아보러 가기 
                </Button>
              </ScrollLink>
            </motion.div>
          </Box>
        </Grid>
        <Grid container item xs={12} justifyContent="center" alignItems="center" className="down-button">
          <Box textAlign="center" mb={15}>
            <ScrollLink 
              to="second-section" 
              smooth={true} 
              duration={1000}
            >
              <Button 
                color="primary"
                startIcon={<KeyboardDoubleArrowDownIcon style={{ fontSize: 40 }}/>}
              >
              </Button>
            </ScrollLink>
          </Box>
        </Grid>
      </Grid>

      {/* 세션2 */}
      <Grid container spacing={2} className="home-container" ref={secondSectionRef} id="second-section" style={{ backgroundColor: '#f5f5f5', width: '100vw', marginLeft: 'calc(-50vw + 49.3%)' }}>
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
      <Grid container spacing={2} className="home-container" ref={thirdSectionRef} style={{width: '100vw', marginLeft:'calc(-50vw + 49.3%)'}}>
        <Grid item xs={12} md={6} className="home-text">
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: thirdSectionInView ? 1 : 0, x: thirdSectionInView ? 0 : 50 }}
              transition={{ duration: 2 }}
            >
              <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                AI Chat Emotion Analyzer 📊
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
            animate={{ opacity: thirdSectionInView ? 1 : 0, y: thirdSectionInView ? 0 : -50 }}
            transition={{ duration: 2 }}
          />
        </Grid>
      </Grid>

      {/* 세션4 */}
      <Grid container spacing={2} className="home-container" ref={fourthSectionRef} style={{ backgroundColor: '#f5f5f5', width: '100vw', marginLeft: 'calc(-50vw + 49.3%)' }}>
        <Grid item xs={12} md={6} className="home-text">
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: fourthSectionInView ? 1 : 0, x: fourthSectionInView ? 0 : 50 }}
              transition={{ duration: 2 }}
            >
              <Typography variant="header" component="h4" gutterBottom className="home-text-header">
                AI Chat Emotion Analyzer 📝
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom>
               우리 사이는 지금 어디쯤?
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text" style={{ marginTop: '40px' }}>
                통계자료를 통해 비교!
              </Typography>
              <Typography variant="header" component="p" gutterBottom className="second-text">
                통계와 비교해 알아볼 수 있어요
              </Typography>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="home-image">
          <motion.img 
            src={averageImage} 
            alt="Pigeon AI" 
            className="image"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: fourthSectionInView ? 1 : 0, y: fourthSectionInView ? 0 : -50 }}
            transition={{ duration: 2 }}
          />
        </Grid>
      </Grid>

      <button onClick={scrollTop} className="scroll-to-top-btn">
        <ArrowUpwardIcon />
      </button>

    </Container>
  );
};

export default Home;
