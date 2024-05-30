import React from "react";
import { Link } from "react-router-dom";

const AuthComponent = ({ children, titile }) => {
  return (
    <>
      <section className=" z-[-1] absolute left-0 top-0 right-0 bottom-0  flex justify-center items-center">
        <div className="container   flex justify-center">
          <div className="form-holder bg-[#ffff] rounded-md px-[3rem] pb-10 mx-[4rem] relative w-auto min-w-[60%]">
            <div className="title text-5xl  font-bold font-Poppins py-9 capitalize">
              <h2>{titile}</h2>
            </div>
            {children}
            <div className="absolute bottom-[-30px] right-0 font-Poppins ">
              {titile === "register" ? (
                <span>
                  vous avez déjà un compte{" "}
                  <Link to={"/login"} className="text-blue-500 underline">connectez-vous</Link>
                </span>
              ) : titile === "login" ?(
                <span>
                  vous n’avez pas de compte {" "}
                  <Link to={"/register"} className="text-blue-500 underline" >s'inscrire</Link>
                </span>
              ):
              ""
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthComponent;
