import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import aboutUs1 from "../../assets/images/aboutus1.jpg";
import sirHomer from "../../assets/images/Sir Homer2.jpg";
import msGlenda from "../../assets/images/Ms. Glenda.jpg";
import msLuna from "../../assets/images/MaamLuna.jpg";
import cidlrmds from "../../assets/images/CID-LRMS.jpg";
import { Box, Typography } from "@mui/material";

export default function AboutUs() {
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 15, xl: 15 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 5, xl: 4 },
          backgroundImage: `url(${aboutUs1})`,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontFamily: "Fira Sans Condensed",
              color: "white",
              fontWeight: "semi-bold",
              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "1rem",
                xl: "1.5rem",
              },
              textAlign: "center",
            }}
          >
            The DepEd SDO Imus City
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontFamily: "Fira Sans Condensed",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "2.5rem",
                  xl: "2rem",
                },
                textAlign: "center",
              }}
            >
              LEARNING RESOURCES
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "Fira Sans Condensed",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "1.5rem",
                  xl: "1rem",
                },
                textAlign: "center",
              }}
            >
              Management Team
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 1 },
          // width: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${sirHomer})`,
        }}
      >
        <img src={sirHomer} alt="sirHomer" style={{ width: "100%" }} />
      </Box>
      <Box
        sx={{
          // px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 1 },
          // width: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${msLuna})`,
        }}
      >
        <img src={msLuna} alt="msLuna" style={{ width: "100%" }} />
      </Box>
      <Box
        sx={{
          // px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 1 },
          // width: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${msGlenda})`,
        }}
      >
        <img src={msGlenda} alt="msGlenda" style={{ width: "100%" }} />
      </Box>
      <Box
        sx={{
          // px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 1 },
          // width: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${cidlrmds})`,
        }}
      >
        <img src={cidlrmds} alt="cidlrmds" style={{ width: "100%" }} />
      </Box>
      <Footer />
    </Box>
  );
}
