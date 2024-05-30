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
  var errors = {
    // l_name: "",
    // f_name: "",
    // email: "",
    // tel: "",
    // commune: "",
    // password: "",
    // password_confirmation: "",
  };

  for (const key in data) {
    if (data[key] === "") {
      valid = false;
      errors = {
        ...errors,
        [key]: "this field is required",
      };
      // errors[key] = "this field is required ";
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
    const res = await axiosClient.post("/api/register", data).catch((e) => {
      console.log("cat erroro");
    });
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

export const  emailVerify = async ()=>{
  try {
    const user = await axiosClient.get('/api/user');
    const res = await axiosClient.post('/emailVerify',user.data)
    console.log(res)
    
  } catch (error) {
    return error
  }
 
}
