import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../redux/registerSlice";
import FormHeader from "../ui/FormHeader";

function Success() {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 right-0 left-0 h-screen bg-bgSuccess z-50  flex justify-center items-center ">
      <div className="p-4 bg-white w-[600px] phone:w-[90%] phone:my-4 rounded-xl text-center text-[12px]">
        <FormHeader
          title="CREATE NEW ACCOUNT"
          description="Congratulations! You have registered successfully"
        />

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
