import React, { useState, useEffect } from "react";
import AuthComponent from "../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import Create from "../../assets/create.jpeg";
import Progress from "../../assets/progress.png";
import { Link } from "react-router-dom";
import { getPlaints, isObjectEmpty } from "../Dependencies.cjs";

const Dashbord = () => {
  const [plaintes, setPlaintes] = useState([]);
  const [hasComplaint, setHasComplaint] = useState(false);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     const req = await getPlaints();
  //     console.log(req);
  //     debugger;
  //     if (!isObjectEmpty(req.data)) {
  //       setPlaintes([...req.data]);
  //       setHasComplaint(true);
  //     } else {
  //       setHasComplaint(false);
  //     }
  //     setLoading(false);
  //   };
  //   makeRequest();
  // }, []);

  return (
    <>
      <Header />
      {/* {loading ? (
        <div className="flex justify-center items-center uppercase font-Poppins ">
          {" "}
          loading
        </div>
      ) : ( */}
        <AuthComponent>
          <div className="content flex justify-around">
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
          </div>
        </AuthComponent>
      {/* )} */}
    </>
  );
};

export default Dashbord;
