import React, { useEffect } from 'react'
import { useState } from 'react'

import Card from './components/Card'

const API_BASE_URL = `https://remotive.com/api/remote-jobs?limit=12`;

const App = () => {

  const [job, setJob] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchJobs = async (query = '') => {

    try {
      const endpoint = query ? `${API_BASE_URL}?search=${query}` : API_BASE_URL;
      const response = await fetch(endpoint);


      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if(data.Respone === 'False') {
        throw new Error('No jobs found');
      }

      setJob(data.jobs);
      console.log(job);

    }catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <div className='main-div '>
      <nav className='flex items-center justify-between px-2'>
        <h1 className='text-4xl font-bold'><a href='#'>RemoteRoot</a></h1>
        <a href="#" className='text-2xl font-bold '>Contact Us</a>

      </nav>
      
      <section className="header mt-20">
        <h1 className='text-6xl font-bold text-center '>RemoteRoot - Jobs Board</h1>
      </section>

      <section className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5   mx-10'>

        {job.map((job) => (
          <Card key={job.id} job={job}/>
        ))}
      </section>



    </div>
  )
}

export default App