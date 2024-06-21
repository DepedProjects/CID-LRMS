/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import depedLogo from "../../assets/images/deped_logo.png";
// import { FaUserCircle } from "react-icons/fa";
// import { MdHome } from "react-icons/md";
import { Box, Button, Typography } from "@mui/material";

export default function Navbar() {
  // const [openMenu, setOpenMenu] = useState(false);
  // const menuOptions = [
  //   {
  //     text: "About Us",
  //   },
  //   {
  //     text: "Portal",
  //   },
  //   {
  //     text: "Project and Activities",
  //   },
  //   {
  //     text: "Library",
  //   },
  //   {
  //     text: "Citizen's Charter",
  //   },
  //   {
  //     text: "Sign in",
  //     icon: <FaUserCircle />,
  //   },
  // ];

  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        background: "black",
        position: "fixed",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={depedLogo}
            alt=""
            style={{
              width: "50%",
            }}
          />
        </Box>
        <Typography
          sx={{
            ml: -2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontFamily: "Fira Sans Condensed",
            fontSize: 18,
            color: "white",
          }}
        >
          Imus Learning Resource Navigator
        </Typography>
      </Box>
      <Box
        sx={{
          color: "white",
          gap: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            width: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Sans Condensed",
            "&:hover": {
              color: "cyan",
              cursor: "pointer",
              textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
            },
          }}
        >
          About Us
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Sans Condensed",
            "&:hover": {
              color: "cyan",
              cursor: "pointer",
              textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
            },
          }}
        >
          Portal
        </Typography>
        <Typography
          sx={{
            width: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Sans Condensed",
            "&:hover": {
              color: "cyan",
              cursor: "pointer",
              textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
            },
          }}
        >
          Project and Activities
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Sans Condensed",
            "&:hover": {
              color: "cyan",
              cursor: "pointer",
              textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
            },
          }}
        >
          Library
        </Typography>
        <Typography
          sx={{
            width: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Sans Condensed",
            "&:hover": {
              color: "cyan",
              cursor: "pointer",
              textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
            },
          }}
        >
          Citizen's Charter
        </Typography>
        <Box sx={{ width: "150px" }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              fontFamily: "Fira Sans Condensed",
              width: "120px",
              borderColor: "white",
              position: "relative",
              transition: "0.3s",

              "&:hover": {
                borderColor: "cyan",
                boxShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
                color: "cyan",
              },
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
