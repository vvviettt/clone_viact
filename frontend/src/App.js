import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer autoClose={8000} />
      <Outlet />
    </div>
  );
}

export default App;
