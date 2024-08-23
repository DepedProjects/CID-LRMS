import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import firstImage from "../../assets/images/pngegg.png";

export default function Landing() {
  const openFeedbackPage = () => {
    window.open("http://172.16.0.21/feedback", "_blank");
  };

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
          background: "#1f211f",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4, lg: 20 },
            px: { lg: 5, xl: 15 },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontFamily: "Fira Sans Condensed",
                color: "white",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "1rem",
                  xl: "2rem",
                },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              DepEd Schools Division of Imus City Learning Resources Navigator
            </Typography>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontFamily: "Barlow Semi Condensed",
                color: "white",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "5rem",
                  xl: "8rem",
                },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              ILeaRN
            </Typography>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontFamily: "Barlow Semi Condensed",
                color: "white",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "1rem",
                  xl: "3rem",
                },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              THE SUCCESS OF LEARNING STARTS WITH YOU!
            </Typography>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontFamily: "Barlow Semi Condensed",
                color: "white",
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "1rem",
                  xl: "1rem",
                },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Schools Division Office of Imus City Learning Resource Management
              System (LRMS) Portal named I LeaRN (Imus Learning Resources
              Navigator) supports effective implementation of the Learning
              Resource Management and Development System (LRMDS) to improve
              access to learning, teaching, and professional development
              resources by schools. It is a web-based repository of available
              learning materials in electronic copies, developed and quality
              assured in the National level, Regional level, and Division level.
            </Typography>
          </Box>
          <Box
            component="img"
            src={firstImage}
            alt="Citizen's Charter"
            sx={{
              width: {
                xs: "100%", // Full width on mobile
                sm: "80%", // Slightly smaller on small screens
                md: "60%", // Smaller on medium screens
                lg: "50%", // Smaller on large screens
                xl: "100%", // Smaller on extra-large screens
              },
              maxWidth: { xs: "300px", md: "500px", xl: "1000px" }, // Set maximum width
              height: "auto", // Maintain aspect ratio
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 3 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 6, xl: 8 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 6, xl: 8 },
          color: "black",
          borderBottom: "8px solid black", // Add a thick bottom border
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: 32, xl: 36 },
            fontWeight: "bold",
            fontFamily: "Barlow Semi Condensed",
          }}
        >
          FEEDBACK IS A GIFT!
        </Typography>
        <Button
          variant="contained"
          onClick={openFeedbackPage}
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
        >
          CLICK HERE TO PROVIDE SUGGESTIONS. YOUR GENEROSITY IS APPRECIATED!
        </Button>
      </Box>

      <Footer />
    </Box>
  );
}
