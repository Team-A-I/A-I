import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import Load from './pages/Load';
import Analysis from './pages/Analysis';
import Result from './pages/result';
import './css/App.css';

function App() {
  const location = useLocation(); // 현재 URL 경로를 가져옵니다.
  const [isScrolled, setIsScrolled] = useState(false);  // 스크롤 상태를 관리하는 state입니다.

  const isHome = location.pathname === '/'; // 현재 경로가 홈 페이지인지 확인합니다.

  // 스크롤 이벤트 핸들러입니다. 스크롤 위치가 100px 이상이면 isScrolled를 true로 설정합니다.
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // 컴포넌트가 마운트될 때와 isHome 값이 변경될 때 실행됩니다.
  useEffect(() => {
    if (isHome) {
      window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너를 추가
      return () => {
        window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      };
    }
  }, [isHome]);

  return (
    <div>
      {/* 네비게이션 바를 설정 */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 2, 
          backgroundColor: isHome ? (isScrolled ? 'transparent' : 'rgba(255, 255, 255, 0.0)') : 'primary.main',
          boxShadow: isHome && !isScrolled ? 'none' : '',
          transition: 'background-color 0.3s, box-shadow 0.3s'
        }}
        style={{ display: isHome && isScrolled ? 'none' : 'flex' }}
      >
        <Toolbar sx={{zIndex: 3}}>
          <Typography variant="h6" component="div" className='Nav-header'>
            Sentiment Analysis
          </Typography>

          {/* 네비게이션 버튼들 */}
          <Button color="inherit" component={Link} className='Nav' to="/">Home</Button>
          <Button color="inherit" component={Link} className='Nav' to="/analysis">Analysis</Button>
        </Toolbar>
      </AppBar>

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/test" element={<Result />} />
        <Route path="/load" element={<Load />} />
      </Routes>
    </div>
  );
}

export default App;
