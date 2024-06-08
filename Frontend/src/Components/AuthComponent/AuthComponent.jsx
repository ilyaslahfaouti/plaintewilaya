import React from "react";
import { Link } from "react-router-dom";

const AuthComponent = ({ children, title }) => {
  return (
    <>
      <section className=" z-[-1]  my-10   flex justify-center items-center">
        <div className="container  flex justify-center">
          <div className="form-holder bg-[#ffffff] rounded-md px-[3rem] pb-10 mx-[4rem] relative w-[100%]">
            {title ? (
              <div className="title text-5xl  font-bold font-Poppins py-9 capitalize">
                <h2>{title}</h2>
              </div>
            ) : (
              ""
            )}
            <div className="py-15 pt-32">{children}</div>
            <div className="absolute bottom-[-30px] right-0 font-Poppins ">
              {title === "register" ? (
                <span>
                  vous avez déjà un compte{" "}
                  <Link to={"/login"} className="text-blue-500 underline">
                    connectez-vous
                  </Link>
                </span>
              ) : title === "login" ? (
                <span>
                  vous n'avez pas de compte{" "}
                  <Link to={"/register"} className="text-blue-500 underline">
                    s'inscrire
                  </Link>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthComponent;
