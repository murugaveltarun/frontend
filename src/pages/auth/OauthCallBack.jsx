import "../../components/model/Loading";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicToast } from "../../components/toast/PublicToast";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/model/Loading";

function OauthCallBack() {
  const { login } = useContext(AuthContext);
  const { token } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        login(token);
        publicToast.success("User Verified! Navigating to dashboard...");
        const decode = jwtDecode(token);
        console.log()
        setTimeout(() => {
          if (decode.role === "ROLE_USER") {
            localStorage.setItem("role", "ROLE_USER");
            navigate("/user-dashboard");
          } else if (decode.role === "ROLE_ADMIN") {
            localStorage.setItem("role", "ROLE_ADMIN");
            navigate("/admin-dashboard");
          } else {
            navigate("/unauthorized");
          }
        }, 100);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            publicToast.error("Login failed. Try again.");
          } else {
            publicToast.error("Something went wrong. Try again later.");
          }
        } else if (!navigator.onLine) {
          publicToast.error("Check your internet connection.");
        } else if (error.request) {
          publicToast.error("Server Offline. Try again later.");
        } else {
          publicToast.error("Something went wrong. Try again later.");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Loading />{" "}
    </div>
  );
}

export default OauthCallBack;
