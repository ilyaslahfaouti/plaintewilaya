import React from "react";
import { Link } from "react-router-dom";
import Links from "../../router/Links";

const AuthComponent = ({ children, title }) => {
  return (
    <>
      <section className=" z-[-1]  my-10   flex justify-center items-center">
        <div className="container  flex justify-center">
          <div className="form-holder bg-[#ffffff] rounded-md p-5 sm:p-10  relative w-[100%]">
            {title ? (
              <div className="title text-l md:text-3xl lg:text-5xl  font-bold font-Poppins py-3 md:py-6 lg:py-9 capitalize">
                <h2>{title}</h2>
              </div>
            ) : (
              ""
            )}
            <div className="">{children}</div>
            <div className="absolute bottom-[-30px] right-0 font-Poppins text-sm md:text-md">
              {title === "register" ? (
                <span>
                  vous avez déjà un compte{" "}
                  <Link to={Links.login} className="text-blue-500 underline">
                    Connectez-vous
                  </Link>
                </span>
              ) : title === "login" ? (
                <span>
                  vous n'avez pas de compte{" "}
                  <Link to={Links.register} className="text-blue-500 underline">
                    S'inscrire
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
