import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import InitialPage from "./pages/InitalPage/InitialPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  baseUrl,
  chatRoute,
  authRoute,
  registrationRoute,
} from "./constants/routePath";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={baseUrl} element={<InitialPage />} />
      <Route path={chatRoute} element={<HomePage />} />
      <Route path={registrationRoute} element={<UserRegistrationPage />} />
      <Route path={authRoute} element={<AuthorizationPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
