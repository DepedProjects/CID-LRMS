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
  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      address: "",
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
      address: string().nullable(),
    }),
    onSubmit: () => {
      setLoading(true);
      setError("");

      const { role, ...otherValues } = formik.values;
      const lowerCasedRole = role.toLowerCase();

      accountService
        .register({ role: lowerCasedRole, ...otherValues })
        .then(() => {
          updateTableFunction();
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
    if (formik?.values?.role === "admin") {
      const { officeId, ...otherValues } = formik.values;

      const areAllValuesFilled = Object.values(otherValues).every(
        (value) => !!value
      );

      setDisabled(areAllValuesFilled);

      formik.values.officeId = null;
    } else {
      const areAllValuesFilled = Object.values(formik.values).every(
        (value) => !!value
      );

      setDisabled(areAllValuesFilled);
    }
  }, [formik.values]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
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
          {error}
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
              onBlur={formik.handleBLur}
              error={formik.touched.username && Boolean(formik.errors.username)}
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
              onBlur={formik.handleBLur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onKeyPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityIcon size={18} sx={{ color: "#606468" }} />
                    ) : (
                      <VisibilityOffIcon size={18} sx={{ color: "#606468" }} />
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
              onBlur={formik.handleBLur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              sx={{
                width: "100%",

                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                },
              }}
            />

            <SelectOffice
              label={`Office ${formik.values.officeId ? "" : "*"}`}
              name="officeId"
              width="10%"
              variant="outlined"
              disabled={formik.values.role.toLowerCase() === "teacher"}
              value={formik.values.officeId}
              onChange={(fieldName, selectedValue) => {
                formik.setFieldValue("officeId", selectedValue);
              }}
              onBlur={formik.handleBLur}
              error={formik.touched.officeId && Boolean(formik.errors.officeId)}
              helperText={formik.touched.officeId && formik.errors.officeId}
              sx={{
                width: "100%",

                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                },
              }}
            />

            <SelectSchool
              label={`School ${formik.values.schoolId ? "" : "*"}`}
              name="officeId"
              width="100%"
              disabled={formik.values.role.toLowerCase() === "admin"}
              value={formik.values.schoolId}
              onChange={(fieldName, selectedValue) => {
                formik.setFieldValue("schoolId", selectedValue);
              }}
              onBlur={formik.handleBLur}
              error={formik.touched.schoolId && Boolean(formik.errors.schoolId)}
              helperText={formik.touched.schoolId && formik.errors.schoolId}
              sx={{
                width: "100%",

                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                },
              }}
            />

            <TextField
              name="firstName"
              label={`First Name ${formik?.values?.firstName ? "" : "*"}`}
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              name="middleName"
              label={`Middle Name ${formik?.values?.middleName ? "" : "*"}`}
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={
                formik.touched.middleName && Boolean(formik.errors.middleName)
              }
              helperText={formik.touched.middleName && formik.errors.middleName}
            />

            <TextField
              name="lastName"
              label={`Last Name ${formik?.values?.lastName ? "" : "*"}`}
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              name="age"
              label={`Age ${formik?.values?.age ? "" : "*"}`}
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />

            <TextField
              name="address"
              label={`Address ${formik?.values?.address ? "" : "*"}`}
              size="small"
              variant="outlined"
              multiline
              disabled={loading}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
            disabled={!disabled}
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
  );
}
