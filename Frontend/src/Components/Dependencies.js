import { axiosClient } from "../api/axios";

export const logout = async () => {
  const res = await axiosClient.get("/api/logout");
  localStorage.removeItem("ACCESS_TOKEN");
};
