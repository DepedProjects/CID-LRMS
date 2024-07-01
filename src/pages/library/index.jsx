import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Box, Typography } from "@mui/material";

export default function Library() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingTop: 10,
          background: "#1f211f",
        }}
      >
        {/* Example content */}
        <Box>
          <Typography variant="h5" color="primary">
            Main Content Area
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <Footer />
    </Box>
  );
}
