import React from "react";
import Header from "./../../Components/Header/Header";
import { useState, useEffect } from "react";
import { getCommunes, validate, signup } from "./../Dependencies.cjs";
import "./Register.css";
import { axiosClient } from "../../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [communes, setCommunes] = useState([]);
  const [formData, setFormData] = useState({
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    "password_confirmation": "",
  });
  const [errs, setErrs] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetching = async () => {
      const data = await getCommunes();
      setCommunes([...data]);
    };
    fetching();
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
          "the confirmation password not match the given password";
      } else {
        errs["password_confirmation"] = "";
      }
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
  };
  const btnClick =async () => {
    const validated = validate(formData);
    if (!validated.valid) {
      setErrs({ ...validated.errors });
    } else {
      try {
        const res = await signup(formData);
        
        if(res.errors){
          setErrs({...res.errors})
        }else{
          navigate('/verification')
        }
      } catch (e) {
        console.log(e);
      }
    }
    
  };

  return (
    <>
      <Header />
      <section className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center">
        <div className="container">
          <div className="form-holder bg-[#ffff] rounded-md px-[3rem] pb-10 mx-[4rem] ">
            <div className="title text-3xl  font-bold font-Poppins py-6 capitalize">
              <h2>inscription</h2>
            </div>
            <div className="form  ">
              <form action="" onSubmit={handelSubmit}>
                <div action="" className="grid grid-cols-2 ">
                  <div className="pl-3 ">
                    <label
                      htmlFor="l_name"
                      className="font-Poppins text-md block "
                    >
                      Nom
                    </label>
                    <input
                      required
                      value={formData["l_name"]}
                      onChange={inputChange}
                      type="text"
                      name="l_name"
                      id="l_name"
                      className={
                        " transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 $ "
                      }
                    />
                    <div className="error text-sm  text-red-600 pl-[6px]">
                      <span>{errs["l_name"]}</span>
                    </div>
                  </div>
                  <div className="pl-3">
                    <label
                      htmlFor="f_name"
                      className="font-Poppins text-md block "
                    >
                      Prenom
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
                  <div className="pl-3">
                    <label
                      htmlFor="email"
                      className="font-Poppins text-md block  "
                    >
                      email
                    </label>
                    <input
                      required
                      value={formData["email"]}
                      onChange={inputChange}
                      type="text"
                      name="email"
                      id="email"
                      className="w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                    />
                    <div className="error text-sm  text-red-600 pl-[6px]">
                      <span>{errs["email"]}</span>
                    </div>
                  </div>
                  <div className="pl-3">
                    <label
                      htmlFor="tel"
                      className="font-Poppins text-md block "
                    >
                      tel
                    </label>
                    <input
                      required
                      value={formData["tel"]}
                      onChange={inputChange}
                      type="text"
                      name="tel"
                      id="tel"
                      className="w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                    />
                    <div className="error text-sm  text-red-600 pl-[6px]">
                      <span>{errs["tel"]}</span>
                    </div>
                  </div>

                  <div className="pl-3">
                    <label
                      htmlFor="commune"
                      className="font-Poppins text-md block "
                    >
                      commune
                    </label>
                    <select
                      onChange={inputChange}
                      type="text"
                      name="commune"
                      id="commune"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                    >
                      <option>----</option>

                      {communes.map((item, key) => (
                        <option key={key} value={item.commune_id}>
                          {item.nom_ar}
                          
                        </option>
                      ))}
                    </select>
                    <div className="error text-sm  text-red-600 pl-[6px]">
                      <span>{errs["commune"]}</span>
                    </div>
                  </div>

                  <div className="grid col-span-2 grid-cols-2">
                    <div className="pl-3 ">
                      <label
                        htmlFor="password"
                        className="font-Poppins text-md block "
                      >
                        password
                      </label>
                      <input
                        required
                        onChange={inputChange}
                        type="password"
                        name="password"
                        id="password"
                        className="w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                      />
                      <div className="error text-sm  text-red-600 pl-[6px]">
                        <span>{errs["password"]}</span>
                      </div>
                    </div>
                    <div className="pl-3">
                      <label
                        htmlFor="password_confirmation"
                        className="font-Poppins text-md block "
                      >
                        confirmation password
                      </label>
                      <input
                        required
                        onChange={inputChange}
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="w-1/2 transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                      />
                      <div className="error text-sm  text-red-600 pl-[6px]">
                        <span>{errs["password_confirmation"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={btnClick}
                    type="submit"
                    className="bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg hover:bg-blue-500 transition-all duration-[.2s]"
                  >
                    s'inscrire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
