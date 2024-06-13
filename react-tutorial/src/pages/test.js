import React from "react";
import { Grid, Box } from "@mui/material";
import EmotionOverview from "../components/EmotionOverview";
import Highlight from "../components/Highlight";
import Ratio from "../components/Ratio";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";

const Test = () => {
  const theme = baseTheme;
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
          {/* <BlogCard /> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Test;
