import { Box } from "@mui/material";
import React from "react";
import FooterHeaderbg from "../../assets/images/kagawaran.png";

export default function Footer() {
  return (
    <Box sx={{ mt: 20, backgroundColor: "black", padding: 20 }}>
      <Box>
        <img src={FooterHeaderbg} alt="" style={{ width: "5%" }}></img>
        <img src={FooterHeaderbg} alt="" style={{ width: "5%" }}></img>
        <img src={FooterHeaderbg} alt="" style={{ width: "5%" }}></img>
      </Box>
    </Box>
  );
}
