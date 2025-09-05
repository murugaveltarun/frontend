import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";


function Login() {

  const {login} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Login");

  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Logging in...");

    if (!username || !password) {
      alert("Please fill in all the fields");
      setButtonText("Login");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/login`,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Backend response: ", response);

      if (response.status === 200) {

        login(response.data)
        setUsername("");
        setPassword("");
        setButtonText("Logged in!");

        const decode = jwtDecode(response.data);

        setTimeout(() => {
          if (decode.role === "ROLE_USER") {
            navigate("/user-dashboard");
          } else if (decode.role === "ROLE_ADMIN") {
            navigate("/admin-dashboard");
          } else {
            navigate("/unauthorized");
          }
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setButtonText("Login");
      if (error.response && error.response.status === 401) {
        alert("Wrong credentials or user does not exist.");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className="  ">
          <div className="card ">
            <h4 className="m-7" >
              Login to your Account
            </h4>

            <div className="flex flex-col m-10 gap-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 justify-center text-left"
              >
                <label className="text-neutral-300">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-4 text-white "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label className="text-neutral-300">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 text-white "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div className="flex justify-center w-full ">
                  <button className="btn-primary text-xl m-7" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg text-gray-300">
                New to Task Wiser?{" "}
                <a
                  href="/register"
                  className="text-white hover:scale-105 font-medium underline"
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
