import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import Load from './pages/Load';
import Analysis from './pages/Analysis';
import Result from './pages/result';
import './css/App.css';

function App() {
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 2, 
          backgroundColor: isHome ? 'rgba(255, 255, 255, 0.0)' : 'primary.main',
          boxShadow: isHome ? 'none' : ''
        }}
      >
        <Toolbar> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold' , fontSize:'24px'}} >
            Sentiment Analysis
          </Typography>
          <Button color="inherit" component={Link} style={{ fontWeight: '400' , fontSize:'21px'}} to="/">Home</Button>
          <Button color="inherit" component={Link} style={{ fontWeight: '400' , fontSize:'21px'}} to="/analysis">Analysis</Button>
        </Toolbar>
      </AppBar>
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
