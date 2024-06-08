import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { userActons } from "../store/userSlice";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [protectedCase, setProtectedCase] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate("/login");
      return;
    } else {
      if (!user) {
        setProtectedCase(true);
      }
    }
  }, []);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axiosClient.get("/api/user");
        dispatch(userActons.saveUser(res.data));
        if (!res.data.email_verified) {
          navigate("/verification");
        } else {
          navigate("/dashbord");
        }
        setLoading(false);
      } catch (error) {
        console.clear()
      }
    };

    fetching();
  }, [protectedCase]);

  return (
    <>
      {loading ? (
        "...loading"
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default ProtectedLayout;
