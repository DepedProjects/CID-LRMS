/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useState } from "react";
import EditableTable from "../../../../components/admin-components/Table/EditableTable";

export default function UserTable({ data, loadingState, setOpenUpdateModal }) {
  const [loading] = useState(false);

  // setSelectedData(selectedUser);

  const columns = [
    // { field: "uid", headerName: "ID", width: 70 },
    {
      field: "message",
      headerName: "Activity",
      width: 700,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 200,
    },
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
        loading={loadingState || loading}
        singleSelect
        setOpenUpdateModal={setOpenUpdateModal}
        height="70vh"
      />
    </Box>
  );
}
