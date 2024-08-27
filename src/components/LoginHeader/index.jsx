import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/images/deped_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useMediaQuery } from "@mui/material";

export default function LoginHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1366px)");
  const navigate = useNavigate();

  const menuOptions = [
    { label: "About Us", route: "/AboutUsNav" },
    { label: "Citizen's Charter", route: "/CitizenCharterinNav" },
  ];

  // const handleNavigation = (route) => {
  //   navigate(route); // Navigate to the desired route
  //   handleDrawerClose(); // Close the drawer after navigation
  // };

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      sx={{
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 10,
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        pr: isMobile ? 2 : 5,
        top: 0, // Ensure it stays at the top of the viewport
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="DepEd Logo"
            style={{
              width: isMediumScreen ? "60px" : "70px",
              height: isMediumScreen ? "60px" : "70px",
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
            fontSize: isMediumScreen ? 20 : 24,
            color: "black",
          }}
        >
          {isMobile ? "ILeaRN" : "Imus Learning Resource Navigator"}
        </Typography>
      </Box>
      {isMobile ? (
        <>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{ color: "black", mr: 15 }} // Adjusted margin right
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={openMenu}
            onClose={handleDrawerClose}
            sx={{ height: "100%", "& .MuiDrawer-paper": { height: "100%" } }}
          >
            <List sx={{ width: 250 }}>
              {menuOptions.map((option, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    handleDrawerClose();
                    navigate(option.route);  // Use navigate here
                  }}
                >
                  <ListItemText primary={option.label} />
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
            color: "black",
            flexWrap: isMediumScreen ? "wrap" : "nowrap",
            mr: 25, // Add right margin to ensure padding
          }}
        >
          {menuOptions.map((option, index) => (
            <Typography
              key={index}
              onClick={() => navigate(option.route)}  // Use navigate here
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Fira Sans Condensed",
                fontSize: isMediumScreen ? 16 : 21,
                whiteSpace: "nowrap", // Ensure no wrapping
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
