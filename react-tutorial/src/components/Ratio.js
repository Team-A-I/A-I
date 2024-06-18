import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

  // sentimentScores 또는 affinityScores가 없으면 컴포넌트를 렌더링하지 않습니다.
const Ratio = ({ sentimentScores, affinityScores }) => {
  if (!sentimentScores || !affinityScores) {
    return null; 
  }
  
  // sentimentScores 객체의 키(사용자 이름)를 가져와서 userNames 배열에 저장합니다.
  const userNames = Object.keys(sentimentScores);

  // 첫 번째 사용자 차트 데이터
  const optionsPie1 = {
    // 첫 번째 사용자의 감정 점수의 키(감정 유형)를 라벨로 사용합니다
    labels: Object.keys(sentimentScores[userNames[0]]),
    // 차트의 색상을 설정합니다.
    colors: ["#00E396", "#FF4560", "#FEB019", "#008FFB", "#775DD0", "#D4526E", "#FEB019", "#FF4560"],
    legend: {
      position: 'bottom' // 범례를 하단에 배치합니다.
    } 
  };

  // 첫 번째 사용자의 감정 점수의 값을 시리즈로 사용합니다.
  const seriesPie1 = Object.values(sentimentScores[userNames[0]]);

  // 두 번째 사용자 차트 데이터
  const optionsPie2 = {
    labels: Object.keys(sentimentScores[userNames[1]]),
    colors: ["#00E396", "#FF4560", "#FEB019", "#008FFB", "#775DD0", "#D4526E", "#FEB019", "#FF4560"],
    legend: {
      position: 'bottom'
    }
  };
  const seriesPie2 = Object.values(sentimentScores[userNames[1]]);

  return (
    <Card
      variant="outlined"
      sx={{
        pb: 0,
        height: '550px'
      }}
    >
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
                marginBottom: "15px",
                fontWeight: "bold",
              }}
              gutterBottom
            >
              화자별 감정 분포
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
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom 
              sx={{
                fontWeight: "bold",
              }}>
              {userNames[0]}
              </Typography>
            <Chart
              options={optionsPie1}
              series={seriesPie1}
              type="pie"
              height="380px"
            />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" , fontSize:"20px" , color:"1B1B1B"}}>
              호감도: {(affinityScores[userNames[0]] * 100).toFixed(2)}%
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                sm: "48%",
                xs: "100%",
              },
              mb: 3,
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom
            sx={{
              fontWeight: "bold",
            }}>
              {userNames[1]}
              </Typography>
            <Chart
              options={optionsPie2}
              series={seriesPie2}
              type="pie"
              height="380px"
            />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" , fontSize:"20px" , color:"1B1B1B"}}>
              호감도: {(affinityScores[userNames[1]] * 100).toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Ratio;
