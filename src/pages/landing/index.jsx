import React from "react";
// import dayjs from "dayjs";
import Footer from "../../components/Footer";
import homeBackground from "../../assets/images/Background-home.png";
import homeBackground2 from "../../assets/images/about-background.png";
import homeBackground3 from "../../assets/images/vector-SEP-2020-39_generated.jpg";
import homeBackground4 from "../../assets/images/achievements.jpg";
import homeImage from "../../assets/images/pngegg.png";
import awardings from "../../assets/images/Frame 7.png";
import activities from "../../assets/images/Frame 10.png";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Badge from "@mui/material/Badge";
// import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import CheckIcon from "@mui/icons-material/Check";
import { GrAchievement } from "react-icons/gr";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function Landing() {
  // const [value, setValue] = useState(dayjs(new Date()));
  // const [highlightedDays] = useState([1, 2, 13]);

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={homeBackground} alt="" />
        </div>
        <div className="home-bannerImage-container2">
          <img src={homeBackground2} alt="" />
        </div>
        <div className="home-bannerImage-container3">
          <img src={homeBackground4} alt="" style={{ width: "1700px" }} />
        </div>
        <div className="home-bannerImage-container4">
          <img
            src={homeBackground3}
            alt=""
            style={{ marginTop: -80, width: "1700px" }}
          />
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

      <Box
        sx={{
          mt: 10,
          ml: -12,
          width: "120%",
          padding: 2,
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 1 }}>
          <img src={awardings} alt="" style={{ width: "700px" }} />
        </Box>
        <Box sx={{ marginTop: 40, ml: 5, width: "300px", color: "white" }}>
          <p>
            Photo was taken during the Exhibit of Learning Resources (LRs) last
            November 25, 2022. All recognition were awarded during the
            CALABARZON Learning Resources Expo at Tagaytay Century Hotel,
            Tagaytay City.
          </p>
        </Box>
      </Box>
      <Divider
        sx={{
          marginTop: 1,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            width: "1500px",
            color: "black",
            fontSize: 36,
            padding: 2,
            background: "white",
            backgroundColor: "white",
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
          }}
        >
          SDOIC LRMS ACTIVITIES 2024
        </Typography>
      </Divider>
      <Box>
        <Box sx={{ display: "flex", mt: 10, gap: 10 }}>
          <Box sx={{ width: "60%" }}>
            <img src={activities} alt="" />
          </Box>
          <Box sx={{ width: "400px", color: "white" }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vehicula ultricies sapien, vel commodo nunc convallis sit amet.
              Proin ac varius justo, eget bibendum eros. Curabitur fringilla
              ligula sed interdum convallis. Nullam sit amet ligula ac orci
              accumsan tempor. Aliquam non sapien quis nunc sodales pretium. Sed
              at ornare urna. In ac velit malesuada, tincidunt ligula ut, cursus
              dolor.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 10,
          ml: -13,
          py: 4,
          width: "1400px",
          backgroundImage: `url(${homeBackground4})`,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 36,
            mb: 2,
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
          }}
        >
          FEEDBACK IS A GIFT
        </Typography>
        <a
          href="http://172.16.0.21/feedback"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="contained"
            error={false}
            sx={{
              color: "white",
              // background: "blue",
              "&:hover": {
                background: "black",
                border: "white",
                fontWeight: "bold",
              },
            }}
          >
            CLICK HERE TO PROVIDE SUGGESTIONS. YOUR GENEROSITY IS APPRECIATED
          </Button>
        </a>
      </Box>
      <Box>
        <Footer />
      </Box>
    </div>
  );
}
