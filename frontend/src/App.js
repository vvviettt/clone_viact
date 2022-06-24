import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Success from "./Components/core/Success";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const success = useSelector((state) => state.register.success);
  return (
    <div>
      <ToastContainer autoClose={8000} />
      {success && <Success />}
      <Outlet setSuccess={1} />
    </div>
  );
}

export default App;
