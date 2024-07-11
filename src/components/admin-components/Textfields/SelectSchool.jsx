import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import iLearnDataService from "../../../services/iLearn-services";

export default function SelectOffice({
  label,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  errorFormik,
  helperText,
  disabled,
  sx,
}) {
  const [schools, setSchools] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define handleGetAll function
  const handleGetAll = () => {
    setLoading(true);
    setError("");

    iLearnDataService
      .getAllSchools()
      .then((response) => {
        setSchools(response); // Make sure offices is always an array
        setSelectedSchool(
          response.find((school) => school.id === value) || null
        );
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    setSelectedSchool(schools?.find((school) => school.id === value) || null);
  }, [schools, value]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newValue) => {
    setAnchorEl(null);
    if (newValue) {
      onChange?.(name, newValue.id || "");
      setSelectedSchool(newValue);
    }
  };

  const handleClear = () => {
    onChange?.(name, "");
    setSelectedSchool(null);
  };

  return (
    <Box>
      <TextField
        label={error ? `${label} - ${error}` : label}
        placeholder={error ? `${placeholder} - ${error}` : placeholder}
        name={name}
        variant="outlined"
        size="small"
        disabled={error || disabled}
        value={selectedSchool && value ? selectedSchool.name : ""}
        onClick={handleClick}
        onBlur={onBlur}
        error={errorFormik}
        helperText={helperText}
        sx={sx}
        InputProps={{
          endAdornment: (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <>
                  {selectedSchool && (
                    <IconButton edge="end" onClick={handleClear}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {!disabled && !error && (
                    <IconButton edge="end" onClick={handleClick}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  )}
                </>
              )}
            </>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        {schools.map((school) => (
          <MenuItem
            sx={{ width: "100%" }}
            key={school.id}
            onClick={() => handleClose(school)}
          >
            {school.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
