import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import depedLogo from "../../assets/images/deped_logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FcImport, FcReading } from "react-icons/fc";
import { useStateContext } from "../../contexts/ContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1366px)");
  const { auth, setAuth } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenProfileMenu(false);
    setAuth(null);
    // Perform redirection manually
    navigate("/"); // Replace with your desired path
  };

  const menuOptions = [
    "About Us",
    { text: "Portal", action: () => navigate("/Portal") },
    "Project and Activities",
    {
      text: "Library",
      action: () => navigate("/Library"),
    },
    {
      text: "Citizen's Charter",
      action: () => navigate("/CitizensCharter"),
    },
  ];

  const profileOptions = [
    {
      text: "My Account Details",
      icon: <FcReading size={36} />,
      action: () => {},
    },
    {
      text: "Log Out",
      icon: <FcImport size={36} />,
      action: handleLogout,
    },
  ];

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  const handleProfileOpen = () => {
    setOpenProfileMenu(true);
  };

  const handleProfileClose = () => {
    setOpenProfileMenu(false);
  };

  const handleHome = () => {
    navigate("/Homepage");
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
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleHome}
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
          {isMobile ? "ILeaRN" : "Imus Learning Resource Navigator"}
        </Typography>
      </Box>
      {isMobile ? (
        <>
          <IconButton onClick={handleDrawerOpen} sx={{ color: "white", mr: 5 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={openMenu} onClose={handleDrawerClose}>
            <List sx={{ width: 250 }}>
              {menuOptions.map((option, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={
                    typeof option === "string"
                      ? handleDrawerClose
                      : option.action
                  }
                >
                  <ListItemText primary={option.text} />
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
              onClick={
                typeof option === "string"
                  ? () => {} // Handle regular menu items
                  : option.action
              }
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
              {typeof option === "string" ? option : option.text}
            </Typography>
          ))}
          <IconButton sx={{ color: "white" }} onClick={handleProfileOpen}>
            <AccountCircleIcon sx={{ fontSize: 36 }} />
          </IconButton>
          <Drawer
            anchor="right"
            open={openProfileMenu}
            onClose={handleProfileClose}
          >
            <List sx={{ width: 350 }}>
              <ListItem
                sx={{
                  mb: 5,
                  mt: 3,
                  gap: -1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 48, color: "black" }} />
                <ListItemText
                  primary={`${auth?.username}`}
                  primaryTypographyProps={{
                    fontFamily: "Fira Sans Condensed",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                />
                {auth?.role === "admin" ? (
                  <>
                    <ListItemText
                      primary={auth?.officeName}
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                    <ListItemText
                      primary="Administrator"
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 14,
                      }}
                    />
                  </>
                ) : auth?.role === "teacher" ? (
                  <>
                    <ListItemText
                      primary={auth?.schoolName}
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                    <ListItemText
                      primary="Teacher"
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 14,
                      }}
                    />
                  </>
                ) : null}
              </ListItem>
              {profileOptions.map((option, index) => (
                <ListItem button key={index} onClick={option.action}>
                  <ListItemIcon sx={{ color: "black" }}>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: "black",
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                    primary={option.text}
                    primaryTypographyProps={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 16,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      )}
    </Box>
  );
}
