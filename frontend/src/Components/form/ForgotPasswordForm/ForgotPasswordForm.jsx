import * as yup from "yup";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";

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
function ForgotPassword(props) {
  injectStyle();
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      new_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      props.handleChangePassword(values.new_password, values.code);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="px-[30px] pt-[30px] ">
        <div className=" w-[366px] phone:w-full">
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            style={{ display: props.valid ? "none" : "" }}
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
            style={{ display: props.valid ? "" : "none" }}
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
            style={{ display: props.valid ? "" : "none" }}
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
              display: props.valid ? "none" : "",
            }}
            color="inherit"
            variant="contained"
            onClick={() => {
              props.verifyEmail(formik.values.email);
            }}
          >
            Next
          </Button>
          <Button
            type="submit"
            style={{
              width: "100%",
              color: "white",
              marginTop: "30px",
              display: props.valid ? "" : "none",
            }}
            color="error"
            variant="contained"
          >
            Change Password
          </Button>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
