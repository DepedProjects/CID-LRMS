import React from "react";
import Navbar from "../../components/Navbar";
// import homeBackground from "../../assets/images/Background-home.png";
import { Box } from "@mui/material";

export default function Portal() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "black",
      }}
    >
      <Navbar />
    </Box>
  );
}
