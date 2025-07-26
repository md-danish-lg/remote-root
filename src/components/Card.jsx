import React, {useEffect} from "react";
import { useState } from "react";

const Card = ({ id, job }) => {
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const cardContent = (
    <div className="card shadow-lg bg-black/5 px-5 py-2 hover:scale-104 transition-all duration-200 flex flex-col justify-around">
      <div className="top-card flex items-center justify-between " id={id}>
        <div className="px-5 w-[240px] md:w-[350px] ">
          <h3 className="text-sm md:text-2xl lg:text-3xl font-bold">
            {job.title}
          </h3>
          <p>{job.company_name}</p>
        </div>
        <button
          className=" text-sm md:text-md  bg-blue-500 text-white px-6 py-3 cursor-pointer  hover:bg-blue-800 transition-all duration-100 font-bold rounded-md mt-auto"
          onClick={handleClick}
        >
          View Details
        </button>
      </div>
      <div className="bottom-card flex gap-5 font-bold p-2 mt-2 items-center ">
        <img src="/clock-icon.svg" alt="" className="h-5 mr-[-10px]" />
        <p>{job.job_type == "full_time" ? "Full Time" : "Part Time"}</p>
        <img src="/location-icon.svg" alt="" className="h-5 mr-[-10px]" />
        <p>
          {job.candidate_required_location == "Worldwide"
            ? "Remote"
            : job.candidate_required_location}
        </p>
      </div>
    </div>
  );
  return (
    <>
      {cardContent}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-[35px] font-bold mr-5"
              onClick={handleClose}
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
            <p className="mb-2">{job.company_name}</p>

            <div className="flex font-bold gap-4 mb-2 items-center">
              <img src="/clock-icon.svg" alt="" className="h-5 mr-[-10px]" />
        <p>{job.job_type == "full_time" ? "Full Time" : "Part Time"}</p>
        <img src="/location-icon.svg" alt="" className="h-5 mr-[-10px]" />
        <p>
          {job.candidate_required_location == "Worldwide"
            ? "Remote"
            : job.candidate_required_location}
        </p>
            </div>
            
            <div  className="mb-4 max-h-64 overflow-y-auto" dangerouslySetInnerHTML={{__html: job.description}}></div>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold  bg-blue-500 px-5 py-2 text-center rounded-md hover:bg-blue-800 transition-all duration-200 "
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
