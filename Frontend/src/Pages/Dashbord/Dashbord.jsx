import React, { useState, useEffect } from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import Create from "../../assets/create.jpeg";
import Progress from "../../assets/progress.png";
import { Link } from "react-router-dom";
import { ipAuthorization } from "../Dependencies.cjs";
import { useSelector } from "react-redux";

const Dashbord = () => {
  const session_id = useSelector(state=>state.user.session_id)
  const [is_ipAuthorize,seIs_ipAuthorize]=useState(true);
  const [reloading ,setReloading ] = useState(true);



  useEffect(()=>{
    const checkIpAuthorization = async ()=>{
      console.log(session_id)
      // debugger;
      const res = await ipAuthorization(session_id);
      seIs_ipAuthorize(res.data.ipAuthorization);
      setReloading(false);
    }
    checkIpAuthorization();
  },[])

  return (
    <>
      <Header />
      {
        !reloading ? 
          <AuthComponent>
          <div className="content flex flex-col items-center md:flex-row  md:justify-around">
            <div className="item p-5">
              <Link to={"/plaints"}>
                <div className="hover:scale-[1.1] transition-all duration-[.3s]">
                  <div className="box border border-solid border-black rounded-md p-1 mb-4">
                    <img
                      className="max-w-[150px] md:max-w-[200px]"
                      src={Progress}
                      alt=""
                    />
                  </div>
                  <div className="boxfooter font-Poppins capitalize text-center text-l md:text-xl">
                    suivi une plainte
                  </div>
                </div>
              </Link>
            </div>
            { 
              is_ipAuthorize ? 
              <div className="item p-5">
              <Link to={"/plaint/create"}>
                <div className="hover:scale-[1.1] transition-all duration-[.3s]">
                  <div className="box border border-solid border-black rounded-md p-1 mb-4 ">
                    <img
                      className="max-w-[150px] md:max-w-[200px]"
                      src={Create}
                      alt=""
                    />
                  </div>
                  <div className="boxfooter font-Poppins capitalize text-center text-l md:text-xl">
                    <p>créer une plainte</p>
                  </div>
                </div>
              </Link>
            </div>
            : ''
            }
          </div>
        </AuthComponent>
      : ''
      }
    </>
  );
};

export default Dashbord;
