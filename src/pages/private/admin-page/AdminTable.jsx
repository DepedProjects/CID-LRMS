import { Box, Button } from "@mui/material";
import React from "react";
import EditableTable from "../../../components/admin-components/Table/EditableTable";
import dayjs from "dayjs";

export default function AdminTable({ data, loadingState }) {
  const columns = [
    {
      field: "actions",
      headerName: " ",
      width: 100,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: "#1976d2",
            fontFamily: "Poppins",
          }}
          variant="contained"
          // color="#1976d2"
          // onClick={() => handleButtonClick(params.row)}
        >
          UPLOAD
        </Button>
      ),
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
    {
      field: "topicContent",
      headerName: "Content/ Topic",
      width: 150,
    },
    { field: "intendedUsers", headerName: "Intended Users", width: 120 },
    { field: "competencies", headerName: "Competencies", width: 150 },
    {
      field: "uploaded_at",
      headerName: "Date Uploaded",
      width: 200,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD hh:mm A"),
    },
    { field: "fileSize", headerName: "File Size", width: 150 },
    { field: "fileType", headerName: "File Type", width: 150 },
    { field: "fileId", headerName: "File Id", width: 150 },
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
