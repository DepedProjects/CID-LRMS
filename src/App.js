import "./App.css";
import Navbar from "../src/components/Navbar";
import {
  Landing,
  LoginPage,
  AboutUs,
  CitizenCharter,
  Library,
  Portal,
  ProjectAndActivities,
} from "../src/pages";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" && <Navbar />}
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
      </Routes>
    </div>
  );
}

export default App;
