import { useEffect, useRef } from 'react';
import '../css/Load.css';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';

function Load() {
  //페이지 이동 함수 생성
  const location = useLocation();
  const navigate = useNavigate();
  // 파일 저장
  const file = location.state.file;
  // 파일 업로드 핸들러
  const hasSubmitted = useRef(false);

  // 파일 업로드하여 백에서 결과 값 받아오기
  const handleSubmit = async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    // formData 생성
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
        // 페이지 이동
        navigate('/test', { state: { result: result }});
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  } 
  // 페이지 마운트 시 실행
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
    </>
  );
}



export default Load;
