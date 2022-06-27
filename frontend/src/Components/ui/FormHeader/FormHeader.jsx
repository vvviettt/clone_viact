import logo from "../../../static/logo.svg";

function FormHeader(props) {
  return (
    <>
      <div className="flex items-center justify-center w-full p-5">
        <img className="phone:w-[200px]" src={logo} alt="" />
        <p className="text-orange phone:text-[12px] ">
          Automate
          <br /> Construction <br />
          Monitoring
        </p>
      </div>
      <p className="uppercase text-center text-[16px]">{props.title}</p>
      <p className="text-orange text-center text-[20px] font-bold mb-3">
        {props.description}
      </p>
    </>
  );
}

export default FormHeader;
