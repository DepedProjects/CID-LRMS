import React from "react";
import homeBackground from "../../assets/images/Background-home.png";
import homeImage from "../../assets/images/pngegg.png";
import awardings from "../../assets/images/awards.jpeg.jpg";
import { GrAchievement } from "react-icons/gr";
import { Box } from "@mui/material";

export default function Landing() {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={homeBackground} alt="" />
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
          <img src={awardings} alt="" style={{ width: "2300px" }} />
        </Box>
        <Box sx={{ marginTop: 40, ml: -45, width: "700px", color: "white" }}>
          <h4>
            Photo was taken during the Exhibit of Learning Resources (LRs) last
            Novermber 25, 2022. All recognition were awarded during the
            CALABARZON Learning Resources Expo at Tagaytay Century Hotel,
            Tagaytay City.
          </h4>
        </Box>
      </Box>
    </div>
  );
}
