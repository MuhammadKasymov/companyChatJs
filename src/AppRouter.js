import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserRegistrationPage />} />
      <Route path="/chat/:chatId" element={<HomePage />} />
      <Route path="/registration" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
