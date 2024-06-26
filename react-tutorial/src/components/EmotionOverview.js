import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from 'react-apexcharts';

var list1 = []
var list2 = []
var key1 = []
var key2 = []
var keys = []
function EmotionOverview (data) {
  const responseList = data;
  
  keys = Object.keys(responseList[Object.keys(responseList)[0]])

  list1 = Object.values(responseList[Object.keys(responseList)[0]])[0];

  list2 = Object.values(responseList[Object.keys(responseList)[0]])[1];

  //대화 
  key1 = keys[0];
  key2 = keys[1];

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
      // offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    colors: ["#FF788F", "#1976D2"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      colors: ["#FF788F", "#1976D2"],
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
      // min: -1,
      // categories: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "July",
      //   "Aug",
      //   "Sept",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ],
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
    yaxis: {
      show: false,
      // min: 0,
      // max: 60,
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
      colors: ["#FF788F", "#1976D2"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  const seriessalesoverview = [
    {
      name: key1,
      data: list1
    },
    {
      name: key2,
      data: list2
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
                fontWeight: "bold",
              }}
              gutterBottom
            >
              대화별 감정 분석
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
                  backgroundColor: "#FF788F",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#FF788F",
                  fontWeight  : "bold"
                }}
              >
                {key1}
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
                  fontWeight  : "bold" 
                }}
              >
                {key2}
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