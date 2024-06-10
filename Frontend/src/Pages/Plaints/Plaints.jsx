import React, { useEffect, useState } from "react";
import AuthComponent from "./../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import PlaintCard from "../../Components/PlaintCard/PlaintCard";
import { getPlaints } from "../Dependencies.cjs";

const Plaints = () => {
  const [plaint, setPlaint] = useState(null);
  const [error, setError] = useState("no Data Found");
  useEffect(() => {
    const makeRequest = async () => {
      const req = await getPlaints();
      setPlaint(req.data);
    };
    makeRequest();
  }, []);

  return (
    <>
      <Header />
      <AuthComponent title={"les plaintes"}>
        <div className="container ">
          {plaint ? <PlaintCard data={plaint} /> : error}
        </div>
      </AuthComponent>
    </>
  );
};

export default Plaints;
