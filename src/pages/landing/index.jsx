import React from "react";
import { Box, Button, Typography } from "@mui/material";
import darkBackground from "../../assets/images/firstBackground.jpg";
import awardings from "../../assets/images/Frame 7.png";
import activities from "../../assets/images/Frame 10.png";
import image1 from "../../assets/images/pngegg.png";
import feedackbg from "../../assets/images/Frame 8.jpg";
import Footer from "../../components/Footer";

export default function Landing() {
  return (
    <Box>
      <Box
        sx={{
          height: "auto", // Full viewport height
          width: "auto", // Full viewport width
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${darkBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ color: "white", marginLeft: 10 }}>
          <Box>
            <Typography
              sx={{
                mt: 24,
                ml: 8,
                fontSize: 18,
                fontFamily: "Fira Sans Condensed",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  D
                </span>
                epEd{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  S
                </span>
                chools{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  D
                </span>
                ivision of{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  I
                </span>
                mus{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  C
                </span>
                ity{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  L
                </span>
                earning{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  R
                </span>
                esources{" "}
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 200px cyan, 0 0 5px cyan",
                  }}
                >
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
                ml: 8,
                mt: -3,
                fontSize: 56,
                fontFamily: "Permanent Marker",
              }}
            >
              <span
                style={{
                  color: "cyan",
                  textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                }}
              >
                I
              </span>
              Lea
              <span
                style={{
                  color: "cyan",
                  textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                }}
              >
                RN
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                mt: -3,
                ml: 8,
                fontSize: 24,
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
                ml: 8,
                fontSize: 18,
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <h3>
                Get started with effective implementation of innovative Learning
                Resources.
              </h3>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                width: "600px",
                mt: -1,
                ml: 8,
                fontSize: 18,
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <p>
                <span
                  style={{
                    color: "cyan",
                    textShadow: "0 0 5px cyan, 0 0 100px cyan, 0 0 5px cyan",
                  }}
                >
                  S
                </span>
                chools Division Office of Imus City Learning Resource Management
                System (LRMS) Portal named I LeaRN (Imus Learning Resources
                Navigator) supports effective implementation of the Learning
                Resource Management and Development System (LRMDS) to improve
                access to learning, teaching, and professional development
                resources by schools. It is a web-based repository of available
                learning materials in electronic copies, developed and quality
                assured in the National level, Regional level, and Division
                level.
              </p>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: 20,
            ml: 5,
          }}
        >
          <img
            src={image1}
            alt=""
            style={{
              width: "80%",
              height: "100%",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
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
              color: "white",
            }}
          >
            <Box sx={{ mt: -6, ml: 20 }}>
              <img src={awardings} alt="" style={{ width: "85%" }} />
            </Box>
            <Box
              sx={{
                width: "15%",
                display: "flex",
                color: "white",
                mt: 20,
                ml: 25,
              }}
            >
              <Typography
                sx={{
                  ml: -35,
                  fontFamily: "Fira Sans Condensed",
                  fontSize: 18,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,
                facilisis sed ornare eu, lobortis in odio. Praesent convallis
                urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
                dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
                sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui
                eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
                purus. Mauris quis diam velit. Nunc fringilla libero nec
                ullamcorper venenatis. Sed ac feugiat ante. Donec condimentum
                felis id enim tristique scelerisque. Vivamus consectetur urna in
                nisi efficitur, ut vehicula turpis consequat. Nullam at bibendum
                ligula, nec facilisis augue.
              </Typography>
            </Box>
          </Box>
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
              padding: 3,
              fontSize: 36,
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            SDOIC LRMS<p style={{ color: "black" }}>1</p>
            <span
              style={{
                color: "cyan",
                textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
              }}
            >
              ACTIVITIES
            </span>
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Box sx={{ color: "white", width: "60%" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  ml: 20,
                  fontFamily: "Poppins",
                  fontSize: 18,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,
                facilisis sed ornare eu, lobortis in odio. Praesent convallis
                urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
                dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
                sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui
                eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
                purus. Mauris quis diam velit. Nunc fringilla libero nec
                ullamcorper venenatis. Sed ac feugiat ante. Donec condimentum
                felis id enim tristique scelerisque. Vivamus consectetur urna in
                nisi efficitur, ut vehicula turpis consequat. Nullam at bibendum
                ligula, nec facilisis augue.
                <Box sx={{ width: "170px", mt: 5, zIndex: -5 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      fontFamily: "Fira Sans Condensed",
                      width: "170px",
                      borderColor: "white",
                      // position: "relative",
                      transition: "0.3s",

                      "&:hover": {
                        borderColor: "cyan",
                        boxShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
                        color: "cyan",
                      },
                    }}
                  >
                    View Activities
                  </Button>
                </Box>
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <img
                src={activities}
                alt=""
                style={{ width: "80%", marginRight: 25 }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              gap: 5,
              background: "white",
              mt: 18.6,
            }}
          >
            <Typography
              sx={{
                color: "black",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              GIVE US A FEEDBACK
            </Typography>
            <Button variant="outlined">GIVE US YOUR SUGGESTIONS</Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
