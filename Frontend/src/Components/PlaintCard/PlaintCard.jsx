import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlaintId } from "../../store/plaintSlice";

const PlaintCard = ({ data }) => {
  // const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
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
      <div className="border border-slate-300 p-2  rounded-md flex flex-col gap-2 px-5 md:px-10 m-5 font-Poppins capitalize">
        <div className="flex justify-end gap-1 ">
          <button className="p-2 text-xs md:text-base  rounded-md text-slate-500 hover:bg-slate-200 uppercase">
            edit
          </button>
          <button className="p-2 text-xs md:text-base  rounded-md text-red-500 hover:bg-red-100 uppercase">
            delete
          </button>

          <Link to={`/plaint/detail/`}>
            <button
              onClick={() => dispatch(setPlaintId(data.id))}
              className="p-2 text-xs md:text-base rounded-md text-[#5844ef] hover:bg-[#5844ef73] uppercase"
            >
              Detail
            </button>
          </Link>
        </div>
        <div className="content">
          <p className="text-sm md:text-base">
            subject :{" "}
            <span className="text-slate-900 font-light ">{data.subject}</span>
          </p>
          <p className="text-sm md:text-base">
            date : <span className="text-slate-900 font-light ">{date}</span>
          </p>
        </div>
        <div className="complaint_state">
          <p className="text-sm md:text-base py-2">
            la condition :
            {data.status.toLowerCase() === "Vérifié".toLocaleLowerCase() ? (
              <span className="text-green-700 bg-green-200 px-2 rounded-sm capitalize ms-2">
                {data.status}
              </span>
            ) : data.status.toLowerCase() === "Annulé".toLocaleLowerCase() ? (
              <span className="text-red-700 bg-red-200 px-2 rounded-sm capitalize ms-2">
                {data.status}
              </span>
            ) : (
              <span className="text-slate-700 bg-slate-200 px-2 rounded-sm capitalize ms-2">
                {data.status}
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaintCard;
