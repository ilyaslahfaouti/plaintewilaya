import "./PlaintForm.css";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import {
  validate,
  isObjectEmpty,
  addPlaint,
  getCommunes,
} from "../Dependencies.cjs";
import { redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Links from "../../router/Links";

const PlaintForm = () => {
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [formData, setFormData] = useState({
    commune:"",
    date: "",
    subject: "",
    body: "",
  });
  const [img, setImg] = useState("");
  const [errs, setErrs] = useState({});
  const auth_session_id = useSelector(state => state.user.session_id)
  
  useEffect(()=>{document.title="Créer Une Plainte"});
  useEffect(() => {
    
    const response = async () => {
      const data = await getCommunes();
      setCommunes([...data]);
    };
    response();
  }, []);

  const plaintSubmit = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    const validated = validate({ ...formData });
    
    if (!validated.valid) {
      setErrs({ ...validated.errors });
    } else {
      const data = new FormData();
      data.append("date", formData.date);
      data.append("subject", formData.subject);
      data.append("commune", formData.commune);
      data.append("body", formData.body);
      data.append("auth_session_id",auth_session_id);
      if (img) {
        data.append("img", img);
      }

      const res = await addPlaint(data);
      
      if (res.status === 201) {
        navigate(Links.complaint.success, { state: { ...res.data.complaint } });
      } else {
        if (res.response.data.errors) {
          setErrs({ ...res.response.data.errors });
        }
        if(res.response.data.message){
          navigate(Links.dashboard);
        }
        
      }
    }

    setIsDisable(false);
  };
  const imageChange = (e) => {
    setImg(e.target.files[0]);
  };
  const inputChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setErrs({
      ...errs,
      [name]: "",
    });
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  return (
    <>
      <Header />
      <AuthComponent
        title={
          <div className="title text-center font-Poppins text-l md:text-2xl font-semibold uppercase mb-7">
            <h3>
              Département concerné :<br /> Préfecture d'Agadir Ida-Outanane
            </h3>
          </div>
        }
      >
        <div className="font-Poppins">
          <div className="text-[#D94040] bg-[#FCEAE9] p-2 rounded-md max-w-full md:max-w-[80%] ">
            <h3 className="uppercase text-md font-medium ms-3">attention</h3>
            <p className="text-xs md:text-sm">
              Nous attirons votre attention sur le fait que vos plaintes ne
              seront pas traitées dans les cas suivants :
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm">
              <li>
                Si l'objet est devant le pouvoir judiciaire ou si un jugement
                est rendu en possession de la force de la chose jugée.
              </li>
              <li>
                Si elle ne relève pas du ministère auquel elle est destinée.
              </li>
              <li>
                Si elle comprend un spa, un fourrage ou vers un individu ou un
                corps.
              </li>
            </ul>
          </div>
          <div className="body py-5">
            <h3 className="text-lg font-medium ms-3 uppercase mt-3 ">
              le fond de la demande :{" "}
            </h3>
            <hr className="my-4" />
            <div className="form mt-[3rem]">
              <form onSubmit={plaintSubmit} className="flex flex-col gap-5 ">
                {/* commune field */}
                <div className="flex  flex-col lg:flex-row justify-center  gap-0 lg:gap-3">
                  <label
                    htmlFor="commune"
                    className=" text-md block mb-2 capitalize "
                  >
                    commune :{" "}
                  </label>
                  <div className="">
                    <select
                      onChange={inputChange}
                      type="text"
                      name="commune"
                      id="commune"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 "
                      required
                    >
                      <option value=""></option>

                      {communes.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.nom_fr} - {item.nom_ar}
                        </option>
                      ))}
                    </select>

                    {errs["date"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["commune"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* date field */}
                <div className="flex  flex-col lg:flex-row justify-center  gap-0 lg:gap-3">
                  <label
                    htmlFor="date"
                    className=" text-md block mb-2 capitalize "
                  >
                    Date :{" "}
                  </label>
                  <div className="">
                    <input
                      required
                      value={formData["date"]}
                      onChange={inputChange}
                      type="date"
                      name="date"
                      id="date"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300  md:w-[40rem]"
                    />

                    {errs["date"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["date"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* sujet field */}
                <div className="flex  flex-col lg:flex-row justify-center  gap-0 lg:gap-3">
                  <label
                    htmlFor="subject"
                    className=" text-md block mb-2 capitalize "
                  >
                    Sujet :{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      required
                      value={formData["subject"]}
                      onChange={inputChange}
                      type="text"
                      name="subject"
                      id="subject"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 w-full  md:w-[40rem] "
                    />

                    {errs["subject"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["subject"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* body field */}
                <div className="flex  flex-col lg:flex-row justify-center  gap-0 lg:gap-3">
                  <label
                    htmlFor="body"
                    className=" text-md block mb-2 capitalize "
                  >
                    Le corps :{" "}
                  </label>
                  <div className="flex relative">
                    <textarea
                      required
                      onChange={inputChange}
                      value={formData["body"]}
                      name="body"
                      id="body"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 w-full  md:w-[40rem]  min-h-[10rem]"
                    ></textarea>

                    {errs["body"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["body"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* files field */}
                <div className="flex  flex-col lg:flex-row justify-center gap-0 lg:gap-3">
                  <label
                    htmlFor="files"
                    className=" text-md block mb-2 capitalize "
                  >
                    Image :{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      onChange={imageChange}
                      type="file"
                      name="files"
                      id="files"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 w-full  md:w-[40rem]  "
                    />

                    {errs["img"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["img"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="btn flex justify-end">
                  <button
                    disabled={isDisable}
                    type="submit"
                    className="bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg hover:bg-blue-500 transition-all duration-[.2s] disabled:bg-black"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthComponent>
    </>
  );
};

export default PlaintForm;
