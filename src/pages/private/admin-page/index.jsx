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
// import { useStateContext } from "../../../contexts/ContextProvider";
// import ilearnService from "../../../services/account-service";
import ilearnDataService from "../../../services/iLearn-services";
// import dayjs from "dayjs";
import AdminTable from "./AdminTable";
import PromptModal from "../../../modals/PromptModal";
// import DatePickerComponent from "../../../components/Textfields/DatePicker";
// import StatBox from "../../../components/Statbox";

export default function Metadatas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [start, setStart] = useState(null);
  // const [end, setEnd] = useState(null);

  const [setFileName] = useState("");
  const [fileBlob, setFileBlob] = useState(null);
  const [openPromptModal, setOpenPromptModal] = useState(false);
  const [promptMssg, setPromptMssg] = useState([]);

  const handleGetAllMetadata = () => {
    setLoading(true);
    setError(" ");

    ilearnDataService
      .getAllMetadata()
      .then((e) => {
        setData(e);
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAllMetadata();
  }, []);

  const handleMetadataUpload = (event) => {
    const fileInput = event.target;

    const files = fileInput.files;

    if (files.length === 0) {
      return;
    }

    const selectedFile = files[0];

    const isExcelFile = /\.(xlsx|xls)$/i.test(selectedFile.name);

    if (!isExcelFile) {
      alert("Please select an Excel file (.xlsx or .xls).");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to upload melcs from this file?"
    );

    // Proceed only if the user confirms
    if (confirmed) {
      setFileName(selectedFile.name);

      // Read the file content as a Blob
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: selectedFile.type });

        setFileBlob(blob);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
    fileInput.value = "";
  };

  useEffect(() => {
    if (fileBlob) {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", fileBlob);

      ilearnDataService
        .bulkUploadMetadata(formData)
        .then((response) => {
          if (response?.message) {
            setOpenPromptModal(true);
            setPromptMssg(response.message);
            handleGetAllMetadata();
            console.log(response.message);
          } else {
            setError("Unexpected response format");
          }
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
          setFileBlob(null);
        });
    }
  }, [fileBlob]);

  // const handleResetDateFilter = () => {
  //   setStart(null);
  //   setEnd(null);
  // };

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
      <PromptModal
        handleClose={() => setOpenPromptModal(false)}
        open={openPromptModal}
        prompt={promptMssg}
      />
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
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleMetadataUpload}
              style={{ display: "none" }}
            />
            <Button
              component="span"
              sx={{
                fontFamily: "Fira Sans",
                backgroundColor: "#1c1948",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "5px 10px",
                borderRadius: "5px",
                mb: "1rem",
                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#11edd2",
                },
              }}
            >
              Upload Metadata
            </Button>
          </label>
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
        ></Box>
      </Box>
    </Box>
  );
}
