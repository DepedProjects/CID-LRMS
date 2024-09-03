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
import { useStateContext } from "../../contexts/ContextProvider";
import { RiUploadCloudFill } from "react-icons/ri";

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
  const { auth } = useStateContext();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  // const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file && rowData.id) {
      setUploading(true);
      setDialogOpen(true);
      try {
        const username = auth?.username;
        const response = await iLearnServices.uploadFile(
          rowData.id,
          file,
          username
        );

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

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleModalClose} sx={{ top: 0 }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: { lg: "95vh", xl: "52vh" },
            width: { lg: "50%", xl: "50%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
            outline: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", background: "#02b00d", padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <RiUploadCloudFill style={{ fontSize: 24, color: "white" }} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Fira Sans",
                  fontSize: 21,
                  color: "white",
                }}
              >
                UPLOAD MATERIAL
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 20,
              cursor: "pointer",
            }}
          >
            <IconButton onClick={handleModalClose}>
              <CancelIcon />
            </IconButton>
          </Box>

          {rowData && (
            <>
              <Box
                sx={{
                  flex: 1, // Allow this Box to grow and fill available space
                  overflowY: "auto", // Enable vertical scrolling if content overflows
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mb: 2, mt: 25 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontFamily: "Fira Sans", fontSize: 14 }}>
                      {rowData.gradeLevel || "undefined"}
                    </Typography>
                    <Typography> - </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
                      {rowData.learningArea || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Fira Sans",
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      {rowData.title || "undefined"}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      fontWeight: "bold",
                      display: "flex",
                      mt: 1,
                    }}
                  >
                    <Typography sx={{ fontFamily: "Fira Sans", fontSize: 14 }}>
                      {rowData.resourceType || "undefined"}
                    </Typography>
                    <Typography sx={{ px: 1, fontSize: 14 }}> | </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {rowData.fileType || "undefined"}
                    </Typography>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      mt: 3,
                      gap: 1,
                    }}
                  >
                    Description{" "}
                    <Typography
                      sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}
                    >
                      {rowData.description || "undefined"}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    Objective{" "}
                    <Typography
                      sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}
                    >
                      {rowData.objective || "undefined"}
                    </Typography>
                  </Typography>
                </Box>

                <Divider sx={{ ml: { lg: -50, xl: -86 }, mt: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans",
                      fontWeight: "bold",
                      fontSize: 18,
                      py: 2,
                    }}
                  >
                    CURRICULUM INFORMATION
                  </Typography>
                </Divider>

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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                    }}
                  >
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
                  Competencies:{" "}
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 1,
                    }}
                  >
                    {rowData.competencies || "undefined"}
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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 2.9,
                    }}
                  >
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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 1.3,
                    }}
                  >
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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 1.3,
                    }}
                  >
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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 0.1,
                    }}
                  >
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
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 1,
                    }}
                  >
                    {rowData.competencies || "undefined"}
                  </Typography>
                </Typography>

                <Divider sx={{ ml: { lg: -51, xl: -87.5 }, mt: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans",
                      fontWeight: "bold",
                      fontSize: 18,
                      py: 2,
                    }}
                  >
                    COPYRIGHT INFORMATION
                  </Typography>
                </Divider>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bold",
                    display: "flex",
                    gap: 4,
                  }}
                >
                  Copyright Owner:
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 1,
                    }}
                  >
                    DepEd Schools Division Office - Imus City
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
                  Conditions of Use:
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 14,
                      ml: 0.4,
                    }}
                  >
                    Reproduce, Use, Copy, Print
                  </Typography>
                </Typography>
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 10,
              p: 2,
            }}
          >
            <input type="file" onChange={handleFileChange} />

            <Button variant="contained" onClick={handleUpload}>
              Upload File
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to upload the file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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

// const modalStyle = {
//   position: "absolute",
//   top: 0,
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };
