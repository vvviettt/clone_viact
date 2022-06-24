import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useNavigate } from "react-router-dom";

import logo from "../../../static/logo.svg";
import authApi from "../../../api/auth";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  code: yup
    .string("Enter your password")
    .length(5, "Invalid code")
    .required("Password is required"),
});

function ForgotPassword() {
  injectStyle();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      new_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const result = await authApi.changePassword(
        values.code,
        values.new_password,
        localStorage.getItem("forgot_token")
      );
      if (result.error) {
        return toast.error(result.message, { autoClose: 1500 });
      }

      if (result.success) {
        toast.success("Change password successfully", { autoClose: 1500 });
        navigate("/auth/login");
      }
    },
  });

  //handle verify email
  const verifyEmail = async (email) => {
    if (email === "") {
      return toast.error("Please enter email", { autoClose: 1500 });
    }
    const result = await authApi.verify(email);
    if (result.error) {
      return toast.error(result.message, { autoClose: 1500 });
    }

    if (result.success) {
      localStorage.setItem("forgot_token", result.token);
      setValid(true);
    }
  };
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
      <p className="text-orange text-center text-[20px] font-bold">Welcome</p>
      <p
        className={classNames("text-center text-[12px] pt-5", {
          hidden: !valid,
        })}
      >
        Check the code sent to your email and enter it here
      </p>
      <form onSubmit={formik.handleSubmit} className="px-[30px] pt-[30px] ">
        <div className=" w-[366px] phone:w-full">
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            style={{ display: valid ? "none" : "" }}
            margin="normal"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Enter your  email"
            variant="outlined"
          />
          <TextField
            style={{ display: valid ? "" : "none" }}
            sx={{ marginBottom: 2 }}
            fullWidth
            type="text"
            id="code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            label="code"
            variant="outlined"
          />
          <TextField
            style={{ display: valid ? "" : "none" }}
            fullWidth
            type="text"
            id="new_password"
            name="new_password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            error={
              formik.touched.new_password && Boolean(formik.errors.new_password)
            }
            helperText={
              formik.touched.new_password && formik.errors.new_password
            }
            label="New password"
            variant="outlined"
          />

          <Button
            style={{
              width: "100%",
              color: "white",
              marginTop: "30px",
              display: valid ? "none" : "",
            }}
            color="inherit"
            variant="contained"
            onClick={() => verifyEmail(formik.values.email)}
          >
            Next
          </Button>
          <Button
            type="submit"
            style={{
              width: "100%",
              color: "white",
              marginTop: "30px",
              display: valid ? "" : "none",
            }}
            color="error"
            variant="contained"
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
