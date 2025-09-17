

function GithubOauth() {
  const URL = import.meta.env.VITE_BACKEND_URL;


  const handleLogin = () => {
    window.location.href = `${URL}/oauth2/authorization/github`;
  }



  return (
    <div>
      <button onClick={handleLogin} className= "cursor-pointer select-none hover:scale-110 transistion-transform duration-600 ease-in-out p-2 rounded-lg border-1 border-neutral-700 text-white bg-[#222123] flex pl-2 items-center justify-center gap-4">
        <img src="github.png" alt="google" className="h-8" />  Sign in with GitHub
      </button>
    </div>
  );
}

export default GithubOauth;
