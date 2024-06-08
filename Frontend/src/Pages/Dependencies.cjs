import { axiosClient } from "../api/axios";

export const getCommunes = async () => {
  try {
    const csrf = await axiosClient.get("/sanctum/csrf-cookie");
    const res = await fetch("http://localhost:8000/api/communes");
    const data = res.json();
    return data;
  } catch {
    console.log("err");
  }
};

export const validate = (data) => {
  var valid = true;
  var errors = {};

  for (const key in data) {
    if (data[key].trim() == "" || data[key].trim() == null) {
      valid = false;
      errors = {
        ...errors,
        [key]: "this field is required",
      };
    }
  }
  if (!valid) {
    return { valid, errors: errors };
  } else {
    return { valid };
  }
};
const getCsrf = async () => await axiosClient.get("/sanctum/csrf-cookie"); //you can use it after in each of signup and loginin functions

export const signup = async (data) => {
  // const csrf = await axiosClient.get("/sanctum/csrf-cookie");
  try {
    const res = await axiosClient.post("/api/register", data);

    return res;
  } catch (error) {
    return error;
  }
};

export const loginin = async (data) => {
  const csrf = await axiosClient.get("/sanctum/csrf-cookie");
  try {
    const res = await axiosClient.post("/api/login", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const emailVerify = async () => {
  try {
    const user = await axiosClient.get("/api/user");
    const res = await axiosClient.post("/emailVerify", user.data);
    console.log(res);
  } catch (error) {
    return error;
  }
};
export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};
export const addPlaint = async (data) => {
  try {
    const req = await axiosClient.post("api/complaint/store", data);

    return req;
  } catch (err) {
    return err;
  }
};
