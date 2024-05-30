import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import {emailVerify } from '../Dependencies.cjs'
const EmailVerification = () => {
  const [countdownTime, setCountdownTime] = useState(5);
  const [resendAbility, setResendAbility] = useState(true);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setResendAbility(true);
    setCountdownTime(3600);
    const verifyRequest = await emailVerify();
  };
  useEffect(() => {
    if (countdownTime > 0) {
      const timer = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setResendAbility(false);
    }
  }, [countdownTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <Header />
      <AuthComponent titile={"verification"}>
        <div className="content font-Poppins ">
          <p className="max-w-[60%]">
            Nous avons envoyé un lien de vérification à votre courriel. Veuillez
            vérifier votre boîte de réception pour compléter le processus de
            vérification de votre compte. Merci!
          </p>
          <div className="footer flex justify-between mt-5">
            <p className="font-Poppins text-sm">
              Si vous n'avez pas reçu le lien de vérification
            </p>
            <form onSubmit={onSubmit} action="" className="flex flex-col items-center">
              <button
                
                disabled={resendAbility}
                className={`bg-blue-600 text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg transition-all duration-[.2s] ${!resendAbility ? `bg-blue-600  hover:bg-blue-500` : `bg-blue-400`}`}
              >
                renvoyer
              </button>
              <span>{resendAbility ?formatTime(countdownTime) :''}</span>
            </form>
          </div>
        </div>
      </AuthComponent>
    </>
  );
};

export default EmailVerification;
