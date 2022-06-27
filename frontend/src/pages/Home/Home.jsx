/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  useEffect(() => {
    if (!auth.isAuth) {
      navigate("/auth/login");
    }
  }, [auth.isAuth]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center">Hello {" " + auth.name}</h2>
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
