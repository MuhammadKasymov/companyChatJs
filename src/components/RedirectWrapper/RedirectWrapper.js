import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectWrapper = ({ children, isRedirect, path, state }) => {
  const navigate = useNavigate();

  useEffect(() => {
    isRedirect && state && navigate(path, { state: state });
    isRedirect && !state && navigate(path);
  });

  return <>{children}</>;
};
export default RedirectWrapper;
