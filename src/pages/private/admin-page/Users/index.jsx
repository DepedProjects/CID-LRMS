import React, { useEffect, useState } from "react";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Button, Divider, Typography } from "@mui/material";
import accountService from "../../../../services/account-service";
import AddUserModal from "../../../../modals/AccountDetails/AddUserModal";
// import UpdateUserModal from "modals/users/UpdateUserModal";
// import SnackbarComponent from "components/Snackbar";
import UserTable from "./UserTable";
import UpdateUserModal from "../../../../modals/AccountDetails/UpdateUserModal";
import { useStateContext } from "../../../../contexts/ContextProvider";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { auth } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpen = (type) => {
    if (type === "add") {
      setOpenAddModal(true);
    } else if (type === "update") {
      setOpenUpdateModal(true);
    }
  };


  const handleGetAll = () => {
    setLoading(true);
    setError("");

    accountService
      .getAllUsers()
      .then((e) => {
        setUsersData(e);
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

  useEffect(() => {
    if (!selectedUser?.length) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedUser]);

  return (
    <Box
      sx={{
        p: "20px",
        backgroundColor: "black",
        fontFamily: "Poppins",
      }}
    >
      <AddUserModal
        handleClose={() => setOpenAddModal(false)}
        open={openAddModal}
        updateTableFunction={() => {
          handleGetAll();
          setOpenAddModal(false);
          setSuccessMessage("User Added Successfully!!");
          setOpenSuccess(true);
        }}
      />
      <UpdateUserModal
        handleClose={() => setOpenUpdateModal(false)}
        open={openUpdateModal}
        data={selectedUser && selectedUser[0]}
        updateTableFunction={() => {
          handleGetAll();
          setOpenUpdateModal(false);
          setSuccessMessage("User Updated Successfully!!");
          setOpenSuccess(true);
        }}
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
              fontFamily: "Fira Sans",
              fontWeight: "bold",
            }}
          >
            Users
          </Typography>
        </Divider>
        <Box>
          {error}
          <UserTable
            data={usersData}
            setSelectedData={setSelectedUser}
            loadingState={loading}
            updateTableFunction={() => {
              handleGetAll();
              setSuccessMessage("User Deleted Successfully!!");
              setOpenSuccess(true);
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          {auth.role === "superadmin" && (
            <Box>
              <Button
                onClick={() => handleOpen("add")}
                sx={{
                  fontFamily: "Poppins",
                  backgroundColor: "#1c1948",
                  color: "white",
                  width: "10rem",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#11edd2",
                  },
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
                }}
              >
                Add
              </Button>
            </Box>
          )}

          {auth.role === "superadmin" && (
            <Box>
              <Button
                onClick={() => handleOpen("update")}
                disabled={disabled}
                sx={{
                  width: "10rem",
                  fontFamily: "Poppins",
                  backgroundColor: "#564ee2",
                  color: "white",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#11edd2",
                  },
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
                }}
              >
                Update
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {/* <SnackbarComponent
        open={openSuccess}
        onClose={handleCloseSuccess}
        severity="success"
        message={successMessage}
      /> */}
    </Box>
  );
}
