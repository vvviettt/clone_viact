import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Success from "./Components/Success";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const success = useSelector((state) => state.register.success);

  return (
    <div>
      <ToastContainer autoClose={8000} />
      {success && <Success />}
      <Outlet />
    </div>
  );
}

export default App;
