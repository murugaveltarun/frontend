import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, EyeIcon, EyeOff, XCircle } from "lucide-react";
import { publicToast } from "../../components/toast/PublicToast";
import GoogleOauth from "./GoogleOauth";
import GithubOauth from "./GithubOauth";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Register");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isHiding, setIsHiding] = useState(true);

  const [passwordChecks, setPasswordChecks] = useState({
    small: null,
    capital: null,
    number: null,
    special: null,
    length: null,
  });

  const role = "ROLE_USER";
  const URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const passwordErrors = [passwordChecks.small, passwordChecks.capital, passwordChecks.special, passwordChecks.number, passwordChecks.length];
  const passwordErrorTexts = ["one small alphabet", "one capital alphabet", "one special character", "one number", "8 characters"];

  const checkPassword = (password) => {
    setPasswordChecks({
      small: /[a-z]/.test(password),
      capital: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      length: password.length >= 8,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Registering...");
    setPasswordError("");
    setNameError("");
    setUsernameError("");
    setEmailError("");
    if (!name || !username || !password || !email) {
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
      if (!email) {
        setEmailError("Email cannot be empty!");
        setButtonText("Register");
      }
      return;
    }

    if (username.length >= 5) {
      setUsernameError("Username should have atleast 5 characters.");
    }

    if (!(passwordChecks.small && passwordChecks.capital && passwordChecks.special && passwordChecks.number && passwordChecks.length)) {
      setButtonText("Submit");
      return;
    }

    try {
      const response = await axios.post(`${URL}/register`, {
        name,
        username,
        password,
        role,
        email,
      });

      if (response.data.status === 201) {
        publicToast.success("User Registered successfully! Please Login");
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setButtonText("Registered!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      setButtonText("Register");
      if (error.response) {
        if (error.response.status === 409) {
          if (error.response.data.message == "Email already exists") {
            //refer backend
            setEmailError("Email already exists.");
          } else if (error.response.data.message == "Username already exists") {
            //refer backend
            setUsernameError("Username already exists.");
          }
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

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4 bg-bg-primary">
        <div className="min-h-screen/2">
          <div className="card w-fit m-4 sm:m-0">
            <div className=" flex w-full p-7 sm:p-4 flex-col sm:flex-row justify-center items-center gap-5 text-sm md:text-md">
              <GoogleOauth  />
              <GithubOauth />
            </div>
            <h4 className="m-2 sm:m-5 text-sm ">Create your Account</h4>

            <div className="flex flex-col m-2 sm:m-4 gap-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center text-left">
                <label className="text-neutral-300">Name</label>
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
                <label className="text-neutral-300">E-mail</label>
                <div className="flex flex-col  justify-center text-left">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <label className="text-neutral-300 ">Password</label>
                <div className="flex flex-col relative justify-center text-left">
                  <div className="flex flex-col relative justify-center text-left">
                    <input
                      type={`${isHiding ? "password" : "text"}`}
                      name="password"
                      placeholder="Your Password"
                      className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        checkPassword(e.target.value);
                      }}
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
                  {password && (
                    <div className="ml-2">
                      <p className="text-neutral-300 text-sm mt-1">Password should contain atleast :</p>
                      <div className="text-sm ml-4 mt-1">
                        {passwordErrors.map((error, index) => (
                          <p className={`${error == null ? "text-neutral-300" : error ? "text-green-500" : "text-red-500"} flex gap-2 items-center`}>
                            {error == null ? (
                              <CheckCircle className="w-3 h-3 text-neutral-300" />
                            ) : error ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500" />
                            )}
                            {passwordErrorTexts[index]}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center w-full">
                  <button className="btn-primary m-3 sm:text-xl sm:m-4" type="submit">
                    {buttonText}
                  </button>
                </div>
              </form>
              <p className="text-lg  text-gray-300">
                Already have an account?{" "}
                <a href="/login" className="text-white  font-medium hover:underline">
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
