import { useTranslation } from "react-i18next";
import Logo from  "../../assets/logo1.png";

const Header = () => {
  const { i18n,t } = useTranslation();

  const switchLang = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <header className=" bg-red-100 rounded-b-lg ">
        <div className="container m-auto">
        <div className=" flex justify-between  items-center ">
            <div className="logo">
                <img src={Logo} alt="logo" className="w-[200px]" />
            </div>
            <div className="ri">
              <select id="language-select" onChange={switchLang}>
                <option value="en">en</option>
                <option value="ar">ar</option>
                <option value="fr">fr</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
