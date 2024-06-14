import * as React from 'react';
import { useEffect, useRef } from 'react';
import '../css/Load.css';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {style} from '../css/modal.js'
import Alert from '@mui/material/Alert';

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
  const handleSubmit = async () => {
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
          const response = await axios.post('http://127.0.0.1:8000/files/', formData, {
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
      };
      
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
        <h1>대화를 분석하고 있습니다. 잠시만 기다려주세요.</h1>
        <div>
        <Stack sx={{ color: 'grey.500'}} spacing={2} direction="row" className='box'>
            <CircularProgress />
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
