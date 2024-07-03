import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Header from "../../../components/LoginHeader";
import loginImage from "../../../assets/images/LoginImage.png";
import Footer from "../../../components/Footer";

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden", // Prevent vertical scrolling
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "flex-start",
          gap: { xs: 2, sm: 3, md: 4, lg: 12 },
          paddingTop: { xs: 10, sm: 8, md: 10, lg: 27, xl: 12 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 25.5, xl: 12 },
          px: { xs: 3, sm: 3, md: 4, lg: 5, xl: 5 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { lg: -1, xl: 1 },
            ml: { lg: 7, xl: 6 },
            mb: { lg: 2, xl: 16 },
            maxHeight: { xs: "40vh", md: "50vh", lg: "30vh", xl: "70vh" }, // Adjust as needed for different resolutions
            maxWidth: { xs: "80vw", md: "70vw", lg: "30vw", xl: "40vw" }, // Adjust width as needed for different resolutions
          }}
        >
          <img
            src={loginImage}
            alt="Login"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%", // Ensure image doesn't exceed its container's height
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: { xs: 2, sm: 3, md: 4, lg: 1, xl: 5 },
            boxSizing: "border-box",
            mt: { lg: -3, xl: 20 },
            ml: { lg: 20, xl: 20 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontWeight: "bold",
              fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "1.5rem",
                xl: "3rem",
              },
              mb: { xs: 2, sm: 3 },
            }}
          >
            SIGN IN
          </Typography>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            fullWidth
            sx={{
              width: "100%",
              maxWidth: { lg: 400, xl: 600 },
              mt: 1,
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={{
              width: "100%",
              maxWidth: { lg: 400, xl: 600 },
              mt: 3,
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              "& .MuiInputLabel-root": {
                fontFamily: "Arial, sans-serif",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: { lg: 400, xl: 600 },
              mt: 5,
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem" },
            }}
          >
            LOG IN
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
