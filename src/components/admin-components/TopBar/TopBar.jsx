import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import DepedLogo from "../../../assets/images/deped_logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FcApproval, FcImport, FcReading, FcSupport } from "react-icons/fc";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import accountService from "../../../services/account-service";
import OnChangePasswordModal from "../../../modals/AccountDetails/ChangePasswordModal";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, width }) => ({
  background: "#AF1763",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Topbar({
  themeProp,
  drawerWidth,
  openDrawerFunction,
  drawerOpenStatus,
}) {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const { auth, setAuth } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (auth?.uid) {
      try {
        await accountService.logout(auth.uid, auth.username); // Call the logout function
        setAuth(null); // Clear auth state
        navigate("/"); // Navigate to the desired path
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      console.error("No UID found");
    }
  };

  const handleOpenModal = () => {
    setOpenProfileMenu(false);
    setOpenModal(true);
  };

  const handleProfileOpen = () => {
    setOpenProfileMenu(true);
  };

  const handleProfileClose = () => {
    setOpenProfileMenu(false);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const profileOptions = [
    {
      text: "My Account Information",
      icon: <FcReading size={36} />,
      action: () => {},
    },
    {
      text: "Change Password",
      icon: <FcSupport size={36} />,
      action: handleOpenModal,
    },
    {
      text: "Log Out",
      icon: <FcImport size={36} />,
      action: handleLogout,
    },
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <StyledAppBar
          position="fixed"
          theme={themeProp}
          open={drawerOpenStatus}
          width={drawerWidth}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawerFunction}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(drawerOpenStatus && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                onClick={handleNavigate}
                component="img"
                src={DepedLogo}
                sx={{
                  mr: 2,
                  my: 1,
                  width: "60px",
                  cursor: "pointer",
                  "@media (min-height: 1920px)": {
                    width: "100px",
                  },
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: "bold", fontFamily: "Fira Sans Condensed" }}
              >
                SDOIC - Learning Resource Management System
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "end", mr: 5 }}>
              <IconButton sx={{ color: "white" }} onClick={handleProfileOpen}>
                <AccountCircleIcon sx={{ fontSize: 36 }} />
              </IconButton>
              <Drawer
                anchor="right"
                open={openProfileMenu}
                onClose={handleProfileClose}
                sx={{ zIndex: 10000 }}
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
                      primary={auth?.username}
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    />
                    {auth?.role === "admin" || auth?.role === "superadmin" ? (
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
                          primary={
                            auth?.role === "admin"
                              ? "Administrator"
                              : "Super Administrator"
                          }
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
                          primary="teacher"
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
          </Toolbar>
        </StyledAppBar>
      </Box>

      <OnChangePasswordModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        onSuccess={() => {
          setOpenPrompt(true);
          handleProfileClose(); // Close profile menu when modal appears
        }}
      />

      <Dialog open={openPrompt} onClose={() => setOpenPrompt(false)}>
        <Box sx={{ display: "flex", flexDirection: "column", py: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FcApproval
              style={{
                fontSize: 64,
              }}
            />
          </Box>

          <DialogTitle
            sx={{
              width: "20rem",
              fontSize: "1rem",
              paddingTop: -100,
              textAlign: "center",
            }}
          >
            Password Change Successful
          </DialogTitle>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setOpenPrompt(false)}
              sx={{
                borderRadius: "16px", // Adjust the value as needed
                width: "50%",
                backgroundColor: "#51f559",
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)", // Green glowing effect
                "&:hover": {
                  backgroundColor: "#51f559", // Stronger background color on hover
                  boxShadow: "0 0 20px rgba(0, 255, 0, 1)", // Stronger green glow on hover
                },
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default Topbar;
