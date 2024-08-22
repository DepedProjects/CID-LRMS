import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import accountService from "../../services/iLearn-services";
import ActivityLogsTable from "./ActivityLogsTable";

export default function ActivityLogs() {
  const [actLogsData, setActLogsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetAll = () => {
    setLoading(true);
    setError("");

    accountService
      .getAllActivity()
      .then((e) => {
        setActLogsData(e);
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <Box
      sx={{
        p: "20px",
        backgroundColor: "black",
        fontFamily: "Poppins",
      }}
    >
      <Box
        borderRadius="10px"
        boxShadow="3px 2px 15px 3px rgba(100, 100, 100, 0.8)"
        p="1rem"
        sx={{ backgroundColor: "rgba(240, 240, 240, 1)" }}
      >
        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "16px",
              fontFamily: "Fira Sans",
              fontWeight: "bold",
            }}
          >
            Activity Logs
          </Typography>
        </Divider>
        <Box>
          {error}
          <ActivityLogsTable
            data={actLogsData}
            loadingState={loading}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        ></Box>
      </Box>
    </Box>
  );
}
