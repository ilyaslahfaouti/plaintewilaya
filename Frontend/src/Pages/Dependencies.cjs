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
const authErrors = (err) => {
  var errors = {
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    password_confirmation: "",
  };
};
export const validate = (data) => {
  var valid = true;
  var errors = {
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    password_confirmation: "",
  };

  for (const key in data) {
    if (data[key] === "") {
      valid = false;
      errors[key] = "this field is required ";
    }
  }
  if (!valid) {
    return { valid, errors: errors };
  } else {
    return { valid };
  }
};

export const signup = async (data) => {
  const csrf = await axiosClient.get("/sanctum/csrf-cookie");
  try {
    const res = await axiosClient
      .post("/api/register", data)
    return res;
  } catch (error) {
    return error
  }
  
 
  
};
