import { useEffect, useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../form/ForgotPasswordForm";
import authApi from "../../../api/auth";
import FormHeader from "../FormHeader";
import useVerifyForgot from "../../../hooks/useVerifyForgot";
import useChangePassword from "../../../hooks/useChangePassword";

function ForgotPassword() {
  const navigate = useNavigate();
  const { valid, error, check } = useVerifyForgot();
  const { isError, success, changePassword } = useChangePassword();
  injectStyle();

  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error("Please enter invalid email address", { autoClose: 1500 });
    }
  }, [error]);

  useEffect(() => {
    if (isError) {
      toast.error("Change password failed", { autoClose: 1500 });
    }
    if (success) {
      toast.success("Change password successfully", { autoClose: 1500 });
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, success]);

  //handle verify email
  const verifyEmail = async (email) => {
    await check(email);
  };

  const handleChangePassword = async (password, code) => {
    await changePassword(password, code);
  };
  return (
    <div className="">
      <FormHeader title="Forgot password" description="One more step" />
      <ForgotPasswordForm
        valid={valid}
        verifyEmail={verifyEmail}
        handleChangePassword={handleChangePassword}
      />
      <p
        className={classNames("text-center text-[12px] pt-5", {
          hidden: !valid,
        })}
      >
        Check the code sent to your email and enter it here
      </p>
    </div>
  );
}

export default ForgotPassword;
