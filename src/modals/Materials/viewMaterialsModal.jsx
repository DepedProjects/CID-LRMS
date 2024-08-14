import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";

export default function ViewMaterialsModal({ open, onClose, material }) {
  if (!material) return null; // Do not render anything if no material is selected

  return (
    <Modal open={open} onClose={onClose}>
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
          gap: 2, // Add some gap between elements
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {material.title}
        </Typography>
        <Typography variant="body1">
          <strong>Topic Content:</strong> {material.topicContent || "undefined"}
        </Typography>
        <Typography variant="body1">
          <strong>Grade Level:</strong> {material.gradeLevel}
        </Typography>
        <Typography variant="body1">
          <strong>Learning Area:</strong> {material.learningArea}
        </Typography>
        <Typography variant="body1">
          <strong>Published at:</strong>{" "}
          {dayjs(material.uploaded_at).format("YYYY-MM-DD hh:mm A")}
        </Typography>
        {/* Add more material details here as needed */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
