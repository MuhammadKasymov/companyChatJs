import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import InitialPage from "./pages/InitalPage/InitialPage";
import NewFriendsPage from "./pages/NewFriendsPage/NewFriendsPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import CreateChatPage from "./pages/CreateChatPage/CreateChatPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  baseUrl,
  chatRoute,
  authRoute,
  registrationRoute,
  friendsSearchRoute,
  friendsRoute,
  newChatRoute,
  profileRoute,
} from "./constants/routePath";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={baseUrl} element={<InitialPage />} />
      <Route path={chatRoute} element={<HomePage />} />
      <Route path={registrationRoute} element={<UserRegistrationPage />} />
      <Route path={authRoute} element={<AuthorizationPage />} />
      <Route path={friendsSearchRoute} element={<NewFriendsPage />} />
      <Route path={friendsRoute} element={<FriendsPage />} />
      <Route path={newChatRoute} element={<CreateChatPage />} />
      <Route path={profileRoute} element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
