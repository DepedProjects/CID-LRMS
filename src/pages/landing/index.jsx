import React from "react";
import Navbar from "../../components/Navbar";
import homeBackground from "../../assets/images/home-banner-background.png";

export default function Landing() {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={homeBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          </h1>
        </div>
      </div>
    </div>
  );
}
