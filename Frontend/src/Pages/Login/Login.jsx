import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { validate, loginin } from "../Dependencies.cjs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errs, setErrs] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const validated = validate(formData);
    if (!validated.valid) {
      setErrs({ ...validated.errors });
    } else {
      setErrs({});
      try {
        const res = await loginin(formData);

        if (res.status === 201) {
          window.localStorage.setItem("ACCESS_TOKEN", res.data.token);
          navigate("/dashbord");
          return "";
        }

        if (res.response.data.errors) {
          setErrs({ ...res.response.data.errors });
        }
        if (res.response.data.message) {
          setErrs({
            email: res.response.data.message,
            password: res.response.data.message,
          });
        }
      } catch (error) {
        console.log("catched: ", error);
      }
    }
  };
  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <AuthComponent title={"login"}>
        <div className="form flex justify-center">
          <form onSubmit={onSubmit} action="">
            <div>
              <div className="pl-3 mb-3 ">
                <label
                  htmlFor="email"
                  className="font-Poppins text-md block mb-2 "
                >
                  Email:
                </label>
                <input
                  required
                  value={formData["email"]}
                  onChange={inputChange}
                  type="text"
                  name="email"
                  id="email"
                  className={
                    "min-w-[22rem] transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 $ "
                  }
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["email"]}</span>
                </div>
              </div>
              <div className="pl-3 mb-3 ">
                <label
                  htmlFor="password"
                  className="font-Poppins text-md block mb-2 "
                >
                  Mot de passe:
                </label>
                <input
                  required
                  onChange={inputChange}
                  type="password"
                  name="password"
                  id="password"
                  className={
                    "min-w-[22rem] transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 $ "
                  }
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>
                    {errs["password"]} {errs["message"]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg hover:bg-blue-500 transition-all duration-[.2s]"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
      </AuthComponent>
    </>
  );
};

export default Login;
