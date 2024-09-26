import React, { useEffect, useState } from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { getPlaint,dateFormating } from "../Dependencies.cjs";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";

const PlaintDetails = () => {
  const [loading, setLoading] = useState(true);
  const [plainte, setPlainte] = useState({});
  const plaintId = useSelector((state) => state.plaint.plaintId);
  


  useEffect(()=>{document.title="Détail De La Plainte"});
  useEffect(() => {
    const makeRequest = async () => {
      const req = await getPlaint(plaintId).then((res) => setPlainte({ ...res.data[0] }) );
      setLoading(false)
    };
    makeRequest();
  }, []);

  return (
    <>
      <Header />
      {
        !loading ?  <div>
        <AuthComponent title={"plainte details :"}>
          {!plainte ? (
            "Aucune donnée disponible"
          ) : (
            <div className="lg:flex grid grid-rows-2 ">
              
        
              <div className="h-fit">
                <div className="px-6 py-04">
                  <div>
                    <h2 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 uppercase">
                    sujet :
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">{plainte.subject}</p>
                  </div>
                  <div>
                    <h2 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 uppercase">
                    corps :
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      {plainte.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quos exercitationem pariatur modi quibusdam mollitia optio ex facere quod tempore?
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600 text-sm capitalize">la date : {dateFormating(plainte.date)}</p>
                  <p className="text-gray-600 text-sm capitalize">créé au : {dateFormating(plainte.created_at)}</p>
                </div>
                <div className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold text-white capitalize ${
                      plainte.status === "vérifié"
                        ? "bg-green-500"
                        : plainte.status === "annulé"
                        ? "bg-red-500"
                        : "bg-slate-500"
                    } rounded-md`}  
                  >
                    {plainte.status}
                  </span>
                </div>
              </div>
              
              
              {plainte.img && (
                <div className=" w-[80%] l:w-[100%] ">
                  <img
                    className=" object-cover"
                    src={`http://localhost:8000/storage/${plainte.img}`}
                    alt="plainte"
                  />
                </div>
              )}
              
              
            </div>
          )}
        </AuthComponent>
        {plainte.status !== "traitement" ? 
          <AuthComponent title={"affectation administrative :"}>
            {
              plainte.assignment ?
              <p> {plainte.assignment} </p>
              : plainte.status === "vérifié" ?
              <p>
                Vos plaintes ont été examinées et acceptées, elles seront traitées sous peu. Merci de votre bon traitement.
              </p>
              : plainte.status === "annulé" ?
              <p>
                Vos plaintes ont été examinées et rejetées en raison du manque d’information ou de la désinformation, vos plaintes seront examinées sous peu. Merci pour votre bon traitement.
              </p>
              :""
            }
          </AuthComponent>
        :""}
        </div> : ""
      }
    </>
  );
};

export default PlaintDetails;
