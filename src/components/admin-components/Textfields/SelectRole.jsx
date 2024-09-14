import React, { useEffect, useState } from "react";
import {
  MenuItem,
  IconButton,
  Box,
  TextField,
  Menu,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SelectRole({
  label,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  errorFormik,
  helperText,
  error,
  disable,
  // disable,
  sx,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 1, type: "Teacher" },
    { id: 2, type: "Admin" },
    // { id: 2, type: "Super Admin" },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [value]);

  const lowercaseValue = value ? value?.toLowerCase() : "";

  const [selectedRole, setSelectedRole] = useState(
    roles?.find((role) => role.type.toLowerCase() === lowercaseValue) || null
  );

  useEffect(() => {
    setSelectedRole(
      roles?.find((role) => role.type.toLowerCase() === lowercaseValue) || null
    );
  }, [value]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newValue) => {
    setAnchorEl(null);
    if (newValue) {
      onChange?.(name, newValue.type.toLowerCase() || "");
      setSelectedRole(newValue);
    }
  };

  const handleClear = () => {
    onChange?.(name, ""); // Clear the value
    setSelectedRole(null);
  };

  return (
    <Box>
      <TextField
        label={
          // eslint-disable-next-line no-nested-ternary
          error
            ? `${label || placeholder} - ${error}`
            : disable
            ? `${label || placeholder} - Not Applicable`
            : label
        }
        placeholder={
          // eslint-disable-next-line no-nested-ternary
          error
            ? `${placeholder} - ${error}`
            : disable
            ? `${placeholder} - Not Applicable`
            : placeholder
        }
        name={name}
        variant="outlined"
        size="small"
        disabled={error || disable}
        value={selectedRole && value ? selectedRole.type : ""}
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
                  {selectedRole && (
                    <IconButton edge="end" onClick={handleClear}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {!disable && !error && (
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
        {roles.map((role) => (
          <MenuItem
            sx={{ width: "100%" }}
            key={role.id}
            onClick={() => handleClose(role)}
          >
            {role.type}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
