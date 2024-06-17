import React from "react";
import { Card, CardContent, Typography, Box, Grid, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import chartAvarage from "../images/chart_avarage.png"; 
import term from "../images/term.png"; 

const Sample = ({ averageDailyMessageCounts }) => {

  return (
    <Card variant="outlined"
    sx={{
        pb: 0,
        height: '450px'
      }}>
      <CardContent>
        <Typography
            sx={{
            fontWeight: "bold",
            fontSize: "h3.fontSize",
            marginBottom: "0",
            }}
            gutterBottom
        >
            그린라이트 판별
        </Typography>
        <Typography
            color="textSecondary"
            variant="body1"
            sx={{
            fontWeight: "bold",
            fontSize: "13px",
            }}
        >
            그린라이트와 당신의 결과를 비교해보세요
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Box
                component="img"
                alt="Sample"
                src={chartAvarage}
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
              component="img"
              alt="Sample"
              src={term}
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
      </CardContent>
    </Card>
  );
};

export default Sample;
