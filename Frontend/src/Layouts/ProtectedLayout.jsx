import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { userActons } from "../store/userSlice";
import Links from "../router/Links";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [protectedCase, setProtectedCase] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate(Links.login);
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
        dispatch(userActons.updateUser(res.data));
        if (!res.data.email_verified_at) {
          navigate(Links.verification);
        } else {
          navigate(Links.dashboard);
        }
        setLoading(false);
      } catch (error) {
        console.log("Unauthorized");
      }
      
    };

    fetching();
  }, [protectedCase]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default ProtectedLayout;
