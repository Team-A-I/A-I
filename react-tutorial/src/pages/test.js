import React from "react";
import { Grid, Box } from "@mui/material";
import EmotionOverview from "../componets/EmotionOverview";
import Highlight from "../componets/Highlight";
import Ratio from "../componets/Ratio";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "../css/Dashboard";

const Test = () => {
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      <Box>
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
