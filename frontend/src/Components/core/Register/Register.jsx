import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { injectStyle } from "react-toastify/dist/inject-style";
import logo from "../../../static/logo.svg";
import authApi from "../../../api/auth";
import { useDispatch } from "react-redux";
import { update } from "../../../app/registerSlice";

//validate schema
const validationSchema = yup.object({
  first_name: yup
    .string("Enter your first name")
    .required("First name is required"),
  last_name: yup
    .string("Enter your last name")
    .required("Last name is required"),

  username: yup
    .string("Enter your username")
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, {
      message: "Please enter a valid username",
    }),
  phone: yup
    .string("Enter your phone number")
    .required("Phone number is required")
    .matches(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/, {
      message: "Please enter a valid phone number",
    }),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
function Register(props) {
  const [showPass, setShowPass] = React.useState(false);
  const dispatch = useDispatch();
  injectStyle();
  //formik config
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const result = await authApi.register(values);

      if (result.error) {
        toast.error(result.message, { autoClose: 1500 });
      } else {
        dispatch(update());
      }
    },
  });

  return (
    <div className="flex w-[1000px] phone:w-[100%] overflow-hidden phone:flex-col tablet:w-[100%] tablet:flex-col">
      <div className="max-W-[50%] basis-1/2 phone:basis-full">
        <div className="flex items-center justify-center w-full">
          <img className="phone:w-[200px]" src={logo} alt="" />
          <p className="text-orange phone:text-[12px]">
            Automate
            <br /> Construction <br />
            Monitoring
          </p>
        </div>
        <p className="uppercase text-center text-[16px] phone:mt-[10px] tablet:mt-10">
          CREATE NEW ACCOUNT
        </p>
        <p className="text-orange text-center text-[20px] font-bold">
          Build smart risk free
        </p>
        <ul className="p-5">
          <li className="mb-[30px] phone:mb-[20px]">
            Understand why Viact is being used on millions of customers everyday
          </li>
          <li className="mb-[30px] phone:mb-[20px]">
            Find out if Viact is the right fit for your business
          </li>
          <li className="mb-[30px] phone:mb-[20px]">
            Get all your questions answered (personally)
          </li>
          <li className="mb-[30px] phone:mb-[20px]">
            Completely risk-free with 14-day free trial and a 30-day money back
            guarantee!
          </li>
        </ul>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[50%] phone:max-w-full tablet:max-w-full basis-1/2 phone:basis-full tablet:basis-full p-5 phone:py-0 border-l border-[#d5d7dc] phone:border-none"
      >
        <TextField
          fullWidth
          margin="dense"
          sx={{
            "& .MuiFormControl-root": { margin: 0 },
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          label="First Name"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="dense"
          sx={{
            "& .MuiFormControl-root": { margin: 0 },
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
          label="Last Name"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="dense"
          sx={{
            "& .MuiFormControl-root": { margin: 0 },
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          label="Username"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="dense"
          type="email"
          sx={{
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          label="Email"
          variant="outlined"
          required
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="dense"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          sx={{
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          label="Phone"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          margin="dense"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          label="Password"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          margin="dense"
          name="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          sx={{
            "& .MuiInputBase-input": { fontSize: 12 },
            "& .MuiInputLabel-root": { fontSize: 12 },
            "& .MuiInputLabel-asterisk": { color: "red" },
          }}
          id="key"
          label="Confirm Password"
          variant="outlined"
          required
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
          style={{ width: "100%", marginTop: "10px" }}
          color="inherit"
          type="submit"
          variant="contained"
        >
          Register
        </Button>
        <p className="text-[12px] text-center pt-3 phone:my-5">
          Already have an account?
          <Link className="text-orange text-[14px] font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
