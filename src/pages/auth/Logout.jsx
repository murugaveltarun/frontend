import React, { useContext , useEffect} from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";



function Logout() {
  
  const { logout } = useContext(AuthContext)
  
  useEffect(() => {
  logout();
  }, [logout]);
  


  return <Navigate to={"/"} />;
}

export default Logout;
