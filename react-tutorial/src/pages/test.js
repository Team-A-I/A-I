
import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Button, Collapse } from "@mui/material";
import Average from "../components/average";
import Term from "../components/term";
import EmotionOverview from "../components/EmotionOverview.js";
import Highlight from "../components/Highlight.js";
import Ratio from "../components/Ratio.js";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";
import { useLocation, useNavigate } from 'react-router-dom';

function Test() {
  const theme = baseTheme;
  const [showMore, setShowMore] = useState(false);
  const handleToggle = () => {setShowMore(!showMore);};
  const location = useLocation();
  const result = location.state ? location.state.result : {};  // result가 null일 경우 빈 객체로 설정


  const sentimentScores = result.sentiment_avg_scores_percentage || {};
  const affinityScores = result.affinity_scores || {};
  const averageDailyMessageCounts = result.average_daily_message_counts || {};
  const replyGaps = result.reply_gaps || [];  // 답장 텀 데이터를 가져옵니다
  const individualResults = result.individual_results || {};
  const [results, setResults] = useState(null);
  const hasSubmitted = useRef(false);
  const [data] = useState(result.individual_score_lists_for_graph || []);
  const [summary_answer] = useState(result.summary_mixed_results || []);
  const [keys] = useState(Object.keys(individualResults).map((key) => key.toString()));

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setResults(individualResults);
  }, [individualResults]);

  return (
    
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "1200px", 
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <EmotionOverview data={data}/>
          </Grid>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <Highlight data={summary_answer}/>
          </Grid>
          <Grid item xs={12} lg={8}>
            {Object.keys(sentimentScores).length && Object.keys(affinityScores).length ? (
              <Ratio sentimentScores={sentimentScores} affinityScores={affinityScores} />
            ) : (
              <p>No data to display</p> // 데이터가 없을 때 표시할 메시지
            )}
          </Grid>
          {/* ------------------------- row 3 ------------------------- */}
          <Grid item xs={12} textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleToggle}>
              {showMore ? "숨기기" : "추가로 확인하기"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={showMore}>
              <Box mt={4}>
              {averageDailyMessageCounts && Object.keys(averageDailyMessageCounts).length > 0 ? (
                  <Average averageDailyMessageCounts={averageDailyMessageCounts} />
                ) : (
                  <p>No data to display</p> // 데이터가 없을 때 표시할 메시지
                )}
                {replyGaps && replyGaps.length > 0 ? (
                  <Term replyGaps={replyGaps} />
                ) : (
                  <p>No reply gaps data to display</p> // 답장 텀 데이터가 없을 때 표시할 메시지
                )}
              </Box>
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Test;
