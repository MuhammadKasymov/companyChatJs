import React from "react";
import { Navigate } from "react-router-dom";

const RedirectWrapper = ({ children, isRedirect, path }) => {
  return (
    <>
      {isRedirect && <Navigate to={path} replace={isRedirect} />}
      {!isRedirect && children}
    </>
  );
};
export default RedirectWrapper;
