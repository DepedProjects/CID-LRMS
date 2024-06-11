import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { useStateContext } from "contexts/ContextProvider";
// import RequireAuth from "./contexts/RequireAuth";
import "./App.css";
// import {
//   // AdminDashboard,
//   // Data,
//   // SchoolDashboard,
//   // Form,
//   // IABIDE,
//   // GradeLevels,
//   // Landing,
//   Login,
//   // MELCs,
//   // Missing,
//   Register,
//   // Offices,
//   // OfficeTypes,
//   // Subjects,
//   // Components,
//   // Unauthorized,
//   // Users,
// } from "./pages";
// import AdminLayout from "./layout/smea/AdminLayout";
// import useRefreshToken from "./contexts/interceptors/useRefreshToken";

function App() {
  // const { auth, sessionExpired } = useStateContext();
  // const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  const multirole = [
    "teacher",
    "admin",
    "sgod - section head",
    "sgod - unit head",
    "sgod - chief",
    "cid - eps",
    "cid - chief",
  ];

  const rolesExceptTeacher = [
    "admin",
    "sgod - section head",
    "sgod - unit head",
    "sgod - chief",
    "cid - eps",
    "cid - chief",
  ];

  // useEffect(() => {
  //   if (!auth) {
  //     refresh();
  //   }
  // }, []);

  function checkRefreshTokenInCookie() {
    const cookies = document.cookie.split("; ");
    // eslint-disable-next-line no-restricted-syntax
    for (const cookie of cookies) {
      // eslint-disable-next-line no-unused-vars
      const [name, value] = cookie.split("=");
      if (name === "refreshToken") {
        return true; // Refresh token exists in the cookie
      }
    }
    return false; // Refresh token does not exist in the cookie
  }

  // useEffect(() => {
  //   const refreshTokenExists = checkRefreshTokenInCookie();
  //   // if (!refreshTokenExists) {
  //   //   console.log(refreshTokenExists);
  //   // }

  //   console.log(refreshTokenExists);
  //   if (sessionExpired) {
  //     alert("Session has expired. Please log in again");
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  // }, [sessionExpired]);

  return (
    <Box>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

        {/* <Route element={<RequireAuth allowedRoles={multirole} />}>
          <Route path="/" element={<Landing />} />
          <Route path="/i-abide" element={<IABIDE />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="/data" element={<Data />} />
            <Route path="/melcs" element={<MELCs />} />
          </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/school-dashboard" element={<SchoolDashboard />} />
              <Route path="/form" element={<Form />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={rolesExceptTeacher} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/gradelevels" element={<GradeLevels />} />
              <Route path="/offices" element={<Offices />} />
              <Route path="/officeTypes" element={<OfficeTypes />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/components" element={<Components />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes> */}
      </Routes>
    </Box>
  );
}

export default App;
