import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { userActons } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../Dependencies";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { i18n, t } = useTranslation();

  const user = useSelector((state) => state.user);
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
      <header className=" bg-[#ffff] rounded-b-lg z-10">
        <div className="container m-auto">
          <div className=" flex justify-between  items-center ">
            <div className="logo">
              <img src={Logo} alt="logo" className="w-[200px]" />
            </div>
            <div className="md">
              <p className="uppercase font-Poppins">
                {userData ? `${userData.l_name} ${userData.f_name}` : ""}
              </p>
            </div>
            <div className="ri flex gap-[1rem]">
              {userData ? (
                <div>
                  <button
                    onClick={attemptLogout}
                    className="bg-slate-400 rounded-md text-slate-50 py-1 px-2"
                  >
                    logout
                  </button>
                </div>
              ) : (
                ""
              )}
              <select
                id="language-select"
                className="bg-slate-100"
                onChange={switchLang}
              >
                <option value="fr">fr</option>
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
