import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn, isAuthenticating } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!isLoggedIn && !isAuthenticating) {
    return <Navigate to="/" state={{ from: location, openLoginModal: true }} />;
  }

  return children;
}

export default ProtectedRoute;
