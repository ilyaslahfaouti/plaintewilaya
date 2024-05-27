import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="background"></div>
      <div className="shadows-div">
      <div className="container m-auto">
        <div className="hero h-screen flex items-center justify-center">
          <div className="content text-white flex ">
            <div className="w-1/2">
              <h2 className="hero-title text-[55px] leading-tight font-bold font-Poppins py-6 capitalize">
                Soumettre une plainte, une note ou une suggestion.
              </h2>
              <p className="text-[20px] font-light font-Poppins uppercase tracking-wide">
                Connectez-vous pour pouvoir vous plaindre à agadir ida outanane
              </p>
            </div>
            <div className="call-to-action w-1/2 flex flex-row items-end justify-center gap-4">
              <button className=" font-Poppins font-medium text-[1.5rem] py-1 px-4 border-[rgba(0,255,55,0.65)] text-[rgba(0,255,55,0.65)]  rounded-md border-[1px] border-solid ">
                <Link>S'inscrire</Link>
              </button>
              <button className=" font-Poppins font-medium text-[1.5rem] py-1 px-4 bg-[rgba(0,255,55,0.57)] hover:bg-[rgba(0,255,55,0.75)] text-[#ffff]  rounded-md ">
                <Link>Connexion</Link>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      </div>

      
    </>
  );
};

export default Home;
