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
      if (!navigator.onLine) {
        toast.error("Check your internet connection");
        return null;
      } 
      if (e.request) {
        toast.error("Server Error. Please Try again later.");
        return null;
      }

      console.log(e.status);
      console.log(e);
      return null;
    }
  }
  return token;
}
