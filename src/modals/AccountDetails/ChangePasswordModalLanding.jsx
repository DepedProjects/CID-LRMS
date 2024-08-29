import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useStateContext } from "../../contexts/ContextProvider";
import accountService from "../../services/account-service";
import { FcApproval } from "react-icons/fc";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return { hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar };
};

export default function ChangePasswordModalLanding({ open, handleClose }) {
  const { auth, setAuth } = useStateContext();
  const [openPrompt, setOpenPrompt] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const navigate = useNavigate();
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    newPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleGetAll = () => {
    setLoading(true);
    setError("");

    accountService
      .getUserById(auth?.uid)
      .then((res) => {
        setValues({ username: res.username, password: "", newPassword: "" });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    setError("");
    setPasswordError("");

    if (
      !validatePassword(values.newPassword).hasUpperCase ||
      !validatePassword(values.newPassword).hasLowerCase ||
      !validatePassword(values.newPassword).hasNumber ||
      !validatePassword(values.newPassword).hasSpecialChar
    ) {
      setPasswordError(
        "New password must contain uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    if (retypePassword !== values.newPassword) {
      setPasswordError("Retyped password doesn't match new password.");
      setLoading(false);
      return;
    }

    const userData = { ...values };
    if (auth?.officeId) {
      userData.officeId = auth.officeId;
    }

    accountService
      .updateUser(auth?.uid, userData)
      .then((response) => {
        console.log("API call successful:", response);
        console.log("AUTH:", response?.data?.data);
        setValues({
          password: "",
          newPassword: "",
        });
        setRetypePassword("");
        setAuth(response?.data?.data);
        handleClose();
        setOpenPrompt(true);
        localStorage.setItem("auth", JSON.stringify(response?.data?.data));
      })
      .catch((err) => {
        console.log("API call failed:", err);
        setError(err?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      handleGetAll();
    }
  }, [open]);

  useEffect(() => {
    setPasswordValidation(validatePassword(values.newPassword));
  }, [values.newPassword]);

  

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            //   height: "80vh",
            width: { lg: "60vw", xl: "40vw" },
            minWidth: "500px",
            transform: "translate(-50%, -50%)",
            boxShadow: "3px 2px 20px 3px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            p: 4,
            background: "#f0f0f0",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 20,
              cursor: "pointer",
              zIndex: 100,
            }}
          ></Box>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                mt: { lg: -15, xl: -10 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  fontFamily: "Fira Sans Condensed",
                  mb: 3,
                }}
              >
                CHANGE PASSWORD IS REQUIRED
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  {
                    text: "Must have at least 1 special character",
                    key: "hasSpecialChar",
                  },
                  { text: "Must have lowercase letter", key: "hasLowerCase" },
                  { text: "Must have uppercase letter", key: "hasUpperCase" },
                  { text: "Must have numeric character", key: "hasNumber" },
                  { text: "At least 8 characters", key: "length" },
                ].map(({ text, key }) => (
                  <Typography
                    key={key}
                    sx={{
                      display: "flex",
                      fontSize: "12px",
                      alignItems: "center",
                      gap: 1,
                      color:
                        passwordValidation[key] ||
                        (key === "length" && values.newPassword.length >= 6)
                          ? "green"
                          : "red",
                    }}
                  >
                    {passwordValidation[key] ||
                    (key === "length" && values.newPassword.length >= 8) ? (
                      <CheckCircleOutlinedIcon
                        sx={{ fontSize: "20px", color: "green" }}
                      />
                    ) : (
                      <CancelOutlinedIcon
                        sx={{ fontSize: "20px", color: "red" }}
                      />
                    )}
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "red",
                  pl: 2,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "lightgray",
                    fontWeight: "bolder",
                    fontSize: "15px",
                    fontFamily: "Fira Sans Condensed",
                  }}
                >
                  {error}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "Fira Sans Condensed",
                }}
              >
                Username
              </Typography>
              <TextField
                id="username"
                placeholder="Username"
                variant="outlined"
                size="small"
                disabled={loading}
                value={values?.username}
                onChange={(evt) =>
                  setValues({ ...values, username: evt.target.value })
                }
                sx={{
                  width: "100%",
                  mb: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    transition: "border-color 0.2s ease-in-out",
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "Fira Sans Condensed",
                }}
              >
                Current Password
              </Typography>
              <TextField
                id="password"
                placeholder="Enter current password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                disabled={loading}
                value={values?.password}
                onChange={(evt) =>
                  setValues({ ...values, password: evt.target.value })
                }
                sx={{
                  width: "100%",
                  mb: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    transition: "border-color 0.2s ease-in-out",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onKeyPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon size={18} />
                      ) : (
                        <VisibilityOffIcon size={18} />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "Fira Sans Condensed",
                  width: "400px",
                }}
              >
                New Password
              </Typography>
              <TextField
                id="newPassword"
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                disabled={loading}
                value={values?.newPassword}
                onChange={(evt) =>
                  setValues({ ...values, newPassword: evt.target.value })
                }
                helperText={
                  passwordError ||
                  (retypePassword
                    ? (retypePassword !== values.newPassword && (
                        <Typography sx={{ fontSize: "12px", color: "red" }}>
                          {`Retyped Password doesn't match New Password`}
                        </Typography>
                      )) ||
                      null
                    : null)
                }
                sx={{
                  width: "100%",
                  mb: 2,
                  color: "black",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    transition: "border-color 0.2s ease-in-out",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onKeyPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <VisibilityIcon size={18} />
                      ) : (
                        <VisibilityOffIcon size={18} />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "Fira Sans Condensed",
                }}
              >
                Retype New Password
              </Typography>

              <TextField
                id="password"
                placeholder="Retype New Password"
                type={showRetypePassword ? "text" : "password"}
                variant="outlined"
                size="small"
                disabled={loading}
                value={retypePassword}
                onChange={(evt) => setRetypePassword(evt.target.value)}
                helperText={
                  retypePassword
                    ? (retypePassword !== values.newPassword && (
                        <Typography sx={{ fontSize: "12px", color: "red" }}>
                          {`Retyped Password doesn't match New Password`}
                        </Typography>
                      )) ||
                      null
                    : null
                }
                sx={{
                  width: "100%",
                  mb: 4,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    transition: "border-color 0.2s ease-in-out",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      onKeyPress={() =>
                        setShowRetypePassword(!showRetypePassword)
                      }
                    >
                      {showRetypePassword ? (
                        <VisibilityIcon size={18} />
                      ) : (
                        <VisibilityOffIcon size={18} />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  disabled={
                    retypePassword !== values.newPassword ||
                    !retypePassword ||
                    !values.newPassword
                  }
                  onClick={handleUpdate}
                  variant="contained"
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "yellow green",
                    color: "black",
                    fontSize: "15px",
                    padding: "8px 5px",
                    margintop: "15px",
                    width: "100%",
                    height: "40px",
                    "&:hover": {
                      backgroundColor: "#2031C9",
                      color: "#fff",
                      fontWeight: "bolder",
                    },
                  }}
                >
                  Submit
                </Button>
                {retypePassword !== values.newPassword ||
                  !retypePassword ||
                  (!values.newPassword && (
                    <Typography sx={{ fontSize: "15px" }}>Wrong!!</Typography>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

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
