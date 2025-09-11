import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isHiding, setIsHiding] = useState(true);
  const [badCredentials, setBadCredentials] = useState(false);

  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Logging in...");
    setPasswordError("");
    setUsernameError("");
    setBadCredentials(false);
    if (!username || !password) {
      if (!username) {
        setUsernameError("Username cannot be empty!");
        setButtonText("Register");
      }
      if (!password) {
        setPasswordError("Password cannot be empty!");
        setButtonText("Register");
      }
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

      if (response.data.status === 200) {
        login(response.data.data);
        setUsername("");
        setPassword("");
        setButtonText("Logged in!");
        toast.success("User Verified! Navigating to dashboard...");
        const decode = jwtDecode(response.data.data);
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
      setButtonText("Login");
      if (error.response) {
        if (error.response.status === 401) {
          setBadCredentials(true);
        } else {
          toast.error("Something went wrong. Try again later.");
        }
      } else if (!navigator.onLine) {
        toast.error("Check your internet connection.");
      } else if (error.request) {
        toast.error("Server Offline. Try again later.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className=" min-h-screen/2 ">
          <div className="card w-fit m-4 sm:m-0 ">
            <h4 className="m-2 sm:m-7 text-sm ">Login to your Account</h4>

            <div className="flex flex-col m-2 sm:m-10 gap-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center text-left">
                <label className="text-neutral-300">Username</label>
                <div className="flex flex-col justify-center text-left">
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                </div>
                <label className="text-neutral-300">Password</label>
                <div className="flex flex-col relative justify-center text-left">
                  <div className="flex flex-col relative justify-center text-left">
                    <input
                      type={`${isHiding ? "password" : "text"}`}
                      name="password"
                      placeholder="Your Password"
                      className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {isHiding && (
                      <EyeOff
                        className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500  "
                        onClick={() => setIsHiding(false)}
                      />
                    )}
                    {!isHiding && (
                      <EyeIcon
                        className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500 "
                        onClick={() => setIsHiding(true)}
                      />
                    )}
                  </div>
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                {badCredentials && <p className="text-red-500 text-sm">Login failed: invalid credentials or user not found.</p>}
                <div className="flex justify-center w-full ">
                  <button className="btn-primary mt-5 sm:text-xl sm:m-7" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg text-gray-300">
                New to Task Wiser?{" "}
                <a href="/register" className="text-white hover:scale-105 font-medium underline">
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
