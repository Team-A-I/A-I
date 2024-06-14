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

const Highlight = (summary_answer) => {
  console.log("summary_answer", summary_answer)
  const data = summary_answer;
  const options = ["Action", "Another Action", "Something else here"];
  const colors = ["success.main", "secondary.main", "primary.main", "warning.main", "error.main"];

  const activities = [];

  data.data.forEach((summary, index) => {
    activities.push({
      time: `Talk${index + 1}`,
      color: colors[index],
      text: summary,
    });
  });

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
                fontWeight: "bold",
                fontSize: "h3.fontSize",
                marginBottom: "0",
              }}
              gutterBottom
            >
              대화 요약
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              sx={{
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Kakao talk 타임라인
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
