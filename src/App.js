import "./App.css";
import Navbar from "../src/components/Navbar";
import {
  Landing,
  AboutUs,
  CitizenCharter,
  Library,
  Portal,
  ProjectAndActivities,
} from "../src/pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Portal" element={<Portal />} />
        <Route
          path="/ProjectAndActivities"
          element={<ProjectAndActivities />}
        />
        <Route path="/Library" element={<Library />} />
        <Route path="/Citizen's Charter" element={<CitizenCharter />} />
      </Routes>
    </div>
  );
}

export default App;
