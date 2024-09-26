import React from "react";
import Header from "./../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { useState, useEffect } from "react";
import { getCommunes, validate, signup } from "./../Dependencies.cjs";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Links from "../../router/Links";

const Register = () => {
  const [communes, setCommunes] = useState([]);
  const [formData, setFormData] = useState({
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    password_confirmation: "",
  });
  const [errs, setErrs] = useState({});
  useEffect(()=>{document.title="S'inscrire"});

  const navigate = useNavigate();
  useEffect(() => {
    const response = async () => {
      const data = await getCommunes();
      setCommunes([...data]);
    };
    response();
  }, []);

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.name === "password_confirmation" ||
      e.target.name === "password"
    ) {
      if (e.target.value !== formData.password) {
        errs["password_confirmation"] =
          "Le mot de passe de confirmation ne correspond pas au mot de passe indiqué";
      } else {
        errs["password_confirmation"] = "";
      }
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validated = validate(formData);

    if (!validated.valid) {
      setErrs({ ...validated.errors });
    } else {
      setErrs({});
      try {
        const response = await signup(formData);

        if (response.status === 201) {
          window.localStorage.setItem("ACCESS_TOKEN", response.data.token);
          navigate(Links.verification);

          return "";
        }

        if (response.response.data.errors) {
          setErrs({ ...response.response.data.errors });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <AuthComponent title="register">
        <div className="form ">
          <form action="" onSubmit={handelSubmit}>
            <div  className="flex flex-col md:grid md:grid-cols-2">
              {/* field */}
              <div className=" p-2">
                <label
                  htmlFor="l_name"
                  className="font-Poppins text-md block mb-2 "
                >
                  Nom:
                </label>
                <input
                  required
                  value={formData["l_name"]}
                  onChange={inputChange}
                  type="text"
                  name="l_name"
                  id="l_name"
                  className={
                    " transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                  }
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["l_name"]}</span>
                </div>
              </div>
              {/* field */}
              <div className=" p-2">
                <label
                  htmlFor="f_name"
                  className="font-Poppins text-md block mb-2 "
                >
                  Prenom:
                </label>
                <input
                  required
                  value={formData["f_name"]}
                  onChange={inputChange}
                  type="text"
                  name="f_name"
                  id="f_name"
                  className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["f_name"]}</span>
                </div>
              </div>
              {/* field */}
              <div className=" p-2">
                <label
                  htmlFor="email"
                  className="font-Poppins text-md block mb-2  "
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
                  className="w-full sm:w-2/3 md:w-5/6  lg:w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["email"]}</span>
                </div>
              </div>
              {/* field */}
              <div className=" p-2">
                <label
                  htmlFor="tel"
                  className="font-Poppins text-md block mb-2 "
                >
                  Téléphone:
                </label>
                <input
                  required
                  value={formData["tel"]}
                  onChange={inputChange}
                  type="text"
                  name="tel"
                  id="tel"
                  className="w-full sm:w-2/3 md:w-5/6 lg:w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                />
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["tel"]}</span>
                </div>
              </div>
              {/* field */}
              <div className=" p-2">
                <label
                  htmlFor="commune"
                  className="font-Poppins text-md block mb-2 "
                >
                  Commune:
                </label>
                <select
                  onChange={inputChange}
                  type="text"
                  name="commune"
                  id="commune"
                  className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                >
                  <option value=""></option>

                  {communes.map((item, key) => (
                    <option key={key} value={item.id}>
                      {item.nom_fr} - {item.nom_ar}
                    </option>
                  ))}
                </select>
                <div className="error text-sm  text-red-600 pl-[6px]">
                  <span>{errs["commune"]}</span>
                </div>
              </div>
              {/* field */}
              <div className="flex flex-col md:grid md:col-span-2 md:grid-cols-2">
                <div className=" p-2 ">
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
                    className="w-full sm:w-2/3 md:w-5/6 lg:w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                  />
                  <div className="error text-sm  text-red-600 pl-[6px]">
                    <span>{errs["password"]}</span>
                  </div>
                </div>
                <div className="p-2">
                  <label
                    htmlFor="password_confirmation"
                    className="font-Poppins text-md block mb-2 "
                  >
                    Confirmation Mot de passe:
                  </label>
                  <input
                    required
                    onChange={inputChange}
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    className="w-full sm:w-2/3 md:w-5/6 lg:w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                  />
                  <div className="error text-sm  text-red-600 pl-[6px]">
                    <span>{errs["password_confirmation"]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg hover:bg-blue-500 transition-all duration-[.2s]"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </AuthComponent>
    </>
  );
};

export default Register;
