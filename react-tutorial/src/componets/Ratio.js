import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const Ratio = () => {
  const optionsPie1 = {
    labels: ["Positive", "Negative", "Neutral"],
    colors: ["#00E396", "#FF4560", "#FEB019"],
    legend: {
      position: 'bottom'
    }
  };

  const seriesPie1 = [44, 55, 41];

  const optionsPie2 = {
    labels: ["Excellent", "Good", "Average", "Poor"],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
    legend: {
      position: 'bottom'
    }
  };

  const seriesPie2 = [35, 30, 20, 15];

  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Emotion Ratio
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: {
                sm: "48%",
                xs: "100%",
              },
              mb: 3,
            }}
          >
            <Chart
              options={optionsPie1}
              series={seriesPie1}
              type="pie"
              height="380px"
            />
          </Box>
          <Box
            sx={{
              width: {
                sm: "48%",
                xs: "100%",
              },
              mb: 3,
            }}
          >
            <Chart
              options={optionsPie2}
              series={seriesPie2}
              type="pie"
              height="380px"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Ratio;
