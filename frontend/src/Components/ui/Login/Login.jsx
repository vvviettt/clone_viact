/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import { toast } from "react-toastify";
import { loginWithGoogle } from "../../../config/fireabse";
import FormHeader from "../FormHeader";
import LoginForm from "../../form/LoginForm";
import { useSelector } from "react-redux";
import useLogin from "../../../hooks/useLogin";

//validate schema

function Login(props) {
  const navigate = useNavigate();
  injectStyle();

  //check login
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (auth.isAuth) {
      toast.success("Login successfully!", { autoClose: 1500 });
      navigate("/");
    }
    if (auth.error !== "") {
      toast.error(auth.error, { autoClose: 1500 });
    }
  }, [auth]);

  //handle login
  const { login } = useLogin();
  //handle login width google
  const handleLoginWidthGoogle = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Login successfully!", { autoClose: 1500 });
        navigate("/");
      })
      .catch(() => {
        toast.error("Login failed!", { autoClose: 1500 });
      });
  };

  return (
    <div className="">
      <FormHeader title="Login" description="Welcome back" />
      <LoginForm
        login={login}
        handleLoginWidthGoogle={handleLoginWidthGoogle}
      />
      <p className="text-[12px] text-center pt-3">
        Not on Viact yet?{" "}
        <Link className="text-orange text-[14px] font-bold" to="/auth/register">
          Signup
        </Link>{" "}
        now.
      </p>
    </div>
  );
}

export default Login;
