import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Register");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isHiding, setIsHiding] = useState(true);

  const role = "ROLE_USER";
  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Registering...");
    setPasswordError("");
    setNameError("");
    setUsernameError("");
    if (!name || !username || !password) {
      if (!name) {
        setNameError("Name cannot be empty!");
        setButtonText("Register");
      }
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

    if (password.length < 8) {
      toast.error("Password should atleast contain 8 characters.");
      setPasswordError("Password should atleast contain 8 characters!");
      setButtonText("Register");
      return;
    }

    try {
      const response = await axios.post(`${URL}/register`, {
        name,
        username,
        password,
        role,
      });

      if (response.data.status === 201) {
        toast.success("User Registered successfully! Please Login");
        setUsername("");
        setPassword("");
        setButtonText("Registered!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      setButtonText("Register");
      if(error.response){
        if (error.response.status === 409) {
          setUsernameError("Username already exists.");
        }else{
        toast.error("Something went wrong. Try again later.");
        }
      }
      else if (!navigator.onLine) {
        toast.error("Check your internet connection.");
      }else if (error.request){
        toast.error("Server Offline. Try again later.");
      }else{
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className="min-h-screen/2">
          <div className="card w-fit m-4 sm:m-0">
            <h4 className="m-2 sm:m-7 text-sm ">Create your Account</h4>

            <div className="flex flex-col m-2 sm:m-10 gap-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center text-left">
                <label className="text-neutral-300 mt-3">Name</label>
                <div className="flex flex-col  justify-center text-left">
                  <input
                    type="name"
                    name="name"
                    placeholder="Your Name"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </div>
                <label className="text-neutral-300">Username</label>
                <div className="flex flex-col  justify-center text-left">
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
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
                      className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
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
                <div className="flex justify-center w-full">
                  <button className="btn-primary m-3 sm:text-xl sm:m-7" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg  text-gray-300">
                Already have an account?{" "}
                <a href="/login" className="text-white hover:scale-105 font-medium underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
