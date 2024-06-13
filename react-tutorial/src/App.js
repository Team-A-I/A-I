// src/App.js

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import Load from './pages/Load';
import Analysis from './pages/Analysis';
import Result from './pages/result';
import './css/App.css';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sentiment Analysis App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/analysis">Analysis</Button>
          <Button color="inherit" component={Link} to="/result">Result</Button>
          <Button color="inherit" component={Link} to="/load">Loading</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/load" element={<Load />} />
      </Routes>
    </div>
  );
}

export default App;
