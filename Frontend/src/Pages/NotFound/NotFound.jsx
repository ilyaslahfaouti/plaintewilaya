import React,{useEffect} from "react";

const NotFound = ({ errMessage }) => {
  useEffect(()=>{document.title="Not Found"});
  return (
  <div className="text-xl flex justify-center items-center h-screen">
    {
      errMessage ? errMessage : 'Page Note Found'
    }
  </div>
);
};

export default NotFound;
