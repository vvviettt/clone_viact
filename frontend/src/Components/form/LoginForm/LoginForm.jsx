import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  key: yup
    .string("Enter your username or email")
    .required("Email or username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function LoginForm(props) {
  const [showPass, setShowPass] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      key: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      props.login(values);
    },
  });
  return (
    <>
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
              props.handleLoginWidthGoogle();
            }}
          >
            Login width Google
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
