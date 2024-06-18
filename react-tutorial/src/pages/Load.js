import * as React from 'react';
import { useEffect, useRef, useCallback, useState } from 'react';
import '../css/Load.css';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {style} from '../css/modal.js'
import Alert from '@mui/material/Alert';
import Group_34 from '../images/Group 34.png';
import Group_35 from '../images/Group 35.png';
import Group_36 from '../images/Group 36.png';
import Group_37 from '../images/Group 37.png';
import Group_38 from '../images/Group 38.png';
import Group_39 from '../images/Group 39.png';

function Load() {
  //페이지 이동 함수 생성
  const location = useLocation();
  const navigate = useNavigate();
  // 파일 저장
  const file = location.state.file;
  // 파일 업로드 핸들러
  const hasSubmitted = useRef(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/analysis');
  };
 


  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    // formData 생성

    if(file.type !== "text/plain")  {
      handleOpen2();
    }else{
   
      const formData = new FormData();
      // formData에 파일 추가
      formData.append('file', file);
      try {
        // 백엔드로 파일 전송
          const response = await axios.post('https://gnat-suited-weekly.ngrok-free.app/files/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          });
          // 결과 값 받아오기
          const result = response.data
          if(result === 'n') {
            handleOpen();
          }else{
          // 페이지 이동
          navigate('/test', { state: { result: result }});
          }
          } catch (error) {
            console.error('Error uploading file:', error);
          }

        }
      }, [file, navigate]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  
  const images = [Group_34, Group_35, Group_36, Group_37, Group_38, Group_39];

  function GradientCircularProgress() {

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

    return (
      <div style={{ position: 'relative', display: 'inline-block', width: '450px', height: '450px' }}>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="90%">
              <stop offset="10%" stopColor="#73B9FF15" />
              <stop offset="20%" stopColor="#73B9FF10" />
              <stop offset="50%" stopColor="#1976D230" />
              <stop offset="70%" stopColor="#1976D2" />
              <stop offset="100%" stopColor="#F28188" />
            </linearGradient>
          </defs>
        </svg>
  
        <CircularProgress
          variant="determinate"
          sx={{
            color: '#73B9FF15'
          }}
          size={450}
          thickness={1}
          value={100}
        />
        <CircularProgress 
          size={450}
          thickness={1}
          disableShrink
          sx={{ 
            'svg circle': { stroke: 'url(#my_gradient)' },
            animationDuration: '10000ms',
            position: 'absolute',
            top: 0,
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }} 
        />
        {currentImage && (
        <img
          src={currentImage}
          alt="centered"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '200px',
            borderRadius: '50%',
          }}
          />
        )}
      </div>
    );
  }

  const createBlinkAnimation = (delay) => keyframes`
  0% { opacity: 0; }
  ${delay}% { opacity: 1; }
  ${delay + 33}% { opacity: 0; }
  100% { opacity: 0; }
`;

const Dot = styled.span`
  font-size: 1.5em;
  display: inline-block;
`;

const Dot1 = styled(Dot)`
  animation: ${createBlinkAnimation(0)} 3s infinite;
`;

const Dot2 = styled(Dot)`
  animation: ${createBlinkAnimation(33)} 3s infinite;
`;

const Dot3 = styled(Dot)`
  animation: ${createBlinkAnimation(66)} 3s infinite;
`;
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Stack sx={{ color: 'grey.500' }} spacing={5} direction="column" className='box' alignItems="center">
      <GradientCircularProgress/>
      <Typography variant="h5" component="p" gutterBottom style={{ marginTop: '40px', fontWeight:'bold' }}>
        Loading      
        <Dot1>.</Dot1>
        <Dot2>.</Dot2>
        <Dot3>.</Dot3>
      </Typography>
    </Stack>
  </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} id="modal-box">
            <Alert severity="info" id="modal-modal-title">
              혹시 단체 대화를 분석 요청하셨나요?
            </Alert>
          <Box id="modal-text">
            <Typography id="modal-modal-description" sx={{ mt: 3 }}>
              저희 서비스는 현재 일대일 대화만
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              분석 가능합니다!
            </Typography>
            </Box>
            <Box id="button-box">
              <Button className="modal-button" variant="contained" disableElevation onClick={handleClose} >확인</Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} id="modal-box">
            <Alert severity="info" id="modal-modal-title">
                파일 형식을 확인해주세요!
            </Alert>
            <Box id="modal-text">
              <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                저희 서비스는 카카오톡에서 추출된
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                대화 txt파일만 지원합니다!
              </Typography>
            </Box>
            <Box id="button-box">
              <Button className="modal-button" variant="contained" disableElevation onClick={handleClose} >확인</Button>
            </Box>
          </Box>
        </Modal>
        
    </>
    
  );
}

export default Load;