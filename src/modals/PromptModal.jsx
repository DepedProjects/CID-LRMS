import * as React from "react";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: "3px 2px 20px 3px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  p: 4,
};

export default function PromptModal({ open, handleClose, prompt }) {
  const handleClick = () => {
    handleClose();
  };

  let promptMssg;
  let isAnArray = false;

  if (prompt) {
    if (typeof prompt === "string") {
      promptMssg = prompt;
    } else if (Array.isArray(prompt)) {
      isAnArray = true;
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Box sx={style}>
        <Box sx={{ mb: 4 }}>
          {isAnArray
            ? prompt.map((e, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={index} style={{ fontSize: "17px" }}>
                  {e.message}
                </p>
              ))
            : promptMssg}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={() => handleClick()}>Ok</Button>
        </Box>
      </Box>
    </Modal>
  );
}
