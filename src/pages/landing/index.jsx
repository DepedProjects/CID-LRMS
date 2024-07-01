import React from "react";
import { Box, Button, Typography } from "@mui/material";
import darkBackground from "../../assets/images/firstBackground.jpg";
import awardings from "../../assets/images/Frame 7.png";
import activities from "../../assets/images/Frame 10.png";
import image1 from "../../assets/images/pngegg.png";
import Footer from "../../components/Footer";

export default function Landing() {
  return (
    <Box>
      <Box
        sx={{
          height: "auto",
          width: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          backgroundImage: `url(${darkBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box sx={{ color: "white", margin: { xs: 2, md: 10 }, width: { xs: "100%", md: "50%" } }}>
          <Box>
            <Typography
              sx={{
                mt: { xs: 4, md: 24 },
                ml: { xs: 0, md: 8 },
                fontSize: { xs: 16, md: 18 },
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <h3>
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  D
                </span>
                epEd{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  S
                </span>
                chools{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  D
                </span>
                ivision of{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  I
                </span>
                mus{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  C
                </span>
                ity{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  L
                </span>
                earning{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  R
                </span>
                esources{" "}
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 200px cyan, 0 0 5px cyan" }}>
                  N
                </span>
                avigator
              </h3>
            </Typography>
          </Box>
          <Box>
            <Typography
              component="div"
              sx={{
                ml: { xs: 0, md: 8 },
                mt: -3,
                fontSize: { xs: 40, md: 56 },
                fontFamily: "Permanent Marker",
              }}
            >
              <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>I</span>
              Lea
              <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>RN</span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                mt: -3,
                ml: { xs: 0, md: 8 },
                fontSize: { xs: 20, md: 24 },
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <h2>THE SUCCESS OF LEARNING STARTS WITH YOU!</h2>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                mt: -3,
                ml: { xs: 0, md: 8 },
                fontSize: { xs: 16, md: 18 },
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <h3>
                Get started with effective implementation of innovative Learning Resources.
              </h3>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                width: { xs: "90%", md: "600px" },
                mt: -1,
                ml: { xs: "5%", md: 8 },
                fontSize: { xs: 16, md: 18 },
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <p>
                <span style={{ color: "cyan", textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan" }}>
                  S
                </span>
                chools Division Office of Imus City Learning Resource Management System (LRMS) Portal named I LeaRN
                (Imus Learning Resources Navigator) supports effective implementation of the Learning Resource
                Management and Development System (LRMDS) to improve access to learning, teaching, and professional
                development resources by schools. It is a web-based repository of available learning materials in
                electronic copies, developed and quality assured in the National level, Regional level, and Division
                level.
              </p>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: { xs: 4, md: 20 },
            ml: { xs: 0, md: 5 },
            justifyContent: { xs: "center", md: "flex-start" },
            width: { xs: "100%", md: "50%" },
          }}
        >
          <img
            src={image1}
            alt=""
            style={{
              width: "80%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${darkBackground})`,
          }}
        >
          <Typography
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingTop: 10,
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Fira Sans Condensed",
            }}
          >
            OUR
            <p style={{ color: "black" }}>1</p>
            <span
              style={{
                color: "cyan",
                textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 10px cyan",
              }}
            >
              ACHIEVEMENTS
            </span>
            <p style={{ color: "black" }}>1</p>
            ATTAINED THROUGH OUR COMBINED EFFORT
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              color: "white",
            }}
          >
            <Box sx={{ mt: { xs: 0, md: -6 }, ml: { xs: 0, md: 20 } }}>
              <img src={awardings} alt="" style={{ width: "85%" }} />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "15%" },
                display: "flex",
                color: "white",
                mt: { xs: 2, md: 20 },
                ml: { xs: 0, md: 25 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                sx={{
                  ml: { xs: 0, md: -35 },
                  fontFamily: "Fira Sans Condensed",
                  fontSize: 18,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum,
                nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
                congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis
                sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue.
                Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet
                sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${darkBackground})`,
          }}
        >
          <Typography
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingTop: 10,
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Fira Sans Condensed",
            }}
          >
            THE
            <p style={{ color: "black" }}>1</p>
            <span
              style={{
                color: "cyan",
                textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 10px cyan",
              }}
            >
              DIVISION INITIATIVES
            </span>
            <p style={{ color: "black" }}>1</p>
            AIMED FOR THE COMMON GOOD
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              color: "white",
            }}
          >
            <Box sx={{ mt: { xs: 0, md: -6 }, ml: { xs: 0, md: 20 } }}>
              <img src={activities} alt="" style={{ width: "85%" }} />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "15%" },
                display: "flex",
                color: "white",
                mt: { xs: 2, md: 20 },
                ml: { xs: 0, md: 25 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                sx={{
                  ml: { xs: 0, md: -35 },
                  fontFamily: "Fira Sans Condensed",
                  fontSize: 18,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum,
                nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
                congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis
                sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue.
                Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet
                sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
