import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
