import React, { useState } from "react";
import { Grid, Box, Button, Collapse } from "@mui/material";
import EmotionOverview from "../components/EmotionOverview";
import Highlight from "../components/Highlight";
import Ratio from "../components/Ratio";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";

const Test = () => {
  const theme = baseTheme;
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

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
          <Grid item xs={12}>
            <EmotionOverview />
          </Grid>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <Highlight />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Ratio />
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
                {/* 여기에 더 많은 정보를 표시할 컴포넌트를 추가합니다 */}
                <Highlight />
                <Ratio />
              </Box>
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Test;
