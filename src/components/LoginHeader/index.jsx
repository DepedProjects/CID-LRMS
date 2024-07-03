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
import { useMediaQuery } from "@mui/material";

export default function LoginHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1366px)");
  const menuOptions = ["About Us", "Citizen's Charter"];

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
            fontFamily: "Poppins",
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
            color: "black",
            flexWrap: isMediumScreen ? "wrap" : "nowrap",
            mr: 25, // Add right margin to ensure padding
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
                whiteSpace: "nowrap", // Ensure no wrapping
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
