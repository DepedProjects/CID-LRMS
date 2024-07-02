import { Box, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import depedlogo from "../../assets/images/kagawaran.png";
import regionlogo from "../../assets/images/region_logo.png";
import divisionlogo from "../../assets/images/deped_logo.png";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Fira Sans Condensed",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          px: 5,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 2,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            About this Page
          </Typography>
          <Typography sx={{ fontSize: 12, fontFamily: "Fira Sans Condensed" }}>
            Schools Division Office of Imus City Learning Resource Management
            System (LRMS) Portal named I LeaRN (Imus Learning Resources
            Navigator) supports effective implementation of the Learning
            Resource Management and Development System (LRMDS) to improve access
            to learning, teaching, and professional development resources by
            schools. It is a web-based repository of available learning
            materials in electronic copies, developed and quality assured in the
            National level, Regional level, and Division level.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            ml: { xs: 0, md: 3 }, // Added margin-left for medium and larger screens
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 2,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            DepEd Links
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              my: 1,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            Offices
          </Typography>
          <a href="https://www.deped.gov.ph/" style={{ fontSize: 12 }}>
            Central Office
          </a>
          <a href="https://depedcalabarzon.ph/" style={{ fontSize: 12 }}>
            4A CALABARZON
          </a>
          <a href="https://depedimuscity.com/" style={{ fontSize: 12 }}>
            Imus City
          </a>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              my: 1,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            Resources
          </Typography>
          <a href="https://lrmds.deped.gov.ph/" style={{ fontSize: 12 }}>
            LRMDS Portal
          </a>
          <a href="https://lms.deped.gov.ph/" style={{ fontSize: 12 }}>
            LMS Portal
          </a>
          <a
            href="https://www.youtube.com/c/depedetulay"
            style={{ fontSize: 12 }}
          >
            ETUlay
          </a>
          <a
            href="https://training.deped.gov.ph/course/index.php?categoryid=49"
            style={{ fontSize: 12 }}
          >
            Commons
          </a>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              my: 1,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            Citizen's Charter
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 2,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", fontSize: 14, gap: 1 }}
          >
            <EmailIcon />
            lrms.imus@deped.gov.ph
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", fontSize: 14, gap: 1 }}
          >
            <AddIcCallIcon />
            (046) 419 8450 loc. 217
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", fontSize: 14, gap: 1 }}
          >
            <LocationOnIcon />
            General Satorre St., Imus City 4103 Cavite
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 2,
              fontFamily: "Fira Sans Condensed",
            }}
          >
            About this Page
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", fontSize: 14, gap: 1 }}
          >
            <FacebookRoundedIcon />
            https://www.facebook.com/sdoimuscity
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          padding: 5,
          background: "#1f211f",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          mx: 0,
          boxSizing: "border-box",
        }}
      >
        <img
          src={depedlogo}
          alt="DepEd Logo"
          style={{ width: "100px", height: "auto" }}
        />
        <img
          src={regionlogo}
          alt="Region Logo"
          style={{ width: "100px", height: "auto" }}
        />
        <img
          src={divisionlogo}
          alt="Division Logo"
          style={{ width: "100px", height: "auto" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 21,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "semi-bold",
              fontFamily: "Fira Sans Condensed",
              color: "white",
            }}
          >
            REPUBLIC OF THE PHILIPPINES
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "semi-bold",
              fontFamily: "Fira Sans Condensed",
              color: "white",
            }}
          >
            Department of Education
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "semi-bold",
              fontFamily: "Fira Sans Condensed",
              color: "white",
            }}
          >
            Region IV-A CALABARZON
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "semi-bold",
              fontFamily: "Fira Sans Condensed",
              color: "white",
            }}
          >
            Schools Division Office of Imus City
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "semi-bold",
              fontFamily: "Fira Sans Condensed",
              color: "white",
            }}
          >
            © 2022 All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
