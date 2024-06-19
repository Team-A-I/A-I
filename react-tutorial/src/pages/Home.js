import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import '../css/Home.css'; 
import gifImage from '../images/some.gif'; 
import chartImage from '../images/chart.png'; 
import averageImage from '../images/average.png'; 
import logo from '../images/logo.png';

const Home = () => {
  const { ref: secondSectionRef, inView: secondSectionInView } = useInView({ triggerOnce: true });
  const { ref: thirdSectionRef, inView: thirdSectionInView } = useInView({ triggerOnce: true });
  const { ref: fourthSectionRef, inView: fourthSectionInView } = useInView({ triggerOnce: true });
  const [showScroll, setShowScroll] = useState(false);


  // 페이지가 스크롤 되었을 때 호출되어 스크롤의 위치를 확인.
  // 페이지의 Y축 스크롤 값이 300보다 크면 스크롤 버튼을 보이게 설정하고,
  // 그렇지 않으면 버튼을 숨깁니다.
  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  }, [showScroll]);

  // currentMessage 상태를 정의. 이 상태는 현재 표시할 메시지의 인덱스를 나타냅니다.
  const [currentMessage, setCurrentMessage] = useState(0);

  // 페이지 상단으로 부드럽게 스크롤하는 기능.
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 각 메시지는 type과 text 속성을 가져 표시할 메시지들을 정의.
  const messages = [
    { type: 'right', text: '집에 잘 들어가셨나요?^^' },
    { type: 'left', text: '네~ 방금 들어왔어요 ~~' },
    { type: 'right', text: '저도 방금 들어왔네요~\n오늘 너무 즐거운 시간이였어요:)' },
    { type: 'left', text: '저도요~ 시간이 너무 \n빨리 지나가서 아쉬워요 ㅠ' },
    { type: 'right', text: '로제 파스타로 유명한 집이 있는데~\n다음주 토요일 점심에 \n시간 어떠세요??' },
    { type: 'left', text: '음 ~~ 네!! 좋아요 !!' },
  ];

  // useEffect 훅은 currentMessage 상태를 주기적으로 업데이트 한다.
  // 3000ms(3초)마다 currentMessage 상태를 업데이트하여 다음 메시지를 표시합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 3000);

    // 컴포넌트가 언마운트 될 때 인터벌을 정리하여 메모리 누수를 방지한다.
    return () => clearInterval(interval);
  }, [messages.length]); // messages.length를 의존성으로 설정하여 메시지 배열의 길이가 변경될 때만 이 훅이 다시 실행된다.


  // 이 useEffect 훅은 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가하고,
  // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거합니다.
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [checkScrollTop]); // checkScrollTop을 의존성으로 설정하여 checkScrollTop 함수가 변경될 때만 이 훅이 다시 실행된다.

  return (
    <Container maxWidth="lg" className="home-container">
      {/* 세션1 */}
      <Grid className="home-section" >
        <Grid container className="home-content">
           {/* 왼쪽 열 */}
          <Grid item xs={12} md={4}>

            {/* React 컴포넌트가 조건부로 렌더링되거나 리스트가 동적으로 변경될 때,
                컴포넌트가 사라질 때도 애니메이션 효과를 주고 싶다면 AnimatePresence를 사용
                컴포넌트가 언마운트될 때 애니메이션을 적용하지 않지만, 
                AnimatePresence를 사용하면 이 과정을 제어할 수 있다.*/}
                
            <AnimatePresence>
              {/* 조건부 렌더링: 현재 메시지가 'left' 타입일 때만 메시지 표시 */}
              {messages[currentMessage].type === 'left' && (
                <motion.div
                  className="message-left"
                  key={messages[currentMessage].text}  // 메시지 텍스트를 키로 설정하여 고유성을 유지
                  initial={{ opacity: 0, y: 50 }} // 초기 애니메이션 상태: 투명도 0, 아래쪽으로 50px 이동
                  animate={{ opacity: 1, y: 0 }} // 애니메이션 상태: 투명도 1, 원래 위치
                  exit={{ opacity: 0, y: -50 }} // 종료 애니메이션 상태: 투명도 0, 위쪽으로 50px 이동
                  transition={{ duration: 0.5, delay: 2 }} // 애니메이션 지속 시간과 지연 설정
                >
                  {/* 줄 바꿈을 위해 pre-line 사용 */}
                  <Typography variant="body1" component="p" style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)', whiteSpace: 'pre-line' }}> 
                    {messages[currentMessage].text}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>
          <Grid item xs={12} md={4} className="first-text"> 
            {/* 가운데 열 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // 초기 애니메이션 상태: 투명도 0, 아래쪽으로 50px 이동
              animate={{ opacity: 1, y: 0 }} // 애니메이션 상태: 투명도 1, 원래 위치
              exit={{ opacity: 0, y: -50 }} // 종료 애니메이션 상태: 투명도 0, 위쪽으로 50px 이동
              transition={{ duration: 2 }} // 애니메이션 지속 시간 설정
            >
              <Typography variant="header" component="h4" mt={45} gutterBottom className="home-text-header1">
                AI Chat Emotion Analyzer
                <motion.img 
                  src={logo} 
                  alt="Pigeon AI" 
                  height={60}
                />
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom>
                AI 채팅 <span style={{ fontSize: '1.2em', color: 'rgb(246,225,148)', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>감정</span> 분석기
              </Typography>
              <Typography variant="body1" component="p" gutterBottom style={{ marginTop: '25px'}}>
                AI기반으로 채팅내용을 분석하여 
              </Typography>
              <Typography variant="body1" component="p" gutterBottom >
                상대방의 감정을 알아보세요
              </Typography>
              <ScrollLink to="second-section" smooth={true} duration={1000}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/analysis"
                  className='button'
                >
                  알아보러 가기 
                </Button>
              </ScrollLink>
            </motion.div>
            <ScrollLink to="second-section" smooth={true} duration={1000}>
                <KeyboardDoubleArrowDownIcon 
                  style={{ marginTop: '20px', cursor: 'pointer', fontSize: '40px', color: 'rgb(255,255,255)' }}
                />
            </ScrollLink>
          </Grid>
          <Grid item xs={12} md={4}>
             {/* 오른쪽 열 */}
            <AnimatePresence>
              {/* 조건부 렌더링: 현재 메시지가 'right' 타입일 때만 메시지 표시 */}
              {messages[currentMessage].type === 'right' && (
                <motion.div
                  className="message-right"
                  key={messages[currentMessage].text}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  <Typography variant="body1" component="p" style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)', whiteSpace: 'pre-line' }}>
                    {messages[currentMessage].text}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>
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
                나한테 호감이 있는건가 ?
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
      <Grid container spacing={2} className="home-container" ref={thirdSectionRef} style={{ width: '100vw', marginLeft: 'calc(-50vw + 49.3%)' }}>
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
                간단한 차트로 한눈에  !
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
