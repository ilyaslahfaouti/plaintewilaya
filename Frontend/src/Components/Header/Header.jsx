import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { userActons } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../Dependencies";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { i18n, t } = useTranslation();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  });

  const switchLang = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };
  const attemptLogout = async () => {
    dispatch(userActons.forgetUser());
    const res = await logout();
    navigate("/login");
  };
  return (
    <>
      <header className=" bg-[#ffff] rounded-b-lg z-10 ">
        <div className="container m-auto">
          <div className=" flex justify-between  items-center px-2 gap-1 ">
            <div className="logo">
              <Link to={"/"}>
                <img
                  src={Logo}
                  alt="logo"
                  className=" w-[130px] sm:w-[170px] md:w-[200px]"
                />
              </Link>
            </div>
            <div className="md">
              <p className="uppercase font-Poppins text-xs md:text-base">
                {userData ? `${userData.l_name} ${userData.f_name}` : ""}
              </p>
            </div>
            <div className="ri flex gap-[1rem]">
              {userData ? (
                <div>
                  <button
                    onClick={attemptLogout}
                    className="bg-[#e9f0f9] rounded-md text-slate-950  py-1 px-2 text-xs md:text-base"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                ""
              )}
              
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
