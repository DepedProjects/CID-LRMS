import React, { useState } from "react";
import dayjs from 'dayjs';
import homeBackground from "../../assets/images/Background-home.png";
import homeBackground2 from "../../assets/images/about-background.png";
import homeBackground3 from "../../assets/images/Background-home2.png";
import homeBackground4 from "../../assets/images/Frame 6.png";
import homeImage from "../../assets/images/pngegg.png";
import awardings from "../../assets/images/awards2.jpg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import { GrAchievement } from "react-icons/gr";
import { TextField, Box, Divider, Typography } from "@mui/material";

export default function Landing() {
  const [value, setValue] = useState(dayjs(new Date()));
  const [highlightedDays] = useState([1, 2, 13]);

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={homeBackground} alt="" />
        </div>
        <div className="home-bannerImage-container2">
          <img src={homeBackground2} alt="" />
        </div>
        <div className="home-text-section">
          <h5 style={{ fontFamily: "Fira Sans Condensed", fontSize: "15px" }}>
            DepEd Schools Division of Imus City Learning Resources Navigator
          </h5>
          <h1
            className="primary-heading"
            style={{
              fontFamily: "Caveat Brush",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            ILeaRN
          </h1>
          <h2 style={{ fontFamily: "Permanent Marker", marginBottom: 10 }}>
            THE SUCCESS OF LEARNING STARTS WITH YOU!
          </h2>
          <h3 style={{ maxWidth: "600px", marginBottom: 10 }}>
            Get started with effective implementation of innovative Learning
            Resources.
          </h3>
          <p className="primary-text">
            Schools Division Office of Imus City Learning Resource Management
            System (LRMS) Portal named I LeaRN (Imus Learning Resources
            Navigator) supports effective implementation of the Learning
            Resource Management and Development System (LRMDS) to improve access
            to learning, teaching, and professional development resources by
            schools. It is a web-based repository of available learning
            materials in electronic copies, developed and quality assured in the
            National level, Regional level, and Division level.
          </p>
        </div>
        <div className="home-image-container">
          <img src={homeImage} alt="" style={{ maxWidth: "500px" }} />
        </div>
      </div>
      <div className="home-bannerImage-container3">
        <img src={homeBackground3} alt="" />
      </div>

      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Box
          sx={{
            padding: 2,
            background: "black",
            display: "flex",
            alignItems: "Center",
          }}
        >
          <GrAchievement
            style={{
              fontSize: 60,
              color: "white",
              marginBottom: 5,
              marginRight: 10,
            }}
          />
          <h3
            style={{
              marginLeft: "10px",
              color: "white",
              fontFamily: "Fira Sans Condensed",

              alignItems: "center",
              fontSize: "24px",
            }}
          >
            OUR ACHIEVEMENTS ATTAINED THROUGH OUR COMBINED EFFORT
          </h3>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 5 }}>
          <img src={awardings} alt="" style={{ width: "2050px" }} />
        </Box>
        <Box sx={{ marginTop: 40, ml: -50, width: "700px", color: "white" }}>
          <p>
            Photo was taken during the Exhibit of Learning Resources (LRs) last
            November 25, 2022. All recognition were awarded during the
            CALABARZON Learning Resources Expo at Tagaytay Century Hotel,
            Tagaytay City.
          </p>
        </Box>
      </Box>
      <Divider sx={{ marginTop: 10, fontWeight: "bold" }}>
        <Typography
          sx={{
            width: "300px",
            color: "White",
            fontSize: "24px",
            padding: 2,
            background: "Black",
            borderRadius: "5px",
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
          }}
        >
          SDOIC LRMS Activities
        </Typography>
      </Divider>
      <Box>
        <img src={homeBackground4} alt="" style={{ marginTop: 20 }} />
        <Box sx={{ display: "flex", mt: 10 }}>
          <Box></Box>
          <Box sx={{ marginLeft: 5, marginTop: -77 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="portrait"
                value={value}
                disableFuture
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                  const isSelected =
                    !DayComponentProps.outsideCurrentMonth &&
                    highlightedDays.indexOf(day.date()) >= 0;

                  return (
                    <Badge
                      key={day.toString()}
                      overlap="circular"
                      badgeContent={
                        isSelected ? <CheckIcon color="red" /> : undefined
                      }
                    >
                      <PickersDay {...DayComponentProps} />
                    </Badge>
                  );
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
