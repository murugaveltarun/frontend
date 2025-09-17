function GoogleOauth() {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = () => {
    window.location.href = `${URL}/oauth2/authorization/google`;
  };

  return (
    <div>
      <button onClick={handleLogin} className="cursor-pointer border-1 border-neutral-700 select-none hover:scale-110 transistion-transform duration-600 ease-in-out p-2 rounded-lg text-black  bg-white flex pl-2 items-center justify-center gap-4">
              <img src="google.png" alt="google" className="h-8" />  Sign in with Google
      </button>
    </div>
  );
}

export default GoogleOauth;
