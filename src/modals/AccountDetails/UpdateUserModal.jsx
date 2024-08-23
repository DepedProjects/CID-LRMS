import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Switch,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { number, object, string } from "yup";
import SelectOffice from "../../components/admin-components/Textfields/SelectOffice";
import SelectRole from "../../components/admin-components/Textfields/SelectRole";
import SelectSchool from "../../components/admin-components/Textfields/SelectSchool";
import accountService from "../../services/account-service";
import { useStateContext } from "../../contexts/ContextProvider";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "absolute",
  backgroundColor: "white",
  boxShadow: "3px 2px 20px 3px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 2,
  overflow: "auto",
  "@media (min-width: 10px)": {
    height: "90vh",
    width: "85vw",
  },
  "@media (min-width: 480px)": {
    height: "85vh",
    width: "80vw",
  },
  "@media (min-width: 640px)": {
    height: "75vh",
    width: "70vw",
  },
  "@media (min-width: 768px)": {
    height: "75vh",
    width: "70vw",
  },
  "@media (min-width: 1024px)": {
    height: "80vh",
    width: "70vw",
  },
  "@media (min-width: 1082px)": {
    height: "90vh",
    width: "50vw",
  },
};

export default function UpdateUserModal({
  open,
  handleClose,
  data,
  updateTableFunction,
}) {
  const { auth } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: data?.username || "",
      password: data?.password || "",
      role: data?.role || "",
      officeId: data?.officeId || null,
      schoolId: data?.schoolId || null,
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      gender: data?.gender || "",
      age: null,
      address: data?.address || "",
      status: data?.status || "",
    },

    validationSchema: object().shape({
      username: string().required("Required"),
      password: string().required("Required"),
      role: string().required("Required"),
      officeId: number().nullable(),
      schoolId: number().nullable(),
      firstName: string().required("Required"),
      middleName: string().nullable(),
      lastName: string().required("Required"),
      email: string().required("Required"),
      gender: string().nullable(),
      age: number().nullable(),
      address: string().nullable(),
      status: string().nullable(),
    }),

    onSubmit: (values) => {
      setLoading(true);
      setError("");

      const formikValues = {
        ...values,
        newPassword: values.password ? values.password : undefined,
        status: values.status,
        editor: "superadmin",
      };

      console.log("Submitting values:", formikValues);
      console.log("User Status: ", values.status);

      accountService
        .updateUser(data?.uid, formikValues)
        .then(() => {
          alert("User Updated Successfully");
          updateTableFunction();
          handleClose();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleStatusChange = (e) => {
    if (e.target.checked === false) {
      setOpenDialog(true);
    } else {
      formik.setFieldValue("status", "enabled");
    }
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      formik.setFieldValue("status", "disabled");
    }
  };

  useEffect(() => {
    if (data) {
      const initialValues = {
        username: data?.username || "",
        password: data?.password || "",
        role: data?.role || "",
        officeId: data?.officeId || null,
        schoolId: data?.schoolId || null,
        firstName: data?.firstName || "",
        middleName: data?.middleName || "",
        lastName: data?.lastName || "",
        gender: data?.gender || "",
        email: data?.email || "",
        age: null,
        address: data?.address || "",
        status: data?.status || "",
      };
      console.log("Initial Formik Values: ", initialValues);
      formik.setValues(initialValues);
    }
  }, [data]);

  useEffect(() => {
    const { username, password, role } = formik.values;
    setDisabled(!(username && password && role));
  }, [
    formik.values.username,
    formik.values.password,
    formik.values.role,
    formik.values.firstName,
    formik.values.lastName,
    formik.values.email,
  ]);

  useEffect(() => {
    if (formik.values.role.toLowerCase() === "teacher") {
      if (formik.values.officeId) {
        formik.setFieldValue("officeId", null);
      }
    }
  }, [formik.values.role]);

  useEffect(() => {
    if (formik.values.role.toLowerCase() === "admin") {
      if (formik.values.schoolId) {
        formik.setFieldValue("schoolId", null);
      }
    }
  }, [formik.values.role]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropTransition
        disableAutoFocus
      >
        <Box
          variant="form"
          component="form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          sx={style}
        >
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
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: 5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                UPDATE USER
              </Typography>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
                px: 5,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  name="username"
                  label={`Username ${formik?.values?.username ? "" : "*"}`}
                  size="small"
                  disabled={loading}
                  value={formik?.values?.username}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated username: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.username &&
                    Boolean(formik?.errors?.username)
                  }
                  helperText={
                    formik?.touched?.username && formik?.errors?.username
                  }
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.password}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated password: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.password &&
                    Boolean(formik?.errors?.password)
                  }
                  helperText={
                    formik?.touched?.password && formik?.errors?.password
                  }
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon size={18} sx={{ color: "#606468" }} />
                        ) : (
                          <VisibilityOffIcon
                            size={18}
                            sx={{ color: "#606468" }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>

              <TextField
                label="First Name"
                name="firstName"
                size="small"
                disabled={loading}
                value={formik?.values?.firstName}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Updated first name: ", e.target.value);
                }}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.firstName &&
                  Boolean(formik?.errors?.firstName)
                }
                helperText={
                  formik?.touched?.firstName && formik?.errors?.firstName
                }
                fullWidth
              />

              <TextField
                label="Last Name"
                name="lastName"
                size="small"
                disabled={loading}
                value={formik?.values?.lastName}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Updated last name: ", e.target.value);
                }}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.lastName && Boolean(formik?.errors?.lastName)
                }
                helperText={
                  formik?.touched?.lastName && formik?.errors?.lastName
                }
                fullWidth
              />

              <TextField
                label="Middle Name"
                name="middleName"
                size="small"
                disabled={loading}
                value={formik?.values?.middleName}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Updated middle name: ", e.target.value);
                }}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.middleName &&
                  Boolean(formik?.errors?.middleName)
                }
                helperText={
                  formik?.touched?.middleName && formik?.errors?.middleName
                }
                fullWidth
              />

              <TextField
                label="Email"
                name="email"
                size="small"
                disabled={loading}
                value={formik?.values?.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Updated email: ", e.target.value);
                }}
                onBlur={formik?.handleBlur}
                error={formik?.touched?.email && Boolean(formik?.errors?.email)}
                helperText={formik?.touched?.email && formik?.errors?.email}
                fullWidth
              />

              <Box sx={{ display: "flex", gap: 3 }}>
                <TextField
                  label="Age"
                  name="age"
                  size="small"
                  type="number"
                  disabled={loading}
                  value={formik?.values?.age || ""}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated age: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={formik?.touched?.age && Boolean(formik?.errors?.age)}
                  helperText={formik?.touched?.age && formik?.errors?.age}
                  sx={{ width: "20%" }}
                />

                <RadioGroup
                  name="gender"
                  value={formik?.values?.gender || ""}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated gender: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  row
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    disabled={loading}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    disabled={loading}
                  />
                  <FormControlLabel
                    value="prefer not to say"
                    control={<Radio />}
                    label="Prefer not to say"
                    disabled={loading}
                  />
                </RadioGroup>
              </Box>

              <SelectRole
                label={`Role ${formik?.values?.role ? "" : "*"}`}
                name="role"
                width="100%"
                value={formik?.values?.role}
                onChange={(fieldName, selectedValue) => {
                  formik?.setFieldValue("role", selectedValue);
                  console.log("Updated role: ", selectedValue);
                }}
                onBlur={formik?.handleBlur}
                error={formik?.touched?.role && Boolean(formik?.errors?.role)}
                helperText={formik?.touched?.role && formik?.errors?.role}
                sx={{
                  width: "50%",
                  pr: 1,
                  "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black !important",
                    },
                  },
                }}
              />

              {formik.values.role.toLowerCase() === "admin" && (
                <Grid item xs={12}>
                  <SelectOffice
                    label={`Office ${formik?.values?.officeId ? "" : "*"}`}
                    name="office"
                    width="100%"
                    variant="outlined"
                    value={formik?.values?.officeId}
                    onChange={(fieldName, selectedValue) => {
                      formik?.setFieldValue("officeId", selectedValue);
                      console.log("Updated officeId: ", selectedValue);
                    }}
                    onBlur={formik?.handleBlur}
                    error={
                      formik?.touched?.officeId &&
                      Boolean(formik?.errors?.officeId)
                    }
                    helperText={
                      formik?.touched?.officeId && formik?.errors?.officeId
                    }
                    disabled={formik.values.role.toLowerCase() === "teacher"}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              )}

              {formik.values.role.toLowerCase() === "teacher" && (
                <Grid item xs={12}>
                  <SelectSchool
                    label={`School ${formik?.values?.schoolId ? "" : "*"}`}
                    name="school"
                    width="100%"
                    variant="outlined"
                    value={formik?.values?.schoolId}
                    onChange={(fieldName, selectedValue) => {
                      formik?.setFieldValue("schoolId", selectedValue);
                      console.log("Updated schoolId: ", selectedValue);
                    }}
                    onBlur={formik?.handleBlur}
                    error={
                      formik?.touched?.schoolId &&
                      Boolean(formik?.errors?.schoolId)
                    }
                    helperText={
                      formik?.touched?.schoolId && formik?.errors?.schoolId
                    }
                    disabled={formik.values.role.toLowerCase() === "admin"}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              )}

              <TextField
                label="Address"
                name="address"
                size="small"
                disabled={loading}
                multiline
                maxRows={4}
                value={formik?.values?.address}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Updated address: ", e.target.value);
                }}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.address && Boolean(formik?.errors?.address)
                }
                helperText={formik?.touched?.address && formik?.errors?.address}
                fullWidth
              />

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography>Status</Typography>
                  <Switch
                    checked={formik?.values?.status === "enabled"}
                    onChange={handleStatusChange}
                  />
                  <Typography>
                    {formik?.values?.status === "enabled"
                      ? "Enabled"
                      : "Disabled"}
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingX: 5,
              paddingY: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disabled || loading}
            >
              Update User
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Disable User Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to disable this user's account? The user will
            no longer have access to the system until re-enabled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
