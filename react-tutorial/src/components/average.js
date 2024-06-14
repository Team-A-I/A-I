import React from "react";
import { Card, CardContent, Typography, Box, Grid, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import chartAvarage from "../images/chart_avarage.png"; // 이미지 파일 임포트

const Average = ({ averageDailyMessageCounts }) => {

  const theme = useTheme();

  if (!averageDailyMessageCounts || Object.keys(averageDailyMessageCounts).length === 0) {
    return null; // averageDailyMessageCounts가 없으면 아무것도 렌더링하지 않음
  }

  const userNames = Object.keys(averageDailyMessageCounts);
  const series = [{
    name: "하루평균 메시지 개수",
    data: userNames.map(name => Math.round(averageDailyMessageCounts[name])) // 소수점 없는 정수로 변환
  }];

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val); // 소수점 없는 정수로 표시
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return Math.round(val); // 소수점 없는 정수로 표시
        }
      }
    },
    xaxis: {
      categories: userNames,
      title: {
        text: '하루 평균 카톡 개수'
      }
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    legend: {
      position: 'bottom'
    },
    colors: [theme.palette.primary.main] // 원하는 색상으로 설정
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h3"
          sx={{ marginBottom: "0" }}
          gutterBottom
          style={{ fontWeight: 'bold', fontSize: '30px' }}
        >
          &nbsp;&nbsp;TURN ON THE GREEN LIGHT!
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{ mt: 2, textAlign: 'center' }} // 가운데 정렬
              style={{ fontWeight: 'bold', fontSize: '20px' }}
            >
              your Result
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Chart
                options={options}
                series={series}
                type="bar"
                height="250px" 
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
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
      </CardContent>
    </Card>
  );
};

export default Average;
