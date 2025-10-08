import React, { createContext, useContext, useEffect, useState } from "react";
import { checkTokenOrRefresh } from "../../utils/checkTokenOrRefresh";
import { getApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/auth/AuthContext";
export const StatsContext = createContext();

export function StatsProvider({ children }) {
  let { token, setToken } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/stats`;

        //check before whether the access token is valid or not
        const validToken = await checkTokenOrRefresh(token, navigate);
        if (!validToken) return;
        setToken(validToken);

        //clear request
        const response = await getApi(validToken).get(url);
        console.log("clearhandle");
        console.log(response);
        if (response.data.status == 200) {
          setStats(response.data.data);
          console.log(response.data.data);
          console.log(stats)
        }
      } catch (e) {
        console.error(e);
      }
    };
    getStats();
  }, [token,location.pathname]);

  return <StatsContext.Provider value={{ stats, setStats }}>{children}</StatsContext.Provider>;
}
