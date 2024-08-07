import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import accountService from "../../../../services/account-service";
import LogsTable from "./LogsTable";

export default function Logs() {
  const [logsData, setLogsData] = useState([]);
  const [, setSelectedUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetAll = () => {
    setLoading(true);
    setError("");

    accountService
      .getAllLogs()
      .then((e) => {
        setLogsData(e);
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
            User Logs
          </Typography>
        </Divider>
        <Box>
          {error}
          <LogsTable
            data={logsData}
            setSelectedData={setSelectedUser}
            loadingState={loading}
            // updateTableFunction={() => {
            //   handleGetAll();
            //   setSuccessMessage("User Deleted Successfully!!");
            //   setOpenSuccess(true);
            // }}
            // setOpenUpdateModal={setOpenUpdateModal}
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
