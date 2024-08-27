import React from "react";
import Footer from "../../components/Footer";
import accessBackground from "../../assets/images/AccessToLRMDSPortal.png";
import borrowMaterials from "../../assets/images/BorrowingOfBooks.png";
import workflow from "../../assets/images/ProgramWorkflow.png";
import qualityAssurance from "../../assets/images/QualityAssurance.png";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import DepedLogo from "../../assets/images/deped_logo.png";

export default function CitizenCharterinNav() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

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
        <Box sx={{ display: "flex", mt: { lg: -10, xl: -10 }, gap: 3 }}>
          <img
            src={DepedLogo}
            alt="DepedLogo"
            style={{ width: "auto", height: "100px", cursor: "pointer" }}
            onClick={handleHome}
          />
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
                lg: "3rem",
                xl: "4.5rem",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            CITIZEN'S CHARTER
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          background: "white",
          width: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 18, sm: 28, md: 32, lg: 36, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
          }}
        >
          EXTERNAL SERVICES
        </Typography>
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 4, xl: 6 },
          background: "#1f211f",
          width: "auto",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 28, md: 32, lg: 24, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
            color: "white",
          }}
        >
          1. Access to LRMDS Portal
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%", // Ensure the Box takes full width of its container
          overflow: "hidden", // Prevent overflow
        }}
      >
        <img
          src={accessBackground}
          alt=" "
          style={{
            width: "100%", // Ensure the image takes full width of its container
            height: "auto", // Maintain aspect ratio
            display: "block", // Prevents extra space below the image
          }}
        />
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 4, xl: 6 },
          background: "#1f211f",
          width: "auto",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 28, md: 32, lg: 24, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
            color: "white",
          }}
        >
          2. Borrowing of Learning Materials from Libraries
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%", // Ensure the Box takes full width of its container
          overflow: "hidden", // Prevent overflow
        }}
      >
        <img
          src={borrowMaterials}
          alt=" "
          style={{
            width: "100%", // Ensure the image takes full width of its container
            height: "auto", // Maintain aspect ratio
            display: "block", // Prevents extra space below the image
          }}
        />
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          background: "white",
          width: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 18, sm: 28, md: 32, lg: 36, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
          }}
        >
          INTERNAL SERVICES
        </Typography>
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 4, xl: 6 },
          background: "#1f211f",
          width: "auto",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 28, md: 32, lg: 24, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
            color: "white",
          }}
        >
          1. Program Work Flow of Submission of Contextualized Learning
          Resources
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={workflow}
          alt=" "
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 4, xl: 6 },
          background: "#1f211f",
          width: "auto",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 28, md: 32, lg: 24, xl: 40 },
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
            color: "white",
          }}
        >
          2. Quality Assurance of Supplementary Learning Resources
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={qualityAssurance}
          alt=" "
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" }, // Stack items on small screens
          padding: { xs: 2, sm: 4, md: 6, lg: 6 },
          gap: { xs: 2, sm: 3, md: 4, lg: 3 },
          background: "#1f211f",
          overflow: "hidden", // Prevent overflow
          width: "auto", // Ensure full width
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: 20, sm: 24, md: 28, lg: 36 },
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
            color: "white",
            textAlign: "center", // Center text for small screens
          }}
        >
          We would like to hear from you.
        </Typography>
        <Button
          variant="contained"
          onClick={openFeedbackPage}
          sx={{
            px: { xs: 4, sm: 6, md: 8, lg: 9 },
            fontSize: { xs: 16, sm: 20, md: 25, lg: 31 },
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
            mt: { xs: 1, md: 0 }, // Add margin top for small screens
            "&:hover": {
              backgroundColor: "cyan",
              cursor: "pointer",
              color: "black",
            },
          }}
        >
          Feedback
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}
