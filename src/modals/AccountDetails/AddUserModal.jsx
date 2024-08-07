import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcApproval } from "react-icons/fc";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { number, object, string } from "yup";
import SelectOffice from "../../components/admin-components/Textfields/SelectOffice";
import SelectRole from "../../components/admin-components/Textfields/SelectRole";
import SelectSchool from "../../components/admin-components/Textfields/SelectSchool";
import accountService from "../../services/account-service";

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
    height: "80vh",
    width: "65vw",
  },
};

export default function AddUserModal({
  open,
  handleClose,
  updateTableFunction,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true); // Start as disabled
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openPrompt, setOpenPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      officeId: null,
      schoolId: null,
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      age: null,
      address: "",
    },
    validationSchema: object().shape({
      username: string().required("Required"),
      password: string().required("Required"),
      role: string().required("Required"),
      officeId: number().nullable(), // optional
      schoolId: number().nullable(), // optional
      firstName: string().nullable(), // optional
      middleName: string().nullable(), // optional
      lastName: string().nullable(), // optional
      birthdate: string().nullable(), // optional
      age: number().nullable(), // optional
      address: string().nullable(), // optional
    }),
    onSubmit: () => {
      setLoading(true);
      setError("");

      const { role, ...otherValues } = formik.values;
      const lowerCasedRole = role.toLowerCase();

      accountService
        .register({ role: lowerCasedRole, ...otherValues })
        .then(() => {
          setPromptMessage("A User is registered successfully!"); // Set success message
          setOpenPrompt(true); // Open dialog
          updateTableFunction();
        })
        .catch((err) => {
          setError(err?.message);
          setPromptMessage("User registration failed!"); // Set success message
          setOpenPrompt(true); // Open dialog
        })
        .finally(() => {
          setLoading(false);
          formik.resetForm(); // Reset form after submission
        });
    },
  });

  useEffect(() => {
    const areRequiredFieldsFilled =
      formik.values.username && formik.values.password && formik.values.role;

    setDisabled(!areRequiredFieldsFilled);
  }, [formik.values.username, formik.values.password, formik.values.role]);

  const handleModalClose = () => {
    formik.resetForm(); // Reset form values
    handleClose(); // Call the original handleClose
  };

  return (
    <>
      <Modal open={open} onClose={handleModalClose}>
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
            <IconButton onClick={handleModalClose} sx={{ p: 0 }}>
              <CancelIcon />
            </IconButton>
          </Box>
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
                paddingBottom: 5,
              }}
            >
              REGISTER USER
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                name="username"
                label={`Username ${formik?.values?.username ? "" : "*"}`}
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
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

              <SelectRole
                label={`Role ${formik.values.role ? "" : "*"}`}
                name="role"
                width="100%"
                variant="outlined"
                value={formik.values.role}
                onChange={(fieldName, selectedValue) => {
                  formik.setFieldValue("role", selectedValue);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                sx={{
                  width: "100%",
                }}
              />

              <SelectOffice
                label={`Office ${formik.values.officeId ? "" : "*"}`}
                name="officeId"
                width="100%"
                variant="outlined"
                value={formik.values.officeId}
                onChange={(fieldName, selectedValue) => {
                  formik.setFieldValue("officeId", selectedValue);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.officeId && Boolean(formik.errors.officeId)
                }
                helperText={formik.touched.officeId && formik.errors.officeId}
                disabled={formik.values.role.toLowerCase() === "teacher"}
                sx={{
                  width: "100%",
                }}
              />

              <SelectSchool
                label={`School ${formik.values.schoolId ? "" : "*"}`}
                name="schoolId"
                width="100%"
                variant="outlined"
                disabled={formik.values.role.toLowerCase() === "admin"}
                value={formik.values.schoolId}
                onChange={(fieldName, selectedValue) => {
                  formik.setFieldValue(fieldName, selectedValue);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.schoolId && Boolean(formik.errors.schoolId)
                }
                helperText={formik.touched.schoolId && formik.errors.schoolId}
                sx={{
                  width: "100%",
                }}
              />

              <TextField
                name="firstName"
                label="First Name"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
              />

              <TextField
                name="middleName"
                label="Middle Name"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.middleName && Boolean(formik.errors.middleName)
                }
                helperText={
                  formik.touched.middleName && formik.errors.middleName
                }
                fullWidth
              />

              <TextField
                name="lastName"
                label="Last Name"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
              />

              <TextField
                name="birthdate"
                label="Birthdate"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.birthdate && Boolean(formik.errors.birthdate)
                }
                helperText={formik.touched.birthdate && formik.errors.birthdate}
                fullWidth
              />

              <TextField
                name="age"
                label="Age"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.age || ""} // Use empty string if age is null
                onChange={(e) => {
                  const value = e.target.value;
                  // Parse to number if not empty, otherwise set to null
                  formik.setFieldValue("age", value ? Number(value) : null);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />

              <TextField
                name="address"
                label="Address"
                size="small"
                variant="outlined"
                disabled={loading}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              p: 2,
              zIndex: 10,
            }}
          >
            <Button
              disabled={disabled}
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#564ee2",
                color: "white",
                py: 1,
                width: "10vw",
                minWidth: "100px",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#11edd2",
                },
              }}
            >
              Add User
            </Button>
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
            Registration Successful
          </DialogTitle>
          <DialogContent>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {promptMessage}
            </Typography>
          </DialogContent>
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