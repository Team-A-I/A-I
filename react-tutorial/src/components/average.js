import React from "react";
import { Card, CardContent, Typography, Box, Grid} from "@mui/material";
import Chart from "react-apexcharts";
import greenlight from "../images/greenlight.jpg"; 


const Average = ({ averageDailyMessageCounts }) => {

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
        horizontal: false
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
        text: ''
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
    colors: "#38b000" // 원하는 색상으로 설정 "#38b000"
  };

  return (
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
