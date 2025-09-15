

function GoogleOauth() {
  const URL = import.meta.env.VITE_BACKEND_URL;


  const handleLogin = () => {
    window.location.href = `${URL}/oauth2/authorization/github`;
  }



  return (
    <div>
      <button onClick={handleLogin} className="bg-red-600 text-white">
        Google login
      </button>
    </div>
  );
}

export default GoogleOauth;
