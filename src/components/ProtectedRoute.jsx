import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // navigating to their dashboard
    return (
      <Navigate
        to={role === "ROLE_ADMIN" ? "/admin-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
