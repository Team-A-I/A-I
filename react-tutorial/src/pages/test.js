import { useEffect, useState, useRef } from 'react';
import { Grid, Box } from "@mui/material";
import EmotionOverview from "../components/EmotionOverview.js";
import Highlight from "../components/Highlight.js";
import Ratio from "../components/Ratio.js";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";
import { useLocation, useNavigate } from 'react-router-dom';
import lineChart from '../components/linechart.js'; //라인 차트 생성 함수 임포트

function Test() {
  const theme = baseTheme;
  const location = useLocation();
  const result = location.state.result;
  const [results, setResults] = useState(null);
  const hasSubmitted = useRef(false);
  const [data] = useState(result.individual_score_lists_for_graph);
  const [keys] = useState(Object.keys(result.individual_results).map((key) => key.toString()));
  console.log("keys",Object.keys(result.individual_results));
  useEffect(() => {
    console.log("들어옴");
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    // 카카오톡 대화 이름 값만 추출
    //const keyResult = Object.keys(result.individual_results);
    // 누적 포인트로 라인 차트 생성 (linechart.js로 데이터 전달)
    //const dataResult = result.individual_score_lists_for_graph;
    //console.log("진짜임",keys);
    
    //setData(dataResult);
    //setKeys(keyResult);
    // 결과 값 저장
    setResults(result.individual_results)
  }, []);
  return (
    
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container spacing={0}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <EmotionOverview data={data}/>
          </Grid>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <Highlight />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Ratio />
          </Grid>
          {/* ------------------------- row 3 ------------------------- */}
          {/* <BlogCard /> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Test;
