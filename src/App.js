import "./App.css";
import Navbar from "../src/components/Navbar";
import AdminLayout from "./layout/AdminLayout";
import {
  Landing,
  LoginPage,
  AboutUs,
  CitizenCharter,
  Library,
  Portal,
  ProjectAndActivities,
  AdminPage,
  Users,
} from "../src/pages";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/Admin" &&
        location.pathname !== "/Users" && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<RequireAuth allowedRoles={"Teacher"} />}>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Portal" element={<Portal />} />
          <Route
            path="/ProjectAndActivities"
            element={<ProjectAndActivities />}
          />
          <Route path="/Library" element={<Library />} />
          <Route path="/CitizensCharter" element={<CitizenCharter />} />
          <Route path="/Homepage" element={<Landing />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/Admin" element={<AdminPage />} />
            <Route path="/Users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
