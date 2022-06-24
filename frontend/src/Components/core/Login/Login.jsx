/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { injectStyle } from "react-toastify/dist/inject-style";
import { toast } from "react-toastify";
import logo from "../../../static/logo.svg";
import authApi from "../../../api/auth";
import { loginWithGoogle } from "../../../fireabse";

//validate schema

const validationSchema = yup.object({
  key: yup
    .string("Enter your username or email")
    .required("Email or username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  injectStyle();

  //check login
  useEffect(() => {
    if (
      localStorage.getItem("email") !== null &&
      localStorage.getItem("name") !== null
    ) {
      navigate("/");
    }
  }, []);
  //formik
  const formik = useFormik({
    initialValues: {
      key: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const result = await authApi.login(values.key, values.password);
      if (result.error) {
        toast.error(result.message, { autoClose: 1500 });
      }

      if (result.success) {
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);
        toast.success("Login successfully", { autoClose: 1500 });
        navigate("/");
      }
    },
  });

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

  const [showPass, setShowPass] = React.useState(false);
  return (
    <div className="">
      <div className="flex items-center justify-center w-full ">
        <img className="phone:w-[200px]" src={logo} alt="" />
        <p className="text-orange">
          Automate
          <br /> Construction <br />
          Monitoring
        </p>
      </div>
      <p className="uppercase text-center text-[16px]">Login</p>
      <p className="text-orange text-center text-[20px] font-bold">
        Welcome back
      </p>
      <form onSubmit={formik.handleSubmit} className="px-[30px] pt-[30px] ">
        <div className=" w-full phone:w-full">
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            margin="normal"
            id="key"
            name="key"
            value={formik.values.key}
            onChange={formik.handleChange}
            error={formik.touched.key && Boolean(formik.errors.key)}
            helperText={formik.touched.key && formik.errors.key}
            label="Username or email"
            variant="outlined"
          />
          <TextField
            fullWidth
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            variant="outlined"
          />
          <div className="flex justify-between">
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": { fontSize: 12 },
              }}
              control={
                <Checkbox
                  checked={showPass}
                  onChange={(e) => {
                    setShowPass(e.target.checked);
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 14 },
                  }}
                />
              }
              label="Show password"
            />
            <Link
              className="text-[12px] text-orange"
              to="/auth/forgot_password"
            >
              Forgot password
            </Link>
          </div>

          <Button
            type="submit"
            style={{ width: "100%", color: "white" }}
            color="inherit"
            variant="contained"
          >
            Login
          </Button>
          <p className="text-center">or</p>
          <Button
            style={{ width: "100%", color: "white" }}
            color="error"
            variant="contained"
            onClick={() => {
              handleLoginWidthGoogle();
            }}
          >
            Login width Google
          </Button>
        </div>
      </form>
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
