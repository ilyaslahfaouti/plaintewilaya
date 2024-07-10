import React, { useEffect, useState } from "react";
import AuthComponent from "./../../Components/AuthComponent/AuthComponent";
import Header from "../../Components/Header/Header";
import PlaintCard from "../../Components/PlaintCard/PlaintCard";
import { getPlaints } from "../Dependencies.cjs";

const Plaints = () => {
  const [loading, setLoading] = useState(true);
  const [plaintes, setPlaintes] = useState([]);
  const [error, setError] = useState("no Data Found");
  useEffect(() => {
    const makeRequest = async () => {
      const req = await getPlaints().then((res) => {
        setPlaintes([...res.data]);
      });
    };
    makeRequest();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <AuthComponent title={"les plaintes"}>
        <div className="container ">
          {loading
            ? "loading"
            : plaintes.length > 0
            ? plaintes.map((item, key) => <PlaintCard data={item} key={key} />)
            : error}
        </div>
      </AuthComponent>
    </>
  );
};

export default Plaints;
