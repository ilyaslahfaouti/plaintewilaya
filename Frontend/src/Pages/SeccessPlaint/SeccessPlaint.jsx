import React, { useEffect, useState } from "react";
import "./SeccessPlaint.css";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { useLocation, Link } from "react-router-dom";

const SeccessPlaint = () => {
  const [date, setDate] = useState();
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (state) {
      const dd = new Date(state.created_at);
      setDate(`${dd.getFullYear()}/${dd.getMonth()}/${dd.getDate()}`);
    }
  }, []);

  return (
    <>
      <Header />
      <AuthComponent>
        <div className="container font-Poppins  bg-[#E8E7F9] rounded-md p-5 ">
          <div className="header text-center text-2xl font-medium uppercase  p-5">
            <h3>envoyée</h3>
          </div>
          <div className="body p-20">
            <p className="flex gap-10 capitalize">
              date :<span className="text-[#636363]">{state ? date : ""}</span>
            </p>
            <p className="flex gap-10 capitalize">
              numéro de demande :
              <span className="text-[#636363]">{state ? state.id : ""}</span>
            </p>
          </div>
          <div className="footer">
            <p className="text-sm font-light">
              Veuillez enregistrer ce numéro pour la soumission en cas de suivi
              de commande.
            </p>
            <p className="text-sm font-light">
              Les informations fournies seront vérifiées et votre demande
              examinée.
            </p>
          </div>
        </div>
        <span>
          <Link
            to="/dashbord"
            className="text-[#1C6AA3] italic font-Poppins text-sm underline flex justify-end m-2"
          >
            retourner à la page d’accueil
          </Link>
        </span>
      </AuthComponent>
    </>
  );
};

export default SeccessPlaint;
