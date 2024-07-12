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
  const [offices, setOffices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetAll = () => {
    setLoading(true);
    setError("");

    iLearnDataService
      .getAllOffices()
      .then((response) => {
        setOffices(response);
        const selected = response.find((office) => office.id === value) || null;
        setSelectedOffice(selected);
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
    const selected = offices.find((office) => office.id === value) || null;
    setSelectedOffice(selected);
  }, [offices, value]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newValue) => {
    setAnchorEl(null);
    if (newValue) {
      onChange(name, newValue.id);
      setSelectedOffice(newValue);
    }
  };

  const handleClear = () => {
    onChange(name, null);
    setSelectedOffice(null);
  };

  return (
    <Box>
      <TextField
        label={errorFormik ? `${label} - ${errorFormik}` : label}
        placeholder={placeholder}
        name={name}
        variant="outlined"
        size="small"
        disabled={disabled}
        value={selectedOffice ? selectedOffice.title : ""}
        onClick={handleClick}
        onBlur={onBlur}
        error={Boolean(errorFormik)}
        helperText={helperText}
        sx={sx}
        InputProps={{
          endAdornment: (
            <>
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <>
                  {selectedOffice && (
                    <IconButton edge="end" onClick={handleClear}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {!disabled && (
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
        {offices.map((office) => (
          <MenuItem key={office.id} onClick={() => handleClose(office)}>
            {office.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
