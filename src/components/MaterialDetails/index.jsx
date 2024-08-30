/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import { AiFillDatabase } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import DataNotFound from "../../pages/miscelleaneous/NoData";
import iLearnService from "../../../src/services/iLearn-services";
import ViewMaterialsModal from "../../modals/Materials/viewMaterialsModal";

export default function Materials() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [downloading, setDownloading] = useState(false);
  const { auth } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal open/close
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const location = useLocation();
  const { allMaterials } = location.state || {};

  const materials = allMaterials || [];
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(materials);

  useEffect(() => {
    const searchTerm = search.trim().toLowerCase();

    if (searchTerm) {
      setResult(
        materials.filter((material) =>
          material.title.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setResult(materials); // Display all materials if there's no search term
    }
  }, [search, materials]);

  const handleResetSearch = () => {
    setSearch("");
    setResult(allMaterials); // Reset to show all materials
  };

  const handleDialogOpen = (message) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDownloadMaterial = async (metadataId, title) => {
    const username = auth?.username; // Retrieve the username from auth, if available

    handleDialogOpen("Downloading...");
    setDownloading(true);

    try {
      await iLearnService.downloadFile(metadataId, title, username);
      setDialogMessage("Download completed successfully!");
    } catch (error) {
      console.error("Failed to download material:", error);
      setDialogMessage("Failed to download material. Please try again.");
    } finally {
      setDownloading(false);
      // Automatically close the dialog after a delay to let user see the status
      setTimeout(() => {
        handleDialogClose();
      }, 2000);
    }
  };

  const handleViewDetails = (material) => {
    setSelectedMaterial(material); // Set the selected material details
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedMaterial(null); // Clear the selected material details
  };

  function getPreviewUrl(fileId) {
    try {
      // Google Drive's preview link format
      const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return previewUrl;
    } catch (error) {
      console.error("Error generating preview URL:", error);
      throw error;
    }
  }

  // Function to handle preview action
  const handlePreview = (fileId) => {
    if (!fileId) {
      console.error("No file ID provided for preview.");
      return;
    }

    const previewUrl = getPreviewUrl(fileId);
    window.open(previewUrl, "_blank"); // Open the preview URL in a new browser tab
  };

  return (
    <>
      <Box sx={{ overflow: "auto", height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1.5,
            backgroundColor: "#383838",
          }}
        >
          <AiFillDatabase style={{ fontSize: 21, color: "white" }} />
          <Box sx={{ display: "flex", gap: { lg: 68, xl: 110 } }}>
            <Typography
              variant="h6"
              sx={{
                paddingLeft: 1,
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              Materials
            </Typography>
            <Box
              sx={{
                display: "flex",
                ml: -20,
                width: { lg: "315px", xl: "370px" },
                gap: { lg: 1, xl: 2 },
              }}
            >
              <TextField
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CiSearch style={{ fontSize: 21 }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(evt) => setSearch(evt.target.value)}
                value={search}
                size="small"
                fullWidth
                sx={{
                  padding: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "white",
                    "& fieldset": {
                      borderColor: "#555",
                    },
                    "&:hover fieldset": {
                      borderColor: "#777",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#999",
                    },
                  },
                  color: "white",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: -1 }}>
          {result.length === 0 ? (
            <DataNotFound />
          ) : (
            <List>
              {result.map((material) => {
                const formattedDate = dayjs(material.uploaded_at).format(
                  "YYYY-MM-DD hh:mm A"
                );

                return (
                  <ListItem
                    key={material.id}
                    sx={{ borderBottom: "solid 1px black" }}
                  >
                    <FcDocument style={{ fontSize: 40, paddingRight: 10 }} />
                    <ListItemText>
                      <Typography
                        sx={{
                          fontFamily: "Fira Sans Condensed",
                          fontWeight: "bold",
                          fontSize: 21,
                        }}
                      >
                        {material.title}
                      </Typography>
                      <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                        {material.topicContent}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Fira Sans Condensed",
                          color: "#014963",
                          display: "flex",
                          gap: 3,
                        }}
                      >
                        <Typography>{`Grade ${material.gradeLevel}`}</Typography>
                        <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                          {material.learningArea}
                        </Typography>
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Fira Sans Condensed",
                          fontWeight: "bold",
                          color: "black",
                          display: "flex",
                          gap: 3,
                          fontSize: 11,
                        }}
                      >
                        {`Published at ${formattedDate}`}
                      </Typography>
                    </ListItemText>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        pr: 5,
                      }}
                    >
                      <Button
                        onClick={() => handleViewDetails(material)}
                        sx={{ backgroundColor: "#83dcfc" }}
                      >
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "black",
                            fontFamily: "Fira Sans Condensed",
                            fontWeight: "bold",
                          }}
                        >
                          DETAILS
                        </Typography>
                      </Button>
                      <Button
                        onClick={() => {
                          handleDownloadMaterial(material.id, material.title);
                        }}
                        sx={{
                          backgroundColor: material.fileId
                            ? "#8cfab0"
                            : "#d3d3d3",
                        }}
                        disabled={!material.fileId} // Disable the button if no fileId is present
                      >
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "black",
                            fontFamily: "Fira Sans Condensed",
                            fontWeight: "bold",
                          }}
                        >
                          DOWNLOAD
                        </Typography>
                      </Button>
                      <Button
                        onClick={() => handlePreview(material.fileId)}
                        sx={{
                          backgroundColor: material.fileId
                            ? "#8cfab0"
                            : "#d3d3d3",
                        }}
                        disabled={!material.fileId} // Disable the button if no fileId is present
                      >
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "black",
                            fontFamily: "Fira Sans Condensed",
                            fontWeight: "bold",
                          }}
                        >
                          PREVIEW
                        </Typography>
                      </Button>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          sx={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            px: 10,
          }}
        >
          {"Download Status"}
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
          {downloading ? (
            <>
              <DialogContentText>Downloading</DialogContentText>
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

      <ViewMaterialsModal
        open={modalOpen}
        onClose={handleCloseModal}
        material={selectedMaterial} // Pass the selected material details to the modal
      />
    </>
  );
}
