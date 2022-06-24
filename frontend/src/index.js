import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./Components/pages/Account";
import Login from "./Components/core/Login";
import Register from "./Components/core/Register";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./Components/pages/Home";
import ForgotPassword from "./Components/core/ForgotPassword/ForgotPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="auth" element={<Account />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route
                path="forgot_password"
                element={<ForgotPassword />}
              ></Route>
            </Route>
            <Route path="" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
