import { Outlet } from "react-router-dom";

function Account(props) {
  return (
    <div className="bg-auth bg- min-h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center">
      <div className="p-4 bg-white phone:w-[90%] phone:my-4 tablet:w-[90%] tablet:my-4 rounded-xl">
        <Outlet setSuccess={props.setSuccess} />
      </div>
    </div>
  );
}

export default Account;
