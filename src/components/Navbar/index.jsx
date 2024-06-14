/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import depedLogo from "../../assets/images/deped_logo.png";
import { FaUserCircle } from "react-icons/fa";
// import { MdHome } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "About Us",
    },
    {
      text: "Portal",
    },
    {
      text: "Project and Activities",
    },
    {
      text: "Library",
    },
    {
      text: "Citizen's Charter",
    },
    {
      text: "Sign in",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <nav>
      <div
        className="nav-logo-container"
        style={{ fontWeight: "bold", wordSpacing: 5 }}
      >
        <img
          src={depedLogo}
          alt=""
          style={{
            width: "70px",
            height: "auto",
            marginTop: 5,
            marginRight: 12,
          }}
        />
        Imus Learning Resource Navigator
      </div>
      <div className="navbar-links-container" style={{ gap: "5px" }}>
        <a href="" style={{ fontSize: "15px", marginRight: 18 }}>
          About Us
        </a>
        <a href="" style={{ fontSize: "15px", marginRight: 18 }}>
          Portal
        </a>
        <a href="" style={{ fontSize: "15px", color: "white", marginRight: 18 }}>
          Project and Activities
        </a>
        <a href="" style={{ fontSize: "15px", color: "white", marginRight: 18 }}>
          Library
        </a>
        <a href="" style={{ fontSize: "15px", color: "white", marginRight: 18 }}>
          Citizen's Charter
        </a>
        <button className="primary-button" style={{ fontSize: "15px" }}>
          Sign in
        </button>
      </div>
      <div className="navbar-menu-container">
        <ImMenu onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
