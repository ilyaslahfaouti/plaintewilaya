import React, { useEffect, useState } from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { getPlaint } from "../Dependencies.cjs";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";

const PlaintDetails = () => {
  const [plainte, setPlainte] = useState({});
  const plaintId = useSelector((state) => state.plaint.plaintId);
  useEffect(() => {
    const makeRequest = async () => {
      const req = await getPlaint(plaintId).then((res) =>
        setPlainte({ ...res.data[0] })
      );
    };
    makeRequest();
  }, []);

  return (
    <>
      <Header />
      <AuthComponent title={"plainte details"}>
        {plaintId === null ? (
          "no id found"
        ) : (
          <div className="">
            {plainte.img && (
              <div className="px-6 py-4 flex justify-center ">
                <img
                  className="w-[80%]   object-cover"
                  src={`http://localhost:8000/storage/${plainte.img}`}
                  alt="plainte"
                />
              </div>
            )}
            <div className="px-6 py-4">
              <h2 className="text-sm md:text-xl font-semibold text-gray-800 mb-2">
                {plainte.subject}
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                {plainte.body}
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 text-sm">Date: {plainte.date}</p>
              <p className="text-gray-600 text-sm">
                Created At: {plainte.created_at}
              </p>
            </div>
            <div className="px-6 py-4">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold text-white ${
                  plainte.status === "Vérifié"
                    ? "bg-green-500"
                    : plainte.status === "Annulé"
                    ? "bg-red-500"
                    : "bg-slate-700"
                } rounded-full`}
              >
                {plainte.status}
              </span>
            </div>
          </div>
        )}
      </AuthComponent>
    </>
  );
};

export default PlaintDetails;
