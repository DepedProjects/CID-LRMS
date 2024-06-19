import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div>
      <Box
        sx={{
          mt: 5,
          flexDirection: "column",
          fontSize: 18,
          fontFamily: "Fira Sans Condensed",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // border: "1px solid black",
            justifyContent: "space-between",
            gap: 10,
            fontFamily: "Fira Sans Condensed",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>
            ABOUT THIS PAGE
            <Typography sx={{ width: "300px", mt: 5, fontSize: 12 }}>
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
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            DEPED LINKS
            <Box sx={{ fontSize: "12px" }}>
              Offices
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "Fira Sans Condensed",
                }}
              >
                <a
                  href="https://depedcalabarzon.ph/."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://depedcalabarzon.ph/.
                </a>
              </Typography>
            </Box>
            <Box sx={{ fontSize: "12px" }}>
              Resources
              <Typography
                sx={{ fontSize: "12px", fontFamily: "Fira Sans Condensed" }}
              >
                <a
                  href="https://lrmds.deped.gov.ph/."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://lrmds.deped.gov.ph/.
                </a>
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontFamily: "Fira Sans Condensed" }}
              >
                <a
                  href="https://lms.deped.gov.ph/."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://lms.deped.gov.ph/.
                </a>
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontFamily: "Fira Sans Condensed" }}
              >
                <a
                  href="https://lms.deped.gov.ph/."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://lms.deped.gov.ph/.
                </a>
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontFamily: "Fira Sans Condensed" }}
              >
                <a
                  href="https://training.deped.gov.ph/course/index.php?categoryid=49."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://training.deped.gov.ph/course/index.php?categoryid=49.
                </a>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ fontWeight: "bold" }}>CONTACT US</Box>
          <Box sx={{ fontWeight: "bold" }}>FOLLOW US</Box>
        </Box>
        <Box></Box>
      </Box>
    </div>
  );
}
