import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";

export default function ViewMaterialsModal({ open, onClose, material }) {
  if (!material) return null; // Do not render anything if no material is selected

  return (
    <Modal open={open} onClose={onClose} sx={{ top: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: { lg: "97vh", xl: "57vh" },
          width: { lg: "50%", xl: "50%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", background: "#02690c" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              padding: 2,
            }}
          >
            <Box sx={{ display: "flex", color: "#dedcdc" }}>
              <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
                {`Grade ${material.gradeLevel}`}
              </Typography>
              <Typography sx={{ mx: 1, justifyContent: "center" }}>
                {" "}
                -{" "}
              </Typography>
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
        </Box>

        <Box
          sx={{
            mt: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: "bold" }}
            >
              Description
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
              {material.description || "undefined"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: "bold" }}
            >
              Objective
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
              {material.objective || "undefined"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ ml: { lg: -53, xl: -88 }, mt: 2 }}>
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
        <Box sx={{ ml: { lg: 2.3, xl: 2.3 } }}>
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
            <Typography
              sx={{
                fontFamily: "Fira Sans Condensed",
                fontSize: 14,
                ml: 1,
              }}
            >
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
            <Typography
              sx={{
                fontFamily: "Fira Sans Condensed",
                fontSize: 14,
                ml: 2.9,
              }}
            >
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
            <Typography
              sx={{
                fontFamily: "Fira Sans Condensed",
                fontSize: 14,
                ml: 1.3,
              }}
            >
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
            <Typography
              sx={{
                fontFamily: "Fira Sans Condensed",
                fontSize: 14,
                ml: 1.3,
              }}
            >
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
            <Typography
              sx={{
                fontFamily: "Fira Sans Condensed",
                fontSize: 14,
                ml: 0.1,
              }}
            >
              {material.intendedUsers || "undefined"}
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
              {material.competencies || "undefined"}
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ mt: 3, mr: 5, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
