import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import ilearnDataService from "../../../services/iLearn-services";
import AdminTable from "./AdminTable";
import PromptModal from "../../../modals/PromptModal";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Metadatas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useStateContext();

  const [fileName, setFileName] = useState(""); // Correctly define state for fileName
  const [fileBlob, setFileBlob] = useState(null);
  const [openPromptModal, setOpenPromptModal] = useState(false);
  const [promptMssg, setPromptMssg] = useState([]);

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
      "Are you sure you want to upload metadata from this file?"
    );

    if (confirmed) {
      setFileName(selectedFile.name);
      setFileBlob(selectedFile); // Directly set the File object
    }

    fileInput.value = ""; // Reset file input value
  };

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

  const logFormData = (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };

  useEffect(() => {
    if (fileBlob) {
      const formData = new FormData();
      formData.append("file", fileBlob); // Directly append the File object
      if (auth && auth.username) {
        formData.append("username", auth?.username);
      }

      // Log FormData contents for debugging
      console.log("File to upload:", fileBlob);
      console.log("FormData contents:");
      logFormData(formData);

      setLoading(true);

      ilearnDataService
        .bulkUploadMetadata(formData) // Pass FormData directly
        .then((response) => {
          console.log("Response from bulkUploadMetadata:", response);
          if (response?.message) {
            setOpenPromptModal(true);
            setPromptMssg(response.message);
            handleGetAllMetadata();
          } else {
            setError("Unexpected response format");
          }
        })
        .catch((err) => {
          console.error("Error uploading metadata:", err);
          setError(err?.message || "An unknown error occurred");
        })
        .finally(() => {
          setLoading(false);
          setFileBlob(null); // Clear fileBlob after upload
        });
    }
  }, [fileBlob, auth]);

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
            mt: { lg: 2, xl: 2 },
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
