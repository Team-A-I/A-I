import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import greenlight from "../images/greenlight.jpg"; 

ChartJS.register(...registerables);

const Term = ({ replyGaps }) => {
  // gap이 200 이하인 데이터만 필터링
  const filteredReplyGaps = replyGaps.filter(entry => entry.gap <= 200);
  
  const userNames1 = replyGaps[0].from
  const userNames2 = replyGaps[0].to
  const data = {
    labels: filteredReplyGaps.map((_, index) => index + 1), // 메시지 순서 (1, 2, 3, ...)
    datasets: [
      {
        label: '상대방과의 카톡 답장시간',
        data: filteredReplyGaps.map(entry => entry.gap), // 각 메시지 간의 시간 차이
        fill: false,
        backgroundColor: '#38b000',
        borderColor: '#38b000',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
        },
        grid: {
          display: false, // x축 그리드 숨김
        },
      },
      y: {
        beginAtZero: true,
        max: 200, 
        title: {
          display: true,
          text: '시간 (분)'
        },
        grid: {
          display: false, // y축 그리드 숨김
        },
      },
    },
  };

  return (
    <Card variant="outlined"
    sx={{
        pb: 0,
        height: '450px'
      }}>
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
          {/* <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Box
              component="img"
              alt="Sample"
              src={term}
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box> */}
        <Typography
          sx={{
          fontWeight: "bold",
          fontSize: "h5.fontSize",
          marginBottom: "0",
          }}
          gutterBottom
        >
          {userNames1}님과 {userNames2}님의 답장 속도
        </Typography>
        <Typography
            color="textSecondary"
            variant="body1"
            sx={{
            fontWeight: "bold",
            fontSize: "12px",
            }}
        >
             ※ 200분 이상에 데이터는 통계되지 않습니다.
        </Typography>
          <Box sx={{ mt: 10, width: '100%' }}>
            <Line data={data} options={options} />
          </Box>
        </Box>
      </CardContent>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "h5.fontSize",
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        gutterBottom
      >
        일정 간격으로 주고 받았나요?
        <img src={greenlight} alt="greenlight" style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
      </Typography>
    </Card>
  );
};

export default Term;
