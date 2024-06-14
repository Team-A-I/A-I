import { useEffect, useRef } from 'react';
import '../css/Load.css';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';

function Load() {
  const location = useLocation();
  const file = location.state.file;
  console.log(file); // FormData 출력
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);
  const handleSubmit = async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    
    const formData = new FormData();
    formData.append('file', file);
    try {
      // 백엔드로 파일 전송
        const response = await axios.post('http://127.0.0.1:8000/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        });
        
        const result = response.data
        navigate('/test', { state: { result: result }});
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  } 
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
