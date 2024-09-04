import axios from "axios";
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
  const csrf = await axiosClient.get("/sanctum/csrf-cookie");
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

//  Email Verification
export const emailVerify = async () => {
  try {
    const res = await axiosClient.post("api/emailVerify");
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};
//  Add New Complaint
export const addPlaint = async (data) => {
  try {
    const req = await axiosClient.post("/api/complaint/store", data);
    return req;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Get All Complaints
export const getPlaints = async () => {
  try {
    const req = await axiosClient.get("/api/user/plaints");
    return req;
  } catch (error) {
    return error;
  }
};

// Get Single Complaint
export const getPlaint = async (id) => {
  try {
    const req = await axiosClient.get(`/api/plaint/show/${id}`);
    return req;
  } catch (error) {
    return error;
  }
};

export const ipAuthorization = async (id)=>{
  try {
   const res = await axiosClient.get(`/api/session/${id}/ipAuthorization`);
    return res
  } catch (error) {
    console.log(error)
  }
}