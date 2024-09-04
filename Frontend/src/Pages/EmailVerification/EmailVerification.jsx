import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import { emailVerify } from "../Dependencies.cjs";
const EmailVerification = () => {
  const [countdownTime, setCountdownTime] = useState(
    localStorage.getItem("LAST_EMAIL_VERIFICATION")
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const buttonClick = async () => {
    setIsDisabled(true);
    const verifyRequest = await emailVerify();
    if (verifyRequest.status === 200) {
      localStorage.setItem("LAST_EMAIL_VERIFICATION", new Date().toISOString());
    } else {
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    if (countdownTime) {
      const timeDiff = Date.now() - new Date(countdownTime).getTime();
      if (timeDiff < 5 * 60 * 60 * 1000) {
        setIsDisabled(true);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <AuthComponent title={"verification"}>
        <div className="content font-Poppins ">
          <p className="max-w-[60%] text-xs md:text-base ">
            {isDisabled
              ? "Nous avons envoyé un lien de vérification à votre courriel. Veuillez vérifier votre boîte de réception pour compléter le processus de vérification de votre compte. Merci"
              : "cliquez sur le bouton pour envoyer un e-mail avec le lien de vérification à votre e-mail "}
          </p>
          <div className="footer flex justify-between flex-col sm:flex-row mt-5">
            <p className="font-Poppins text-xs md:text-base">
              {isDisabled
                ? "Si vous n'avez pas reçu le lien de vérification"
                : ""}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col items-center"
            >
              <button
                onClick={buttonClick}
                disabled={isDisabled}
                className={` hover:bg-blue-400 ${
                  isDisabled ? "bg-blue-400" : "bg-blue-600"
                } text-[#ffff] capitalize font-poppins font-medium p-1 px-3 rounded-md text-lg transition-all duration-[.2s] `}
              >
                {isDisabled ? "envoyé" : "renvoyer"}
              </button>
              <span className="text-xs md:text-base">
                {isDisabled ? "le courriel a été envoyé " : ""}
              </span>
            </form>
          </div>
        </div>
      </AuthComponent>
    </>
  );
};

export default EmailVerification;
