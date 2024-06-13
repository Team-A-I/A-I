import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import chartAvarage from "../images/chart_avarage.png"; // 이미지 파일 임포트

const Average = () => {
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default Average;
