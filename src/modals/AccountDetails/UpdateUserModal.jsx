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
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gender, setGender] = useState(""); // State for gender toggle

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
      status: data?.status ||"",
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
      status: string().nullable(), // Validation for status string
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError("");

      const formikValues = {
        ...values,
        newPassword: values.password ? values.password : undefined, // Only include newPassword if it has a value
        status: values.status, // Include status
        editor: "superadmin",
      };

      console.log("Submitting values:", formikValues); // Log before sending
      console.log("User Status: ", values.status); // Log user status// Log before sending

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
        status: data?.status || "" , // Add status
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
    console.log("Updated Formik Values: ", formik.values);
  }, [formik.values]);

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
                  // paddingBottom: 5,
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
                  // sx={{ pr: 5 }}
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
                  // sx={{ pr: 5 }}
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
                    sx: {
                      borderRadius: "7px",
                    },
                  }}
                />
              </Box>
              <Box>
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
                    width: "100%",
                    pr: 1,
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black !important",
                      },
                    },
                  }}
                />
              </Box>
              <Box>
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
              </Box>

              <Box>
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
              </Box>
              <Box>
                <TextField
                  name="email"
                  label="Email"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.email}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated Email: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.email && Boolean(formik?.errors?.email)
                  }
                  helperText={formik?.touched?.email && formik?.errors?.email}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <TextField
                  name="firstName"
                  label="First Name"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.firstName}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated firstName: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.firstName &&
                    Boolean(formik?.errors?.firstName)
                  }
                  helperText={
                    formik?.touched?.firstName && formik?.errors?.firstName
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <TextField
                  name="middleName"
                  label="Middle Name"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.middleName}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated middleName: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.middleName &&
                    Boolean(formik?.errors?.middleName)
                  }
                  helperText={
                    formik?.touched?.middleName && formik?.errors?.middleName
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <TextField
                  name="lastName"
                  label="Last Name"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.lastName}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated lastName: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.lastName &&
                    Boolean(formik?.errors?.lastName)
                  }
                  helperText={
                    formik?.touched?.lastName && formik?.errors?.lastName
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box sx={{ display: "flex", gap: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>Gender:</Typography>
                  <RadioGroup
                    sx={{ px: { lg: 5, xl: 5 } }}
                    row
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Prefer not to say"
                      control={<Radio />}
                      label="Prefer not to say"
                    />
                  </RadioGroup>
                </Box>
                <Box>
                  <TextField
                    name="age"
                    label="Age"
                    size="small"
                    type="number"
                    disabled={loading}
                    value={formik?.values?.age}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik?.handleBlur}
                    error={formik?.touched?.age && Boolean(formik?.errors?.age)}
                    helperText={formik?.touched?.age && formik?.errors?.age}
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>

              <Box>
                <TextField
                  name="address"
                  label="Address"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.address}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.address && Boolean(formik?.errors?.address)
                  }
                  helperText={
                    formik?.touched?.address && formik?.errors?.address
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Status:</Typography>
                  <Typography sx={{ ml: 1 }}>{formik.values.status}</Typography>
                  <Switch
                    checked={formik?.values?.status === "enabled"}
                    onChange={(e) => {
                      const newStatus = e.target.checked
                        ? "enabled"
                        : "disabled";
                      formik.setFieldValue("status", newStatus);
                      console.log("User Status: ", newStatus);
                    }}
                  />
                </Box>
              </Box>
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
                fontFamily: "Poppins",
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
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
