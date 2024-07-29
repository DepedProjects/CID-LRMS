import React from "react";
import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h6">
        No data available.
      </Typography>
    </Box>
  );
};

export default NoData;