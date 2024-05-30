import React from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import Create from "../../assets/create.jpeg";
import Progress from "../../assets/progress.png";
import { Link } from "react-router-dom";

const Dashbord = () => {
  return (
    <>
      <Header />
      <AuthComponent>
        <div className="content flex justify-around">
          <div className="item p-5">
            <Link to={"/dashbord"}>
              <div className="hover:scale-[1.1] transition-all duration-[.3s]">
                <div className="box border border-solid border-black rounded-md mb-4 hover:bg-black">
                  <img className="max-w-[200px]" src={Progress} alt="" />
                </div>
                <div className="boxfooter font-Poppins capitalize text-center text-xl">
                  suivi une plainte
                </div>
              </div>
            </Link>
          </div>
          <div className="item p-5">
            <Link to={"/dashbord"}>
              <div className="hover:scale-[1.1] transition-all duration-[.3s]">
                <div className="box border border-solid border-black rounded-md mb-4 ">
                  <img className="max-w-[200px]" src={Create} alt="" />
                </div>
                <div className="boxfooter font-Poppins capitalize text-center text-xl">
                  <p>créer une plainte</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </AuthComponent>
    </>
  );
};

export default Dashbord;
