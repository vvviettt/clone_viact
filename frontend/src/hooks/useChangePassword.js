import { useState } from "react";
import authApi from "../api/auth";

export default function useChangePasswod() {
  const [isError, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const changePassword = async (password, code) => {
    setError(false);
    setSuccess(false);
    const token = localStorage.getItem("forgot_token");
    // console.log("ok");
    const result = await authApi.changePassword(code, password, token);
    if (result.success) {
      setSuccess(true);
    }
    if (result.error) {
      setError(true);
    }
  };

  return { isError, success, changePassword };
}
