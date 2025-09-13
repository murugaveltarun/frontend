import React from "react";

import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, EyeIcon, EyeOff, XCircle } from "lucide-react";
import { publicToast } from "../../components/toast/PublicToast";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    small: null,
    capital: null,
    number: null,
    special: null,
    length: null,
  });

  const [isHiding1, setIsHiding1] = useState(true);
  const [isHiding2, setIsHiding2] = useState(true);

  const [buttonText, setButtonText] = useState("Submit");
  const URL = import.meta.env.VITE_BACKEND_URL + "/reset-password";

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
    setPassword1Error("");
    setPassword2Error("");
    setButtonText("Submitting...");

    if (!password1 || !password2) {
      if (!password1) {
        setPassword1Error("Password cannot be empty");
      }
      if (!password2) {
        setPassword2Error("Password cannot be empty");
      }
      setButtonText("Submit");
      return;
    }

    if (password1 != password2) {
      publicToast.error("Passwords does not match!");
      setButtonText("Submit");
      return;
    }

    if (!(passwordChecks.small && passwordChecks.capital && passwordChecks.special && passwordChecks.number && passwordChecks.length)) {
      setButtonText("Submit");
      return;
    }
    console.log(password1);
    console.log(token);
    try {
      const response = await axios.post(
        URL,
        {
          password: password1,
          token: token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status === 200) {
        setButtonText("Submitted!");
        publicToast.success("Password changed successfully! Please Login");
        navigate("/login");
      }
    } catch (error) {
      setButtonText("Submit");
      if (!navigator.onLine) {
        publicToast.error("Check your internet connection.");
      } else if (error.request) {
        publicToast.error("Server Offline. Try again later.");
      } else {
        publicToast.error("Something went wrong. Try again later.");
      }
    } finally {
      setButtonText("Submit");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className=" min-h-screen/2 ">
          <div className="card w-fit md:w-lg m-4 sm:m-0 ">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center text-left gap-2">
              <h4 className="text-center pb-8">Reset your password</h4>
              <label className="text-neutral-100 ">New Password</label>
              <div className="flex flex-col relative justify-center text-left">
                <div className="flex flex-col relative justify-center text-left">
                  <input
                    type={`${isHiding1 ? "password" : "text"}`}
                    name="password"
                    placeholder="Your Password"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
                    value={password1}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                      checkPassword(e.target.value);
                    }}
                  ></input>
                  {isHiding1 && (
                    <EyeOff
                      className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500  "
                      onClick={() => setIsHiding1(false)}
                    />
                  )}
                  {!isHiding1 && (
                    <EyeIcon
                      className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500 "
                      onClick={() => setIsHiding1(true)}
                    />
                  )}
                </div>
                {password1Error && <p className="text-red-500 text-sm">{password1Error}</p>}
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
              </div>
              <label className="text-neutral-100 mt-7">Re-type Password</label>
              <div className="flex flex-col relative justify-center text-left">
                <div className="flex flex-col relative justify-center text-left">
                  <input
                    type={`${isHiding2 ? "password" : "text"}`}
                    name="password"
                    placeholder="Your Password"
                    className="focus:outline-none bg-gray-700 border border-gray-600 rounded-lg p-2 mb-1 text-white"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  ></input>
                  {isHiding2 && (
                    <EyeOff
                      className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500  "
                      onClick={() => setIsHiding2(false)}
                    />
                  )}
                  {!isHiding2 && (
                    <EyeIcon
                      className="absolute top-1/2 -translate-y-[50%] right-3 w-6 h-6 text-white cursor-pointer hover:scale-110 transform-transition duration-500 "
                      onClick={() => setIsHiding2(true)}
                    />
                  )}
                </div>
                {password2Error && <p className="text-red-500 text-sm">{password2Error}</p>}
              </div>
              <div className="flex justify-center w-full">
                <button className="btn-primary m-3 sm:text-xl sm:m-7" type="submit">
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
