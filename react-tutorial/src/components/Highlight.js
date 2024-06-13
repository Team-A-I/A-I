import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const options = ["Action", "Another Action", "Something else here"];

const summaries = [
  "찬영이가 아이비 유혹의 소나타를 들어본 적이 없어 거짓말하지 말라고 했다.",
  "2차 데이터 경진대회에서 나영이가 우승을 했다.",
  "너 데엔 끝까지 해봐 응 나한테 오더주면 해줄게 관심생길때 해봐 하고",
  "나는 데엔 관점에서 설계를 하고 나를 잔업에 쓰면 어떨까라는 생각을 했다.",
  "데이콘은 수업도 하고 플젝도 하고 있어 플젝 하다 보니 UI 만드는 게"
];

const colors = ["success.main", "secondary.main", "primary.main", "warning.main", "error.main"];

const activities = [];

summaries.forEach((summary, index) => {
  activities.push({
    time: `Talk${index + 1}`,
    color: colors[index],
    text: summary,
  });
});

// console.log(activities);


// 여기 데이터 교체해보기 -- 대화를 5등분 한 뒤, 요약 모델 돌려서 대화 5번의 텀 요약해주기

const Highlight = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        pb: 0,
      }}
    >
      <CardContent
        sx={{
          pb: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mb: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "h3.fontSize",
                marginBottom: "0",
              }}
              gutterBottom
            >
              Highlight Activities
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              sx={{
                fontWeight: "400",
                fontSize: "13px",
              }}
            >
              Overview of Conversation
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            {/* <IconButton
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton> */}
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        <Timeline
          sx={{
            p: 0,
          }}
        >
          {activities.map((activity) => (
            <TimelineItem key={activity.time}>
              <TimelineOppositeContent
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  flex: "0",
                }}
              >
                {activity.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: activity.color,
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                {activity.text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default Highlight;
