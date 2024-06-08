import "./Plaint.css";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import {
  validate,
  isObjectEmpty,
  addPlaint,
  getCommunes,
} from "../Dependencies.cjs";
import { useNavigate } from "react-router-dom";
import SeccessPlaint from "../SeccessPlaint/SeccessPlaint";

const Plaint = () => {
  const navigate = useNavigate();
  const [communes, setCommunes] = useState([]);
  const [formData, setFormData] = useState({
    // status: "",
    date: "",
    subject: "",
    body: "",
    commune: "",
  });
  const [errs, setErrs] = useState({});
  const [img, setImg] = useState("");

  useEffect(() => {
    const response = async () => {
      const data = await getCommunes();
      setCommunes([...data]);
    };
    response();
  }, []);

  const plaintSubmit = async (e) => {
    e.preventDefault();

    const validated = validate({ ...formData });

    if (!validated.valid) {
      setErrs({ ...validated.errors });

      return false;
    } else {
      let data = { ...formData };
      if (img) {
        data["img"] = img;
      }

      // const fd = new FormData(); // make object of the complaint Form Data
      // fd.append("commune", formData.commune);
      // fd.append("date", formData.date);
      // fd.append("subject", formData.subject);
      // fd.append("body", formData.body);
      // if (img) {
      //   fd.append("img", img);
      // }

      const res = await addPlaint(data);
      if (res.status === 201) {
        navigate("/seccess", { state: { ...res.data.complaint } });
        return;
      } else {
        if (res.response.data.errors) {
          setErrs({ ...res.response.data.errors });
        }
      }
    }
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
          <div className="title text-center font-Poppins text-2xl font-semibold uppercase mb-7">
            <h3>
              Département concerné :<br /> Préfecture d'Agadir Ida-Outanane
            </h3>
          </div>
        }
      >
        <div className="font-Poppins">
          <div className="attention text-[#D94040] bg-[#FCEAE9] p-2 rounded-md max-w-[80%] ">
            <h3 className="uppercase text-md font-medium ms-3">attention</h3>
            <p className="text-sm">
              Nous attirons votre attention sur le fait que vos plaintes ne
              seront pas traitées dans les cas suivants :
            </p>
            <ul className="list-disc list-inside text-sm">
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
              <form onSubmit={plaintSubmit} className="flex flex-col gap-10 ">
                {/* status field */}
                {/* <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="status"
                    className=" text-md block mb-2 capitalize "
                  >
                    type :{" "}
                  </label>
                  <div className="flex relative">
                    <select
                      required
                      onChange={inputChange}
                      value={formData["status"]}
                      name="status"
                      id="status"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem]"
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>

                    <span className="text-sm  text-red-600 pl-[6px] absolute right-0 translate-x-[100%]">
                      {errs["status"] ? errs["status"] : ""}
                    </span>
                  </div>
                </div> */}
                {/* commune field */}
                <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="commune"
                    className=" text-md block mb-2 capitalize "
                  >
                    commune :{" "}
                  </label>
                  <div className="">
                    <select
                      required
                      onChange={inputChange}
                      value={formData["commune"]}
                      name="commune"
                      id="commune"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem]"
                    >
                      <option></option>
                      {communes.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.nom_fr}
                        </option>
                      ))}
                    </select>

                    {errs["commune"] ? (
                      <span className="text-sm  text-red-600 pl-[6px] mt-[6px] block">
                        {errs["commune"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* date field */}
                <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="date"
                    className=" text-md block mb-2 capitalize "
                  >
                    date :{" "}
                  </label>
                  <div className="">
                    <input
                      required
                      value={formData["date"]}
                      onChange={inputChange}
                      type="date"
                      name="date"
                      id="date"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem]"
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
                <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="subject"
                    className=" text-md block mb-2 capitalize "
                  >
                    sujet :{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      required
                      value={formData["subject"]}
                      onChange={inputChange}
                      type="text"
                      name="subject"
                      id="subject"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem]"
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
                <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="body"
                    className=" text-md block mb-2 capitalize "
                  >
                    le corp :{" "}
                  </label>
                  <div className="flex relative">
                    <textarea
                      required
                      onChange={inputChange}
                      value={formData["body"]}
                      name="body"
                      id="body"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem] min-h-[10rem]"
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
                <div className="flex justify-center items-start gap-3">
                  <label
                    htmlFor="files"
                    className=" text-md block mb-2 capitalize "
                  >
                    pièces jointes :{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      onChange={imageChange}
                      type="file"
                      name="files"
                      id="files"
                      className=" transition-all duration-[.3s] outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-md px-3 py-[2px] border border-gray-300 min-w-[40rem] "
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
                    type="submit"
                    className="bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg hover:bg-blue-500 transition-all duration-[.2s]"
                  >
                    submit
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

export default Plaint;
