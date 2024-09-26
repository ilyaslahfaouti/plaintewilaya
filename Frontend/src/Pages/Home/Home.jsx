import "./Home.css";
import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "./../../Components/Header/Header";
import Links from '../../router/Links'

const Home = () => {

  useEffect(()=>{document.title="My Plainte"});

  return (
    <>
      <Header />
      <div>
        <div className="background"></div>
        <div className="shadows-div">
          <div className="container m-auto">
            <div className="hero h-screen flex items-center ">
              <div className="content text-white grid  ">
                <div className="lg:w-2/3 w-full p-2">
                  <h2 className="hero-title text-2xl md:text-5xl leading-tight font-bold font-Poppins py-2 md:py-4 capitalize">
                    Soumettre une plainte, une note ou une suggestion.
                  </h2>
                </div>
                <div className="call-to-action w-full flex flex-col md:flex-row items-start md:items-center  justify-between px-4">
                  <p className="w-full sm:w-2/3 md:w-full text-sm md:text-xl font-light font-Poppins uppercase tracking-wide ">
                    Connectez-vous pour pouvoir vous plaindre à agadir ida outanane
                  </p>
                  <div className="flex gap-2 items-center justify-between">  
                    <Link to={Links.register}>
                      <button className=" font-Poppins font-medium md:text-[1.5rem] py-1 px-4 border-[rgba(0,255,55,0.65)] text-[rgba(0,255,55,0.65)]  rounded-md border-[1px] border-solid ">
                        S'inscrire
                      </button>
                    </Link>
                    <Link to={Links.login}>
                      <button className=" font-Poppins font-medium md:text-[1.5rem] py-1 px-4 bg-[rgba(0,255,55,0.57)] hover:bg-[rgba(0,255,55,0.75)] text-[#ffff]  rounded-md ">
                        Conexion
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
