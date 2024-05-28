import axios from "axios";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";










export const getCommunes = async() => {
  try{
    const res = await fetch('http://localhost:8000/api/communes')
    const data = res.json()
    return data
    
  }catch{
    console.log('err')
  }
  
  
};
const authErrors = (err)=>{
  var errors = {
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    "password_confirmation": "",
  }
  
}
export const validate = (data) => {
  var valid = true;
  var errors = {
    l_name: "",
    f_name: "",
    email: "",
    tel: "",
    commune: "",
    password: "",
    "password_confirmation": "",
  }
  
  for (const key in data){
    if(data[key] === null ){
      valid = false
      errors[key] = "this field is required "
    }
  }
  if(!valid){
    return {valid,"errors":errors}
  }else{
    return {valid,"errors":errors}
  }
  
  
};

export const signup =async (data) => {
  
  const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const res = await response.json();
    
    
    return res
    
  }
  