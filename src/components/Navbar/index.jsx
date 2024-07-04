/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import depedLogo from "../../assets/images/deped_logo.png";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1366px)");

  const menuOptions = [
    "About Us",
    "Portal",
    "Project and Activities",
    "Library",
    "Citizen's Charter",
  ];

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        background: "black",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={depedLogo}
            alt="DepEd Logo"
            style={{
              width: isMediumScreen ? "40px" : "50px",
              height: isMediumScreen ? "40px" : "50px",
            }}
          />
        </Box>
        <Typography
          sx={{
            ml: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontFamily: "Barlow Semi Condensed",
            fontSize: isMediumScreen ? 26 : 24,
            color: "white",
          }}
        >
          Imus Learning Resource Navigator
        </Typography>
      </Box>
      {isMobile ? (
        <>
          <IconButton onClick={handleDrawerOpen} sx={{ color: "white", mr: 5 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={openMenu} onClose={handleDrawerClose}>
            <List sx={{ width: 250 }}>
              {menuOptions.map((text, index) => (
                <ListItem button key={index} onClick={handleDrawerClose}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <ListItem button onClick={handleDrawerClose}></ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMediumScreen ? 2 : 3,
            color: "white",
            flexWrap: isMediumScreen ? "wrap" : "nowrap",
            mr: 5,
          }}
        >
          {menuOptions.map((option, index) => (
            <Typography
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Fira Sans Condensed",
                fontSize: isMediumScreen ? 16 : 21,
                "&:hover": {
                  color: "cyan",
                  cursor: "pointer",
                  textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
                },
              }}
            >
              {option}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
