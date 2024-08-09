import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import iLearnServices from "../../services/iLearn-services";
import CancelIcon from "@mui/icons-material/Close";

export default function UploadMaterialModal({
  open,
  handleClose,
  onFileUploaded,
  rowData,
}) {
  const [file, setFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  // const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file && rowData.id) {
      setUploading(true);
      setDialogOpen(true);
      try {
        const response = await iLearnServices.uploadFile(
          rowData.id,
          file
          // (progressEvent) => {
          //   const percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setProgress(percentCompleted);
          // }
        );

        console.log("File uploaded successfully:", response);
        setDialogMessage("Successfully Uploaded");
        setUploading(false);

        onFileUploaded(rowData.id); // Notify parent component that the file has been uploaded

        setDialogOpen(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        setDialogMessage("Upload Failed");
        setUploading(false);
        setDialogOpen(true);
      }
    } else {
      console.log("Please select a file.");
      setDialogMessage("Please Select a file");
      setDialogOpen(true);
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    handleClose(); // Close the modal after the dialog is closed
  };

  return (
    <>
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={{ ...modalStyle }}>
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
          <Typography variant="h6">Upload Material</Typography>
          {rowData && (
            <>
              <Typography variant="body1">Title: {rowData.title}</Typography>
              <Typography variant="body1">
                Language: {rowData.language}
              </Typography>
              <Typography variant="body1">
                Resource Type: {rowData.resourceType}
              </Typography>
              <Typography variant="body1">Domain: {rowData.domain}</Typography>
              <Typography variant="body1">
                Description: {rowData.description}
              </Typography>
              <Typography variant="body1">
                Objective: {rowData.objective}
              </Typography>
              <Typography variant="body1">
                Education Type: {rowData.educationType}
              </Typography>
              <Typography variant="body1">
                Grade Level: {rowData.gradeLevel}
              </Typography>
              <Typography variant="body1">
                Learning Area: {rowData.learningArea}
              </Typography>
              <Typography variant="body1">
                Topic Content: {rowData.topicContent}
              </Typography>
              <Typography variant="body1">
                Intended Users: {rowData.intendedUsers}
              </Typography>
              <Typography variant="body1">
                Competencies: {rowData.competencies}
              </Typography>
            </>
          )}
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} sx={{ marginTop: 2 }}>
            Upload File
          </Button>
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
            py: 10,
            paddingBottom: 5,
          }}
        >
          {uploading ? (
            <>
              <DialogContentText>Uploading</DialogContentText>
              <CircularProgress sx={{ color: "grey", mt: 2 }} />
            </>
          ) : (
            <DialogContentText>{dialogMessage}</DialogContentText>
          )}
          <DialogActions sx={{ m: 5 }}>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
