import React from "react";

const PlaintCard = ({ data }) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = `${new Date(data.created_at).getDate()}/${
    month[new Date(data.created_at).getMonth()]
  }/${new Date(data.created_at).getFullYear()} `;
  return (
    <>
      <div className="border border-slate-300 p-5 rounded-md flex flex-col gap-2 px-10 m-5 font-Poppins capitalize">
        <div className="flex justify-end gap-1 ">
          <button className="p-2  rounded-md text-slate-500 hover:bg-slate-200 uppercase">
            edit
          </button>
          <button className="p-2  rounded-md text-red-500 hover:bg-red-100 uppercase">
            delete
          </button>
        </div>
        <div className="content">
          <p>
            subject : <span>{data.subject}</span>
          </p>
          <p>
            date : <span>{date}</span>
          </p>
        </div>
        <div>
          <p>
            la condition :{" "}
            <span className="text-slate-700 bg-slate-200 px-4 rounded-sm capitalize">
              En Attente ...
            </span>
          </p>
          <p className="capitalize">
            la condition :{" "}
            <span className="text-red-700 bg-red-200 px-4 rounded-sm capitalize">
              annulé
            </span>
          </p>
          <p>
            la condition :{" "}
            <span className="text-green-700 bg-green-200 px-4 rounded-sm capitalize">
              vérifié
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaintCard;
