import logo from "../../../static/logo.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../../app/registerSlice";

function Success() {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 right-0 left-0 h-screen bg-bgSuccess z-50  flex justify-center items-center ">
      <div className="p-4 bg-white w-[600px] phone:w-[90%] phone:my-4 rounded-xl text-center text-[12px]">
        <div className="flex items-center justify-center w-full p-5">
          <img className="phone:w-[200px]" src={logo} alt="" />
          <p className="text-orange phone:text-[12px] ">
            Automate
            <br /> Construction <br />
            Monitoring
          </p>
        </div>
        <p className="uppercase text-center text-[16px]">CREATE NEW ACCOUNT</p>
        <p className="text-orange text-center text-[20px] font-bold mb-3">
          Congratulations! You have registered successfully
        </p>
        <p className="mb-4">
          An email has been sent to your email address. Please check for
          activation account. Didn’t receive the email? Please check your spam
          folder.
        </p>
        <Link
          className="underline uppercase"
          onClick={dispatch(update)}
          to="/auth/login"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}

export default Success;
