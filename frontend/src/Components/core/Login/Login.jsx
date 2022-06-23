import React from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../../static/logo.svg";

function Login() {
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
      <form className="px-[30px] pt-[30px] ">
        <div className=" w-[366px] phone:w-full">
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            margin="normal"
            id="key"
            label="Username or email"
            variant="outlined"
          />
          <TextField
            fullWidth
            type={showPass ? "text" : "password"}
            id="password"
            label="Password"
            variant="outlined"
          />
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
          <Button
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
