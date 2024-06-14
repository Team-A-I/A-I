import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import chartAvarage from "../images/chart_avarage.png"; // 이미지 파일 임포트

const Average = ({ averageDailyMessageCounts }) => {
  console.log("Average Daily Message Counts in Average:", averageDailyMessageCounts); // 로그 추가

  if (!averageDailyMessageCounts || Object.keys(averageDailyMessageCounts).length === 0) {
    return null; // averageDailyMessageCounts가 없으면 아무것도 렌더링하지 않음
  }

  const userNames = Object.keys(averageDailyMessageCounts);
  const series = [{
    name: "Average Daily Messages",
    data: userNames.map(name => averageDailyMessageCounts[name])
  }];

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: userNames,
    },
    legend: {
      position: 'bottom'
    }
  };

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
            flexDirection: "column"
          }}
        >
          <Typography
            variant="h3" 
            sx={{ marginBottom: "0" }} 
            gutterBottom 
            style={{ fontWeight: 'bold', fontSize: '30px' }}
          >
            &nbsp;&nbsp;TURN ON THE GREEN LIGHT!
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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
          <Typography 
            variant="body1" 
            sx={{ mt: 2 }} 
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            &nbsp;&nbsp;&nbsp;당신의 결과값과 함께 비교를 해보세요
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ mt: 2 }} 
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            &nbsp;&nbsp;&nbsp;차트 들어올자리
          </Typography>
          <Box sx={{ width: '100%', mt: 3 }}>
            <Chart
              options={options}
              series={series}
              type="bar"
              height="380px"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Average;
