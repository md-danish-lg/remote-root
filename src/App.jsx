import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "./components/Spinner";
import Card from "./components/Card";
import Filter from "./components/Filter";

const API_BASE_URL = `https://remotive.com/api/remote-jobs?limit=12`;

const App = () => {
  const [job, setJob] = useState([]);
  const [loading, setloading] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false)

  const getCategories = async () => {
    const endpoint = "https://remotive.com/api/remote-jobs/categories";
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.jobs);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

  };

  const handleApplyFilter = (category) => {
    fetchJobs("", category);
    setshowFilter(false);
  }



  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const searchQuery = e.target.previousElementSibling.value;
    fetchJobs(searchQuery);
    e.target.previousElementSibling.value = ""; // Clear the input field after search
  };

  const handleFilter = () => {
    setshowFilter(!showFilter);
  };
    
  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter]);

  const fetchJobs = async (query = "", category="", ) => {
    setloading(true);
    setJob([]); // Clear previous jobs before fetching new ones

    try {
      let endpoint = query ? `${API_BASE_URL}&search=${query}` : API_BASE_URL;
      if (query) endpoint += `&search=${query}`;
      if(category) endpoint += `&category=${category}`;
      

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.response === "False") {
        throw new Error("No jobs found");
      }

      setJob(data.jobs);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDarkModeToggle = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(prev => !prev);
  }

  return (
    <div className="main-div dark:bg-gray-900 dark:text-white min-h-screen">
      <nav className="flex items-center justify-between px-2 ">
        <h1 className="text-4xl font-bold">
          <a href="#">RemoteRoot</a>
        </h1>
        <button className="text-xl md:text-5xl font-bold cursor-pointer" onClick={handleDarkModeToggle}>
        {isDarkMode ? "🌞" : " 🌙"}
        </button>
      </nav>

      <section className="header mt-10">
        <h1 className="text-6xl font-bold text-center ">
          RemoteRoot - Jobs Board
        </h1>
        {/* input field for search */}
        <div className="flex justify-center  gap-3 py-10">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="border-2 border-gray-300 rounded-lg p-2 w-1/2 py-3 focus:outline-none focus:border-blue-500 transition duration-200 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <button
            className="bg-blue-500 px-5 py-3 text-white cursor-pointer hover:bg-blue-800 duration-200 rounded-sm "
            onClick={handleClick}
          >
            Search
          </button>
        </div>

        <div className="flex justify-start gap-0 items-center px-20 py-5">
          <button
            className="cursor-pointer px-5 py-2 gap-1 flex items-center font-bold hover:scale-110 duration-200 transition-all"
            onClick={handleFilter}
          >
            <img src={isDarkMode ? "/filter-icon-white.svg" : "/filter-icon.svg"} alt="filter-icon" className="h-5" />
            Filter
          </button>
        </div>
        {showFilter && <Filter handleFilter={handleFilter} categories={categories} onApplyFilter = {handleApplyFilter}/>}
      </section>

      <section className="mt-20mx-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5   ">
            {job.map((job) => (
              <Card key={job.id} job={job} isDarkMode={isDarkMode}/>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
