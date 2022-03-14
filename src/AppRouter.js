import React from "react";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
