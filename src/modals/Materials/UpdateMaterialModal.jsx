import { useState, useEffect } from "react";
import axios from "axios";

import {
  Modal,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Typography,
  DialogContentText,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function UpdateMaterialModal({ open, onClose, material = {} }) {
  const BASE_URL = "http://localhost:5000";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: material?.title || "",
    description: material?.description || "",
    language: material?.language || "",
    resourceType: material?.resourceType || "",
    educationType: material?.educationType || "",
    gradeLevel: material?.gradeLevel || "",
    learningArea: material?.learningArea || "",
    intendedUsers: material?.intendedUsers || "",
    // Add all other fields here
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (material) {
      console.log("Material received in useEffect:", material); // Log the material received
      setFormData({
        title: material.title || "",
        description: material.description || "",
        language: material.language || "",
        resourceType: material.resourceType || "",
        educationType: material.educationType || "",
        gradeLevel: material.gradeLevel || "",
        learningArea: material.learningArea || "",
        intendedUsers: material.intendedUsers || "",
        // Update all other fields here
      });
    }
  }, [material]);

  const handleChange = (e) => {
    console.log(
      "Form field changed:",
      e.target.name,
      "New value:",
      e.target.value
    ); // Log field changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file); // Log the selected file
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    console.log("Form submission event:", e); // Log the form submission event
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form Data to be submitted:", formData); // Log the form data
    console.log("Selected File for upload:", selectedFile); // Log the selected file

    try {
      if (material?.id) {
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (selectedFile) data.append("file", selectedFile);
        setUpdating(true);
        setDialogOpen(true);
        axios
          .put(
            `${BASE_URL}/iLearn/admin/update-material/${material?.id}`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log("Material updated successfully:", response?.data); // Log the 'data' object
            setDialogMessage("Successfully Updated");
            setUpdating(false);
            return response?.data; // Return the data object
            // onClose();
          })
          .catch((error) => {
            console.error("Error updating material:", error);
            setDialogMessage("Upload Failed");
            setUpdating(false);
            setDialogOpen(true);
            throw error;
          });
      }
    } catch (error) {
      console.error("Error updating material:", error); // Log errors
      // Optionally: Show a user-friendly error message
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    onClose(); // Close the modal after the dialog is closed
  };

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ top: 0 }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            outline: "none", // Remove default outline on focus
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ marginTop: -2, marginBottom: 3 }}>
            Update Material
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  size="small"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  size="small"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Language"
                  name="language"
                  size="small"
                  value={formData.language}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Resource Type"
                  name="resourceType"
                  size="small"
                  value={formData.resourceType}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Education Type"
                  name="educationType"
                  size="small"
                  value={formData.educationType}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Grade Level"
                  name="gradeLevel"
                  size="small"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Learning Area"
                  name="learningArea"
                  size="small"
                  value={formData.learningArea}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Intended Users"
                  name="intendedUsers"
                  size="small"
                  value={formData.intendedUsers}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {/* Add other fields as needed */}
              <Grid item xs={12}>
                <Button variant="contained" component="label" fullWidth>
                  Upload File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Selected File"
                  size="small"
                  value={selectedFile ? selectedFile.name : ""}
                  InputProps={{
                    readOnly: true, // Make it read-only
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit" // Change from onClick to type="submit"
                  fullWidth
                >
                  Update Material
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          sx={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            px: 10,
          }}
        >
          {"Upload Status"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            // py: 10,
            // paddingBottom: 5,
          }}
        >
          {updating ? (
            <>
              <DialogContentText>Updating</DialogContentText>
              <CircularProgress sx={{ color: "grey", mt: 2 }} />
            </>
          ) : (
            <DialogContentText>{dialogMessage}</DialogContentText>
          )}
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
