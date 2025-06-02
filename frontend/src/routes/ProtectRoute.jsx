import { Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = localStorage.getItem("user-data");
  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
