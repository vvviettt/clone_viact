/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    if (
      localStorage.getItem("email") === null &&
      localStorage.getItem("name") === null
    ) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center">
        Hello {" " + localStorage.getItem("name")}
      </h2>
      <button
        className="bg-red-700 text-white p-2 rounded-lg max-w-3xl"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
