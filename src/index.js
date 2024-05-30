import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
// import { ContextProvider } from "./contexts/ContextProvider";
// import "./contexts/interceptors/axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ContextProvider> */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      {/* </ContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
