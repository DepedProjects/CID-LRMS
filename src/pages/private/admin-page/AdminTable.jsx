import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditableTable from "../../../components/admin-components/Table/EditableTable";
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import UploadModal from "../../../modals/Materials/UploadMaterialModal";
import UpdateMaterialModal from "../../../modals/Materials/UpdateMaterialModal";
import ilearnDataService from "../../../services/iLearn-services"; // this is my path to my axios delete function
import { useStateContext } from "../../../contexts/ContextProvider";

export default function AdminTable({ data, loadingState }) {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { auth } = useStateContext();

  const handleOpenModal = (rowData, isUpdate = false) => {
    console.log("Opening modal with data:", rowData, "isUpdate:", isUpdate);
    setSelectedRowData(rowData);
    if (isUpdate) {
      setOpenUpdateModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenUpdateModal(false);
    setSelectedRowData(null);
  };

  const handleDeleteClick = (rowData) => {
    const { id, title } = rowData; // Use `id` as per the row data provided

    ilearnDataService
      .deleteFile(id, auth.username) // Pass `id` instead of `metadataId`
      .then((response) => {
        setSuccessMessage(`${title}`);
        setOpenSuccessDialog(true);
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleViewClick = (metadataId) => {
    ilearnDataService
      .viewFile(metadataId)
      .then((response) => {
        const { viewUrl } = response; // Extract the view URL from the response
        window.open(viewUrl, "_blank"); // Open the view URL in a new tab
      })
      .catch((error) => {
        console.error("Error fetching file details:", error);
      });
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 300, // Adjusted width to accommodate new icons
      renderCell: (params) => {
        const { fileSize, fileId, folderId, id } = params.row;
        const isUploaded = !!fileSize;

        console.log("Params Row Data:", params.row); // Debugging log
        console.log("File ID:", fileId); // Ensure the correct ID is used

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title={isUploaded ? "File Uploaded" : "Upload File"}>
              <span>
                <IconButton
                  sx={{ color: "#1976d2" }}
                  disabled={isUploaded}
                  onClick={() => handleOpenModal(params.row)}
                >
                  {isUploaded ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <UploadIcon />
                  )}
                </IconButton>
              </span>
            </Tooltip>
            {isUploaded && (
              <>
                <Tooltip title="Re-upload File">
                  <span>
                    <IconButton
                      sx={{ color: "#ff5722" }}
                      onClick={() => handleOpenModal(params.row, true)}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="View File">
                  <span>
                    <IconButton
                      sx={{ color: "#1976d2" }}
                      onClick={() => handleViewClick(id)} // Use metadataId here
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Delete File">
                  <span>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDeleteClick(params.row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )}
          </Box>
        );
      },
    },
    { field: "title", headerName: "Title", width: 250 },
    { field: "language", headerName: "Language", width: 150 },
    { field: "resourceType", headerName: "Resource Type", width: 200 },
    { field: "domain", headerName: "Domain", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "objective", headerName: "Objective", width: 300 },
    { field: "educationType", headerName: "Education Type", width: 150 },
    { field: "gradeLevel", headerName: "Grade Level", width: 150 },
    { field: "learningArea", headerName: "Learning Area", width: 150 },
    { field: "topicContent", headerName: "Content/ Topic", width: 150 },
    { field: "intendedUsers", headerName: "Intended Users", width: 120 },
    { field: "competencies", headerName: "Competencies", width: 150 },
    {
      field: "uploaded_at",
      headerName: "Date Uploaded",
      width: 200,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD hh:mm A"),
    },
    {
      field: "updated_at",
      headerName: "Date Updated",
      width: 200,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD hh:mm A"),
    },
    { field: "fileSize", headerName: "File Size", width: 150 },
    { field: "fileType", headerName: "File Type", width: 150 },
    { field: "fileId", headerName: "File Id", width: 150 },
    { field: "folderId", headerName: "Folder Id", width: 150 },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          color: "black !important",
          backgroundColor: "#FE9496 !important",
          borderBottom: "none",
        },
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#fff",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "lightgray",
        },
        "& .MuiCheckbox-root": {
          color: "black !important",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: "black !important",
        },
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
          {
            display: "none",
          },
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#53FDFD",
        },
        marginTop: "5px",
      }}
    >
      <UploadModal
        open={openModal}
        handleClose={handleCloseModal}
        rowData={selectedRowData}
      />
      <UpdateMaterialModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        material={selectedRowData}
      />
      <EditableTable
        data={data}
        columns={columns}
        loading={loadingState}
        height="80vh"
        showSearch
      />

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <DialogTitle sx={{ fontFamily: "Fira Sans Condensed" }}>
            Material Successfully Deleted!
          </DialogTitle>
          <DialogContent>
            <Typography>{successMessage}</Typography>
          </DialogContent>
        </Box>

        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
