import { useState } from "react";
import authApi from "../api/auth";

export default function useVerifyForgot() {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);

  const check = async (email) => {
    setValid(false);
    setError(false);
    const result = await authApi.verify(email);
    console.log(result);
    if (result.success) {
      setValid(true);
      localStorage.setItem("forgot_token", result.token);
    }
    if (result.error) {
      setError(true);
    }
  };

  return { valid, error, check };
}
