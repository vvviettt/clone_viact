import { useDispatch } from "react-redux";
import { loginAPI } from "../redux/authSlice";

export default function useLogin() {
  const dispatch = useDispatch();

  const login = async (values) => {
    const result = await dispatch(loginAPI(values));
    localStorage.setItem("token", result.payload.token);
  };

  return { login };
}
