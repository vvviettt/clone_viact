import { useDispatch } from "react-redux";
import { registerAPI } from "../redux/registerSlice";

export default function useRegister() {
  const dispatch = useDispatch();

  const register = async (values) => {
    await dispatch(registerAPI(values));
  };

  return { register };
}
