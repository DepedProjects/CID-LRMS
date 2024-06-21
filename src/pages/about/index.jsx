import React from "react";
import homeBackground from "../../assets/images/Background-home.png";
import { Box } from "@mui/material";

export default function AboutUs() {
  return (
    <Box>
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={homeBackground} alt="" />
          </div>
        </div>
      </div>
    </Box>
  );
}
