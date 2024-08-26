import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import Header from "../../../components/LoginHeader";
import loginImage from "../../../assets/images/LoginImage.png";
import Footer from "../../../components/Footer";
import accountService from "../../../services/account-service";
import { string, object } from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useStateContext } from "../../../contexts/ContextProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openPrompt, setOpenPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const { auth, setAuth } = useStateContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },

    validationSchema: object().shape({
      username: string().required("Required"),
      password: string().required("Required"),
    }),
    onSubmit: () => {
      setLoading(true);
      setError("");

      accountService
        .authenticate(formik.values)
        .then((res) => {
          if (res.valid) {
            if (res?.data.status === "disabled") {
              // If the status is disabled, show the restricted message
              setPromptMessage("Account Restricted. Contact Support");
              setOpenPrompt(true);
            } else {
              if (res?.data.role === "admin") {
                navigate("/Admin");
              } else if (res?.data.role === "superadmin") {
                navigate("/Users");
              } else {
                navigate("/Homepage");
              }
              setAuth(res?.data);
              localStorage.setItem("auth", JSON.stringify(res?.data));
            }
          } else {
            setPromptMessage(
              "You provided invalid credentials. Please try again"
            );
            setOpenPrompt(true);
          }
        })
        .catch((err) => {
          let message = "";
          if (err?.response?.status === 404) {
            message = "You provided invalid credentials. Please try again";
          } else if (err?.response?.status === 403) {
            message = "Account Restricted. Contact Support";
          } else if (err?.response?.status === 401) {
            message = err?.response?.data?.error;
          } else {
            message = "Internal Server Error";
          }
          setPromptMessage(message || err?.message);
          setOpenPrompt(true);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  // useEffect(() => {
  //   console.log("Auth schoolName on render:", auth?.schoolName); // Log schoolName on component render
  // }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden", // Prevent vertical scrolling
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "flex-start",
          gap: { xs: 2, sm: 3, md: 4, lg: 12 },
          paddingTop: { xs: 10, sm: 8, md: 10, lg: 27, xl: 12 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 25.5, xl: 12 },
          px: { xs: 3, sm: 3, md: 4, lg: 5, xl: 5 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { lg: -1, xl: 1 },
            ml: { lg: 7, xl: 6 },
            mb: { lg: 2, xl: 16 },
            maxHeight: { xs: "40vh", md: "50vh", lg: "30vh", xl: "70vh" }, // Adjust as needed for different resolutions
            maxWidth: { xs: "80vw", md: "70vw", lg: "30vw", xl: "40vw" }, // Adjust width as needed for different resolutions
          }}
        >
          <img
            src={loginImage}
            alt="Login"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%", // Ensure image doesn't exceed its container's height
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: { xs: 2, sm: 3, md: 4, lg: 1, xl: 5 },
            boxSizing: "border-box",
            mt: { lg: -3, xl: 20 },
            ml: { lg: 20, xl: 20 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Barlow Semi Condensed",
              fontWeight: "bold",
              fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "1.5rem",
                xl: "3rem",
              },
              mb: { xs: 2, sm: 3 },
            }}
          >
            SIGN IN
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="standard-basic"
              name="username"
              label="Username"
              variant="standard"
              disabled={loading}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched?.username && Boolean(formik.errors?.username)
              }
              helperText={formik.touched?.username && formik.errors?.username}
              fullWidth
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: { lg: 400, xl: 600 },
                mt: 1,
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.5rem",
                  lg: "2rem",
                  xl: "2.5rem",
                },
              }}
            />
            <TextField
              id="password"
              label="password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              disabled={loading}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched?.password && Boolean(formik.errors?.password)
              }
              helperText={formik.touched?.password && formik.errors?.password}
              sx={{
                width: "100%",
                maxWidth: { lg: 400, xl: 600 },
                mt: 3,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                "& .MuiInputLabel-root": {
                  fontFamily: "Arial, sans-serif",
                },
              }}
              InputProps={{
                style: {
                  color: "black",
                },
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onKeyPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityIcon
                        size={18}
                        sx={{
                          color: "black",
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        size={18}
                        sx={{
                          color: "black",
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                maxWidth: { lg: 400, xl: 600 },
                mt: 5,
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.5rem",
                  lg: "1rem",
                },
              }}
            >
              LOG IN
            </Button>
            <Typography sx={{ mt: 2, ml: 5 }}>{error}</Typography>
          </form>
        </Box>
      </Box>
      <Footer />
      <Dialog
        open={openPrompt}
        onClose={handleClosePrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Authentication Failed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black", fontFamily: "Fira Sans Condensed" }} // Set text color to black
          >
            {promptMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrompt} autoFocus>
            {promptMessage === "Account Restricted. Contact Support"
              ? "CLOSE"
              : "TRY AGAIN"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
