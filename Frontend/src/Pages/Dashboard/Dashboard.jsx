import React, { useState, useEffect } from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import Create from "../../assets/create.jpeg";
import Progress from "../../assets/progress.png";
import { Link } from "react-router-dom";
import { ipAuthorization } from "../Dependencies.cjs";
import { useSelector } from "react-redux";
import Links from "../../router/Links"

const Dashboard = () => {
  const session_id = useSelector(state=>state.user.session_id)
  const [is_ipAuthorize,setIs_ipAuthorize]=useState(true);
  const [loading ,setLoading ] = useState(true);

  useEffect(()=>{document.title="General"});

  useEffect(()=>{
    const checkIpAuthorization = async ()=>{
      try {
        const res = await ipAuthorization(session_id);
        setIs_ipAuthorize(res.data.ipAuthorization);
      } catch (error) {
        console.log(error.response.data)
        setIs_ipAuthorize(0);
      } finally{
        setLoading(false);
      }
    }
    checkIpAuthorization();
  },[])

  return (
    <>
      <Header />
      {
        !loading ? 
          <AuthComponent>
          <div className="content flex flex-col items-center md:flex-row  md:justify-around">
            <div className="item p-5">
              <Link to={Links.complaint.index}>
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
              <Link to={Links.complaint.create}>
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

export default Dashboard;
