import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useStateContext } from "../../contexts/ContextProvider";
import accountService from "../../services/account-service";
import { Box, Button, Divider, IconButton, Modal, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  //   height: "80vh",
  width: "40vw",
  minWidth: "500px",
  transform: "translate(-50%, -50%)",
  bgcolor: "#f0f0f0",
  boxShadow: "3px 2px 20px 3px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  p: 4,
};

export default function ChangePasswordModal({ open, handleClose, onSuccess }) {
  const { auth } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    newPassword: "",
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

    const userData = { ...values };
    if (auth?.officeId) {
      userData.officeId = auth.officeId;
    }

    accountService
      .updateUser(auth?.uid, userData)
      .then(() => {
        setValues({
          password: "",
          newPassword: "",
        });
        setRetypePassword("");
        onSuccess();
        handleClose();
      })
      .catch((err) => {
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

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            position: "absolute",
            right: 20,
            cursor: "pointer",
            zIndex: 100,
          }}
        >
          <IconButton onClick={handleClose} sx={{ p: 0 }}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "30px", fontWeight: "bold", mb: 4, fontFamily: "Fira Sans Condensed" }}>
            CHANGE PASSWORD
          </Typography>

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
                fontFamily: "Fira Sans Condensed"
              }}
            >
              {error}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "15px", fontWeight: "bold", fontFamily: "Fira Sans Condensed" }}>
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
          <Typography sx={{ fontSize: "15px", fontWeight: "bold", fontFamily: "Fira Sans Condensed" }}>
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
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ fontSize: "15px", fontWeight: "bold", fontFamily: "Fira Sans Condensed" }}>
            New Password
          </Typography>
          <TextField
            id="password"
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
              mb: 2,
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
          <Typography sx={{ fontSize: "15px", fontWeight: "bold", fontFamily: "Fira Sans Condensed" }}>
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
                  onKeyPress={() => setShowRetypePassword(!showRetypePassword)}
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
        </Box>
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
              borderRadius: "10px",
              backgroundColor: "lightgray",
              color: "black",
              fontSize: "15px",
              padding: "8px 5px",
              margintop: "15px",
              width: "150px",
              height: "40px",
              mx: 2,
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
    </Modal>
  );
}
