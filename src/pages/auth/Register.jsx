import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const role = "ROLE_USER";
  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Registering...");

    
    if (!username || !password || !name ) {
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
        name,
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
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className="min-h-screen/2">
          <div className="card">
            <h4 className="m-7">
              Create your Account
            </h4>

            <div className="flex flex-col m-10 gap-3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 justify-center text-left"
              >
                <label className="text-neutral-300 mt-3">Name</label>
                <input
                  type="name"
                  name="name"
                  placeholder="Your Name"
                  className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-4 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label className="text-neutral-300">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-4 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label className="text-neutral-300">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 text-white mb-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div className="flex justify-center w-full">
                  <button className="btn-primary text-xl m-7" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg  text-gray-300">Already have an account?  {" "}
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
