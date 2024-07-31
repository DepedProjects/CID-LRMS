import React from "react";
import { Box } from "@mui/material";
import NoDataFoundImage from "../../assets/images/NoDataFound.jpg";

const NoData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={NoDataFoundImage}
        alt=""
        style={{ height: "50%", width: "auto" }}
      />
    </Box>
  );
};

export default NoData;
