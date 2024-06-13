import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from 'react-apexcharts';

const EmotionOverview = () => {
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    colors: ["#1e4db7", "#a7e3f4"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      colors: ["#1e4db7", "#a7e3f4"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 0,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
      labels: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: '#c1cad482'
      },
      axisTicks: {
        show: false,
      },
    },
    stroke: {
      show: true,
      width: 3,
      curve: "smooth",
      colors: ["#1e4db7", "#a7e3f4"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  const generateRandomData = (numPoints, min, max) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  };

  const calculateMovingAverage = (data, windowSize) => {
    let result = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
      const window = data.slice(i, i + windowSize);
      const average = window.reduce((sum, value) => sum + value, 0) / windowSize;
      result.push(average);
    }
    return result;
  };

  const dataAmpleAdmin = generateRandomData(150, 100, 400);
  const dataPixelAdmin = generateRandomData(150, 100, 400);

  const smoothDataAmpleAdmin = calculateMovingAverage(dataAmpleAdmin, 5);
  const smoothDataPixelAdmin = calculateMovingAverage(dataPixelAdmin, 5);

  const seriessalesoverview = [
    {
      name: "Ample Admin",
      data: smoothDataAmpleAdmin,
    },
    {
      name: "Pixel Admin",
      data: smoothDataPixelAdmin,
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: "0",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "16px !important",
        }}
      >
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "center",
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
              Emotion Overview
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "secondary.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "secondary.main",
                }}
              >
                Ample
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                }}
              >
                Pixel Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="line"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmotionOverview;
