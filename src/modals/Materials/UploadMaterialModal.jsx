import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
  // onFileUploaded,
  rowData,
}) {
  const [file, setFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file && rowData.id) {
      setUploading(true);
      setDialogOpen(true);
      try {
        const response = await iLearnServices.uploadFile(rowData.id, file);

        console.log("File uploaded successfully:", response);
        setDialogMessage("Successfully Uploaded");
        setUploading(false);

        // onFileUploaded(rowData.id); // Notify parent component that the file has been uploaded

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
          <Divider sx={{ paddingBottom: 5, paddingTop: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Fira Sans Condensed",
                textAlign: "center",
              }}
            >
              UPLOAD MATERIAL
            </Typography>
          </Divider>

          {rowData && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ pr: 6 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Title:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.title || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Language:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.language || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Resource Type:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.resourceType || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Domain:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.domain || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Description:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.description || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Objective:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.objective || "undefined"}
                    </Typography>
                  </Typography>
                </Box>

                <Box sx={{ pr: 7 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Education Type:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.educationType || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Grade Level:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.gradeLevel || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Learning Area:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.learningArea || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Topic Content:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.topicContent || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Intended Users:{" "}
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.intendedUsers || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    Competencies:
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {rowData.competencies || "undefined"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <input type="file" onChange={handleFileChange} />

            <Button variant="contained" onClick={handleUpload}>
              Upload File
            </Button>
          </Box>
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
          {uploading ? (
            <>
              <DialogContentText>Uploading</DialogContentText>
              <CircularProgress sx={{ color: "grey", mt: 2 }} />
            </>
          ) : (
            <DialogContentText>{dialogMessage}</DialogContentText>
          )}
          <DialogActions sx={{ mt: 2}}>
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
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
