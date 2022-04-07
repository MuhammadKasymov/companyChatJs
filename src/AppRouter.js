import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/chat/:chatId" element={<HomePage />} />
      <Route path="/registration" element={<UserRegistrationPage />} />
      <Route path="/auth" element={<AuthorizationPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
