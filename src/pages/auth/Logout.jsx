import React, { useContext , useEffect} from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";
import toast from "react-hot-toast";



function Logout() {
  
  const { logout } = useContext(AuthContext)
  
  useEffect(() => {
  logout();
  toast.success("Logged out successfully");
  }, [logout]);
  


  return <Navigate to={"/"} />;
}

export default Logout;
