import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export async function checkTokenOrRefresh(token, navigate) {
  let newAccessToken = null;
  if (token == null) {
    navigate("/login");
    return null;
  }
  if (jwtDecode(token).exp * 1000 < Date.now()) {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/refresh", {}, { withCredentials: true });
      console.log(response);
      if (response.data.status == 200) {
        newAccessToken = response.data.data;
        localStorage.setItem("token", newAccessToken);
      }
      return newAccessToken;
    } catch (e) {
      if (e.response.status == 401) {
        if(e.response.data.message == "Refresh Token not found. Please login."){
          toast.error("Token not found. Please login");
          navigate("/login")
        }else if(e.response.data.message.includes("JWT expired")){
          toast.error("Login Expired. Please login");
          navigate("/login")
        }
        console.log(e.response.data.message)
      } else {
        if (!navigator.onLine) {
          toast.error("Check your internet connection");
          return null;
        }
        if (e.request) {
          toast.error("Server Error. Please Try again later.");
          return null;
        }
      }

      console.log(e.status);
      console.log(e);
      return null;
    }
  }
  return token;
}
