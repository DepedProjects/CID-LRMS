import "./App.css";
import Navbar from "../src/components/Navbar";
import { Landing, AboutUs } from "../src/pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar>
      </Navbar>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
