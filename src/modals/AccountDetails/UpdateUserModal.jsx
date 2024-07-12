import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
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
  backgroundColor: "#e9e9e9",
  boxShadow: "3px 2px 20px 3px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 2,
  overflow: "auto",
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

  const formik = useFormik({
    initialValues: {
      username: data?.username || "",
      password: "",
      role: data?.role || "",
      officeId: data?.officeId || null,
      schoolId: data?.schoolId || null,
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      birthdate: data?.birthdate || "",
      age: null,
      address: data?.address || "",
    },
    validationSchema: object().shape({
      username: string().required("Required"),
      password: string().required("Required"),
      role: string().required("Required"),
      officeId: number().nullable(),
      schoolId: number().nullable(),
      firstName: string().nullable(),
      middleName: string().nullable(),
      lastName: string().nullable(),
      birthdate: string().nullable(),
      age: number().nullable(),
      address: string().nullable(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError("");

      const formikValues = {
        ...values,
        ...(values.password ? { newPassword: values.password } : {}), // Only include newPassword if it has a value
        editor: "admin",
      };

      console.log("Submitting values:", formikValues); // Log before sending

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
        password: "",
        role: data?.role || "",
        officeId: data?.officeId || null,
        schoolId: data?.schoolId || null,
        firstName: data?.firstName || "",
        middleName: data?.middleName || "",
        lastName: data?.lastName || "",
        birthdate: data?.birthdate || "",
        age: null,
        address: data?.address || "",
      };
      formik.setValues(initialValues);
    }
  }, [data]);

  useEffect(() => {
    const { username, password, role } = formik.values;
    setDisabled(!(username && password && role));
  }, [formik.values.username, formik.values.password, formik.values.role]);

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
    <Modal open={open} onClose={handleClose}>
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
              backgroundColor: "#564ee2",
              borderRadius: "10px",
              width: "70%",
              p: 2,
              mb: 2,
              ml: 4,
            }}
          >
            <Typography
              sx={{
                ml: 3,
                fontSize: 25,
                fontWeight: "500",
                color: "#fff",
                fontFamily: "Poppins",
              }}
            >
              UPDATE USER
            </Typography>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "8px 8px 15px 3px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              p: 4,
              mx: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                  sx={{ pr: 5 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
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
                  sx={{ pr: 5 }}
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
              </Grid>
              <Grid item xs={6}>
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
                    pr: 5,
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black !important",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
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

              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="birthdate"
                  label="Birthdate"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  disabled={loading}
                  value={formik?.values?.birthdate}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated birthdate: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.birthdate &&
                    Boolean(formik?.errors?.birthdate)
                  }
                  helperText={
                    formik?.touched?.birthdate && formik?.errors?.birthdate
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="age"
                  label="Age"
                  size="small"
                  type="number"
                  disabled={loading}
                  value={formik?.values?.age}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated age: ", e.target.value);
                  }}
                  onBlur={formik?.handleBlur}
                  error={formik?.touched?.age && Boolean(formik?.errors?.age)}
                  helperText={formik?.touched?.age && formik?.errors?.age}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="address"
                  label="Address"
                  size="small"
                  disabled={loading}
                  value={formik?.values?.address}
                  onChange={(e) => {
                    formik.handleChange(e);
                    console.log("Updated address: ", e.target.value);
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
              </Grid>
            </Grid>
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
  );
}
