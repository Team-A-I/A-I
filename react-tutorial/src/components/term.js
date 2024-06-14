import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import term from "../images/term.png"; // 이미지 파일 임포트

ChartJS.register(...registerables);

const Term = ({ replyGaps }) => {
  // gap이 200 이하인 데이터만 필터링
  const filteredReplyGaps = replyGaps.filter(entry => entry.gap <= 200);

  const data = {
    labels: filteredReplyGaps.map((_, index) => index + 1), // 메시지 순서 (1, 2, 3, ...)
    datasets: [
      {
        label: '상대방과의 카톡 답장시간',
        data: filteredReplyGaps.map(entry => entry.gap), // 각 메시지 간의 시간 차이
        fill: false,
        backgroundColor: '#1976D2',
        borderColor: '#1976D2',
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
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Box
              component="img"
              alt="Sample"
              src={term}
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
            &nbsp;&nbsp;당신의 결과값과 함께 비교를 해보세요
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} style={{ fontWeight: 'bold', fontSize: '13px' }}>
            &nbsp;&nbsp;&nbsp;※ 200분 이상에 데이터는 통계되지 않습니다.
          </Typography>
          <Box sx={{ mt: 8, width: '100%' }}>
            <Line data={data} options={options} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Term;
