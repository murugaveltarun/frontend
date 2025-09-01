import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const role = "ROLE_USER";
  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Registering...");

    
    if (!username || !password) {
      alert("Please fill in all the fields");
      setButtonText("Register");
      return;
    }

    if(password.length < 8){
      alert("Password should atleast contain 8 characters!");
      setButtonText("Register");
      return
    }

    try {
      const response = await axios.post(`${URL}/register`, {
        username,
        password,
        role,
      });

      if (response.status === 200) {
        setUsername("");
        setPassword("");
        setButtonText("Registered!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setButtonText("Register");
      if (error.response && error.response.status === 401) {
        alert("Username already exists");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };




  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="min-h-screen/2">
          <div className="w-full max-w bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 text-center">
            <h1 className="text-5xl font-bold text-gradient m-10 mb-15 py-6">
              Create your Account
            </h1>

            <div className="flex flex-col m-10 gap-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 justify-center text-left"
              >
                <label >Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label className="mt-8">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div className="flex justify-center w-full mt-10">
                  <button className="btn-primary text-xl py-3" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg pt-10 text-gray-300">Already have an account?  {" "}
                <a href="/login" className="text-white hover:scale-105 font-medium underline" >Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
