import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import useRegister from "../../../hooks/useRegister";
import RegisterForm from "../../form/RegisterForm/RegisterForm";
import FormHeader from "../FormHeader";

function Register() {
  const registerState = useSelector((state) => state.register);
  const { register } = useRegister();
  useEffect(() => {
    console.log(registerState.error);
    if (registerState.error !== "") {
      toast.error(registerState.error, { autoClose: 1500 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerState]);
  return (
    <div className="flex w-[1000px] phone:w-[100%] overflow-hidden phone:flex-col tablet:w-[100%] tablet:flex-col">
      <div className="max-W-[50%] basis-1/2 phone:basis-full">
        <FormHeader
          title="CREATE NEW ACCOUNT"
          description="Build smart risk free"
        />
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

      <RegisterForm handleRegister={register} />
    </div>
  );
}
export default Register;
