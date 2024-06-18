import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import greenlight from "../images/greenlight.jpg"; 

ChartJS.register(...registerables); // Chart.js를 등록합니다.

const Term = ({ replyGaps }) => {
  // gap이 200 이하인 데이터만 필터링
  const filteredReplyGaps = replyGaps.filter(entry => entry.gap <= 200);
  
  // 유저 이름을 변수에 저장합니다.
  const userNames1 = replyGaps[0].from
  const userNames2 = replyGaps[0].to

  // 차트에 사용할 데이터와 설정을 정의합니다.
  const data = {
    labels: filteredReplyGaps.map((_, index) => index + 1), // 메시지 순서 (1, 2, 3, ...)
    datasets: [
      {
        label: '상대방과의 카톡 답장시간', // 데이터셋의 라벨
        data: filteredReplyGaps.map(entry => entry.gap), // 각 메시지 간의 시간 차이
        fill: false,
        backgroundColor: '#38b000', // 데이터셋의 배경색
        borderColor: '#38b000', // 데이터셋의 테두리 색
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
        beginAtZero: true, // y축의 시작점을 0으로 설정
        max: 200,   // y축의 최대값을 200으로 설정
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
    // MUI Card 컴포넌트를 사용하여 외곽선이 있는 카드 레이아웃을 생성합니다.
    <Card variant="outlined" sx={{pb: 0, height: '450px'}}>
      <CardContent>
        <Box
          sx={{
            display: { 
              sm: "flex", // 작은 화면(sm)에서는 flex 레이아웃을 사용합니다.
              xs: "block", // 초소형 화면(xs)에서는 block 레이아웃을 사용합니다.
            },
            alignItems: "flex-start", // 아이템들을 상단 정렬합니다.
            flexDirection: "column" // 아이템들을 세로로 정렬합니다.
          }}
        >
        <Typography
          sx={{
          fontWeight: "bold",
          fontSize: "h5.fontSize",
          marginBottom: "0",
          }}
          gutterBottom  // 하단 여백을 추가하는 MUI의 기본 설정입니다.
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
