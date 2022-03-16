import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat/:chatId" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
