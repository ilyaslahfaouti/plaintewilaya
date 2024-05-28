import React from "react";

const NotFound = ({ errMessage }) => {
  
  return (
  <div className="text-xl flex justify-center items-center h-screen">
    {
      errMessage ? errMessage : 'Page Note Found'
    }
  </div>
);
};

export default NotFound;
