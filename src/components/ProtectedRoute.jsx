import React from "react";
import  {jwtDecode}  from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children,allowedRoles}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const tokenExpiry = new Date(decoded.exp * 1000);

    if (new Date() < tokenExpiry) {
      if (allowedRoles.includes(decoded.role)) {
        console.log("success")
        return children;
      }else{
        console.log("Bad role.");
        return <Navigate to="/unauthorized" replace />
      }
    } else {
      console.log("Expired token");
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    console.error("Invalid token:", e);
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
