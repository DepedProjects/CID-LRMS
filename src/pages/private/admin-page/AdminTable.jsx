import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import EditableTable from "../../../components/admin-components/Table/EditableTable";
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import UploadModal from "../../../modals/Materials/UploadMaterialModal";
import UpdateMaterialModal from "../../../modals/Materials/UpdateMaterialModal";

export default function AdminTable({ data, loadingState }) {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

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

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { fileSize, fileType, fileId } = params.row;
        const isDisabled = fileSize || fileType || fileId;
        const isUploaded = !!fileSize;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title={isDisabled ? "File Uploaded" : "Upload File"}>
              <span>
                <IconButton
                  sx={{ color: "#1976d2" }}
                  disabled={isDisabled}
                  onClick={() => handleOpenModal(params.row)}
                >
                  {isDisabled ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <UploadIcon />
                  )}
                </IconButton>
              </span>
            </Tooltip>
            {isUploaded && (
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
    </Box>
  );
}
