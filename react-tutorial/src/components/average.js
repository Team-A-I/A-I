import React from "react";
import { Card, CardContent, Typography, Box, Grid} from "@mui/material";
import Chart from "react-apexcharts";
import greenlight from "../images/greenlight.jpg"; 


// averageDailyMessageCounts가 없거나 비어 있으면 아무것도 렌더링하지 않음
const Average = ({ averageDailyMessageCounts }) => {

  if (!averageDailyMessageCounts || Object.keys(averageDailyMessageCounts).length === 0) {
    return null; // averageDailyMessageCounts가 없으면 아무것도 렌더링하지 않음
  }

  // averageDailyMessageCounts 객체의 키(사용자 이름)를 가져와서 userNames 배열에 저장합니다.
  const userNames = Object.keys(averageDailyMessageCounts);


  // 각 사용자의 평균 메시지 개수를 소수점 없는 정수로 변환하여 배열로 저장 + 소수점 없는 정수로 변환
  const series = [{
    name: "하루평균 메시지 개수",
    data: userNames.map(name => Math.round(averageDailyMessageCounts[name])) 
  }];

  const options = {
    chart: {
      type: 'bar',   // 차트 타입을 'bar'로 설정
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false  // 수평 막대 차트를 사용하지 않음
      }
    },
    dataLabels: { 
      enabled: true,  // 데이터 라벨 활성화
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
      categories: userNames,  // x축 카테고리로 사용자 이름을 설정
      title: {
        text: ''
      }
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    legend: {
      position: 'bottom'   // 범례를 하단에 배치
    },
    colors: "#38b000"  // 막대 색상을 설정
  };

  return (
    // 외곽선이 있는 MUI Card 컴포넌트
    <Card variant="outlined"
    sx={{
        pb: 0,
        height: '450px'
      }}>
      <CardContent>
        {/* <Typography
          variant="h3"
          sx={{ marginBottom: "0" }}
          gutterBottom
          style={{ fontWeight: 'bold', fontSize: '30px' }}
        >
          TURN ON THE GREEN LIGHT!
        </Typography> */}
        <Typography
          sx={{
          fontWeight: "bold",
          fontSize: "h5.fontSize",
          marginBottom: "0",
          }}
          gutterBottom
        >
          {userNames[0]}님과 {userNames[1]}님의 하루 평균 카톡 개수
        </Typography>
        <Grid container spacing={1} sx={{ mt: 7 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Chart
                options={options}
                series={series}
                type="bar"
                height="250px" 
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "h5.fontSize",
          marginTop: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        gutterBottom
      >
        40개 이상은 받으셨나요?
        <img src={greenlight} alt="greenlight" style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
      </Typography>
    </Card>
  );
};

export default Average;
