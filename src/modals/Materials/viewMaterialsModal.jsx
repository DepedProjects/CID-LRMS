import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React from "react";

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
          height: { lg: "70vh", xl: "70vh" }, // Fixed height
          width: { lg: "60%", xl: "50%" }, // Adjustable width
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "auto",
            backgroundColor: "#02690c",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", color: "#dedcdc" }}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
              {`Grade ${material.gradeLevel}`}
            </Typography>
            <Typography sx={{ mx: 1, justifyContent: "center" }}> - </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
              {material.learningArea}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 21,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {material.title}
          </Typography>
          <Box sx={{ display: "flex", color: "#dedcdc" }}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
              {material.resourceType || "undefined"}
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 14, mx: 1 }}>
              -
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
              {material.fileType || "undefined"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            padding: 2,
            flex: 1, // Allow this section to grow and shrink
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: "bold" }}>
              Description
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
              {material.description || "undefined"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, flexDirection: "column", mt: 1 }}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: "bold" }}>
              Objective
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
              {material.objective || "undefined"}
            </Typography>
          </Box>
          
          <Divider sx={{ mt: 2 }}>
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

          <Box sx={{ mt: 2 }}>
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.educationType || "undefined"}
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.competencies || "undefined"}
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.gradeLevel || "undefined"}
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.learningArea || "undefined"}
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.topicContent || "undefined"}
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
              <Typography sx={{ fontFamily: "Fira Sans Condensed", fontSize: 14 }}>
                {material.intendedUsers || "undefined"}
              </Typography>
            </Typography>
          </Box>
        </Box>
        
        <Box
          sx={{
            mt: 2,
            padding: 2,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
