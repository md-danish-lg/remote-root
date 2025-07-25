import React from 'react'

const Card = ({id, job}) => {
    console.log(job)
  return (
    <div className="card shadow-lg bg-black/5 px-5 py-2 hover:scale-104 transition-all duration-200 flex flex-col justify-around">
          <div className="top-card flex items-center justify-between " id={id}>
            
            <div className='px-5 w-[240px] md:w-[350px] '>
              <h3 className='text-sm md:text-2xl lg:text-3xl font-bold'>{job.title}</h3>
              <p>{job.company_name}</p>
            </div>
            <button className=' text-sm md:text-md  bg-blue-500 text-white px-6 py-3 cursor-pointer  hover:bg-blue-800 transition-all duration-100 font-bold rounded-md mt-auto'>View Details</button>
            
          </div>
          <div className='bottom-card flex gap-5 font-bold p-2 mt-2 items-center '>
            <img src="/clock-icon.svg" alt=""  className='h-5 mr-[-10px]'/>
            <p>{(job.job_type == 'full_time') ? "Full Time" : "Part Time"}</p>
            <img src="/location-icon.svg" alt="" className='h-5 mr-[-10px]' />
            <p>{(job.candidate_required_location == 'Worldwide') ? "Remote" : job.candidate_required_location}</p>

          </div>



        </div>
  )
}

export default Card