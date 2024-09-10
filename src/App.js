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
  // PortalSHS,
  ProjectAndActivities,
  AdminPage,
  Users,
  Logs,
  ActivityLogs,
  AboutUsNav,
  CitizenCharterinNav,
} from "../src/pages";
import { Route, Routes, useLocation } from "react-router-dom";
import MaterialDetails from "../src/components/MaterialDetails";
// import MaterialDetailsSHS from "../src/components/MaterialDetailsSHS";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/Admin" &&
        location.pathname !== "/Users" &&
        location.pathname !== "/Logs" &&
        location.pathname !== "/ActivityLogs" &&
        location.pathname !== "/AboutUsNav" &&
        location.pathname !== "/CitizenCharterinNav" && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AboutUsNav" element={<AboutUsNav />} />
        <Route path="/CitizenCharterinNav" element={<CitizenCharterinNav />} />

        <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Portal" element={<Portal />}>
            <Route path="materials" element={<MaterialDetails />} />
          </Route>
          {/* <Route path="/PortalSHS" element={<PortalSHS />}>
            <Route path="materials" element={<MaterialDetailsSHS />} />
          </Route> */}
          <Route
            path="/ProjectAndActivities"
            element={<ProjectAndActivities />}
          />
          <Route path="/Library" element={<Library />} />
          <Route path="/CitizensCharter" element={<CitizenCharter />} />
          <Route path="/Homepage" element={<Landing />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin", "superadmin"]} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/Admin" element={<AdminPage />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/ActivityLogs" element={<ActivityLogs />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["superadmin"]} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/Users" element={<Users />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/ActivityLogs" element={<ActivityLogs />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
