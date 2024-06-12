import React from 'react';
import '../css/Load.css';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Load = () => {
  return (
    <>
        <h1>대화를 분석하고 있습니다. 잠시만 기다려주세요.</h1>
        <div>
        <Stack sx={{ color: 'grey.500'}} spacing={2} direction="row" className='box'>
            <CircularProgress />
        </Stack>
        </div>
    </>
  );
};

export default Load;
