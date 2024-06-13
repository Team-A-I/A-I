import { useEffect, useState, useRef } from 'react';
import { Grid, Box } from "@mui/material";
import EmotionOverview from "../components/EmotionOverview.js";
import Highlight from "../components/Highlight.js";
import Ratio from "../components/Ratio.js";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";
import { useLocation, useNavigate } from 'react-router-dom';

function Test() {
  const theme = baseTheme;
  const location = useLocation();
  const result = location.state.result;
  const [results, setResults] = useState(null);
  const hasSubmitted = useRef(false);
  const [data] = useState(result.individual_score_lists_for_graph);
  const [keys] = useState(Object.keys(result.individual_results).map((key) => key.toString()));
  console.log("이게keys",keys)
  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setResults(result.individual_results)
  }, []);
  return (
    
    <ThemeProvider theme={theme}>
      <Box
        sx={{
            maxWidth: "1200px", 
            margin: "0 auto",
            padding: "20px",
          }}
        >
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
