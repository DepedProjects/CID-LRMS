import { autocompleteClasses, Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import passwordChangePrompt from "../assets/images/Frame 14.png";

export default function PasswordChangeModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} sx={{ top: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: "60vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          outline: "none", // Remove default outline on focus
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            <img
              src={passwordChangePrompt}
              alt="passwordChangePrompt"
              style={{ width: "300px", height: "auto" }}
            />
            
          </Box>

          <Typography>
          <Typography>CHANGE PASSWORD</Typography>
            Changing your password regularly is crucial for maintaining the
            security of your online accounts. It helps protect your personal and
            sensitive information from unauthorized access and potential cyber
            threats. By updating your password, you reduce the risk of breaches
            and ensure that your accounts remain secure, safeguarding your
            digital identity and privacy.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
