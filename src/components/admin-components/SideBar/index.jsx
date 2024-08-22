import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import links from "./sidebarlinks";

const openedMixin = (theme, width) => ({
  width,
  background: "#191c24",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  scrollbarWidth: "0.3rem",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    width: "0.3rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
  },
});

const closedMixin = (theme) => ({
  background: "#191c24",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  scrollbarWidth: "0.3rem",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    width: "0.3rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  "@media (max-width: 600px)": {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  "@media (max-width: 380px)": {
    width: 0,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ width, theme, open }) => ({
  width,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflow: "auto",
  scrollbarWidth: "thin",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    width: "0.5rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#53FDFD",
  },
  ...(open && {
    ...openedMixin(theme, width),
    "& .MuiDrawer-paper": openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function SideBar({
  themeProp,
  drawerWidth,
  drawerOpenStatus,
  closeDrawerFunction,
}) {
  const navigate = useNavigate();
  const { auth } = useStateContext();

  // Filter out "Users" if the role is "admin" and "Resources" if the role is "superadmin"
  const filteredLinks = links.filter((item) => {
    // Exclude "Users" for "admin" role
    if (auth?.role === "admin" && item.title === "Users") {
      return false;
    }

    // Exclude "Resources" for "superadmin" role
    if (auth?.role === "superadmin" && item.title === "Resources") {
      return false;
    }

    // Include all other links, including "Logs" for both roles
    return true;
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        position: "fixed",
        overflow: "auto",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#53FDFD",
        },
      }}
    >
      <StyledDrawer
        variant="permanent"
        width={drawerWidth}
        theme={themeProp}
        open={drawerOpenStatus}
      >
        <DrawerHeader theme={themeProp}>
          <IconButton onClick={closeDrawerFunction}>
            {themeProp.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#fff" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          sx={{
            backgroundColor: "#fff",
          }}
        />

        <List
          sx={{
            mt: 3,
            "@media (min-height: 1920px)": {
              mt: 6,
            },
          }}
        >
          {filteredLinks.map((item) => {
            if (
              auth.role === "sdo - personnel" &&
              ["Services", "Offices", "Users"].includes(item.title)
            ) {
              return null; // Don't render if role is "sdo - personnel" and link title matches
            }

            return (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: "block" }}
              >
                {item.links.map((link) => (
                  <Tooltip
                    title={!drawerOpenStatus && link.name}
                    placement="right"
                    key={link.name}
                  >
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          // eslint-disable-next-line no-nested-ternary
                          auth?.role === "teacher" && link.path === "dashboard"
                            ? "school-dashboard"
                            : auth?.role === "admin" &&
                              link.path === "dashboard"
                            ? link.path
                            : link.path
                        )
                      }
                      sx={{
                        fontFamily: "Poppins",
                        minHeight: 48,
                        justifyContent: drawerOpenStatus ? "initial" : "center",
                        px: 2.5,
                        backgroundColor: "light gray",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black", // Apply hover color to ListItemButton
                          "& .MuiListItemIcon-root, & .MuiListItemText-root, & .MuiTypography-root":
                            {
                              color: "black", // Apply hover color to ListItemIcon, ListItemText, and Typography
                            },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "white",
                          minWidth: 0,
                          mr: drawerOpenStatus ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "24px",
                            color: "white",
                          }}
                        >
                          {link.icon}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          opacity: drawerOpenStatus ? 1 : 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Fira Sans Condensed",
                            fontSize: "14px",
                            color: "white",
                          }}
                        >
                          {link.name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Tooltip>
                ))}
              </ListItem>
            );
          })}
        </List>
      </StyledDrawer>
    </Box>
  );
}

export default SideBar;
