import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  // CircularProgress,
  Divider,
  // Tooltip,
  Typography,
} from "@mui/material";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
import { useStateContext } from "../../../contexts/ContextProvider";
import ilearnService from "../../../services/account-service";
import dayjs from "dayjs";
import AdminTable from "./AdminTable";
// import DatePickerComponent from "../../../components/Textfields/DatePicker";
// import StatBox from "../../../components/Statbox";

export default function Feedbacks() {
  const { auth } = useStateContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // const handleGetAll = () => {
  //   setLoading(true);
  //   setError("");

  //   ilearnService
  //     .getFilteredFeedbacksByDate({
  //       startDate: start ? dayjs(start).format("YYYY-MM-DD") : null,
  //       endDate: end ? dayjs(end).format("YYYY-MM-DD") : null,
  //       officeId: auth.officeId,
  //     })
  //     .then((response) => {
  //       const newData = response.map((item) => ({
  //         ...item,
  //         created_at: dayjs(item.created_at),
  //         updated_at: dayjs(item.updated_at),
  //       }));

  //       setData(newData);
  //     })
  //     .catch((err) => {
  //       setError(err?.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const handleExportReport = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await ilearnService.exportFilteredFeedbacks({
        startDate: start ? dayjs(start).format("YYYY-MM-DD") : null,
        endDate: end ? dayjs(end).format("YYYY-MM-DD") : null,
        officeId: auth.officeId,
      });

      const datestamp = dayjs().format("YYYYMMDD");

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CSM_Report_${datestamp}.xlsx`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDateFilter = () => {
    setStart(null);
    setEnd(null);
  };

  // useEffect(() => {
  //   handleGetAll();
  // }, [start, end]);

  return (
    <Box
      sx={{
        p: "20px",
        backgroundColor: "black",
      }}
    >
      <Box>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {auth?.role === "admin"
            ? "Welcome to the SDOIC - Learning Resource Data Management System!"
            : "Welcome to the SDOIC-CSM Data and Report Generation System!"}
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "15px",

            color: "white",
            mt: 2,
            mb: 2,
          }}
        >
          {auth?.role === "admin" ? "Administrator" : auth?.officeName}
        </Typography>
      </Box>
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
              fontWeight: "bold",
            }}
          >
            Learning Resources Data
          </Typography>
        </Divider>

        <Box
          sx={{
            width: "98%",
            mt: 5,
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <DatePickerComponent
            label="Start"
            value={start}
            onChange={(newValue) => setStart(dayjs(newValue))}
          />
          <Typography sx={{ mx: 2, fontFamily: "Poppins" }}> To </Typography>
          <DatePickerComponent
            label="End"
            value={end}
            onChange={(newValue) => setEnd(dayjs(newValue))}
          /> */}
          <Button
            onClick={handleResetDateFilter}
            sx={{
              fontSize: "0.6rem",
              padding: "5px 10px",
              backgroundColor: "#1c1948",
              color: "white",
              ml: "1rem",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
              "&:hover": {
                color: "black",
                backgroundColor: "#11edd2",
              },
            }}
          >
            Reset date filter
          </Button>
        </Box>
        <Box>
          {error}
          <AdminTable data={data} loadingState={loading} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box>
            <Button
              onClick={handleExportReport}
              sx={{
                fontFamily: "Poppins",
                backgroundColor: "#1c1948",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#11edd2",
                },
              }}
            >
              Upload Metadata
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
