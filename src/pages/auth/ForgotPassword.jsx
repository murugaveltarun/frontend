import { useState } from "react";
import axios from "axios";
import { publicToast } from "../../components/toast/PublicToast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    setEmailError(null);
    e.preventDefault();
    setButtonText("Submitting...");
    if (!email) {
      setEmailError("E - mail cannot be empty!");
      setButtonText("Submit");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/forgot-password`,
        {
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status === 200) {
        setButtonText("Submitted!");
        publicToast.success("Reset Password link will be sent your mail if it exists.");
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
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-bg-primary">
        <div className=" min-h-screen/2 ">
          <div className="card w-fit md:w-lg m-4 sm:m-0 ">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center text-left gap-5">
              <h4 className="text-center pb-8">Forgot your password?</h4>
              <label className="text-neutral-300">Enter your registered e-mail to recieve a password reset link.</label>
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
              <div className="flex justify-center w-full">
                <button onClick={() => navigate("/login")} className="btn-secondary m-3 sm:text-xl sm:m-7" type="button">
                  Cancel
                </button>{" "}
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

export default ForgotPassword;
