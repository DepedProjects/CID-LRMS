import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import footerBackground from "../../assets/images/achievements.jpg";
import kagawaran from "../../assets/images/kagawaran.png";
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
            <Typography sx={{ fontWeight: "bold" }}>ABOUT THIS PAGE</Typography>
            <Typography sx={{ width: "300px", mt: 4, fontSize: 12 }}>
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
            <Typography sx={{ fontWeight: "bold" }}>DEPED LINKS</Typography>

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
            <Box sx={{ fontSize: "12px" }}>Citizens Charter</Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", width: "200px" }}>
              CONTACT US
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                fontStyle: "none",
                fontSize: "12px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <EmailIcon sx={{ mr: 2 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, mr: 4.5 }}>
                  lrms.imus@deped.gov.ph
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                fontStyle: "none",
                fontSize: "12px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <CallIcon sx={{ mr: 2.5 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, mr: 4.8 }}>
                  (046) 419 8450 loc. 217
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                fontStyle: "none",
                fontSize: "12px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <LocationOnIcon sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ mr: 1 }}>
                <Typography sx={{ fontSize: 12 }}>
                  General Satorre St., Imus City 4103 Cavite
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "300px" }}>
            <Typography sx={{ fontWeight: "bold" }}>FOLLOW US</Typography>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                fontStyle: "none",
                fontSize: "12px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <FacebookIcon sx={{ mr: 1 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, mr: 1 }}>
                  <a
                    href="https://www.facebook.com/sdoimuscity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sdoimuscity
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: 7,
            ml: -12,
            backgroundImage: `url(${footerBackground})`,
            width: "120%",
            height: "200px",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Box sx={{ width: "10%", mt: 3.5 }}>
            <img src={kagawaran} alt="" />
          </Box>
          <Box sx={{ width: "10%", mt: 3.5 }}>
            <img src={kagawaran} alt="" />
          </Box>
          <Box sx={{ width: "10%", mt: 3.5 }}>
            <img src={kagawaran} alt="" />
          </Box>
          <Box sx={{ width: "200px" }}>
            <Typography sx={{ fontSize: "13px" }}>
              REPUBLIC OF THE PHILIPPINES Department of Education Region IV-A
              CALABARZON Schools Division Office of Imus City
            </Typography>
          </Box>
          <Box sx={{ width: "200px" }}>
            <Typography sx={{ fontSize: "13px", color:"white" }}>
              © 2022 All Rights Reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
