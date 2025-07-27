import React from "react";
import { useState, useEffect } from "react";

const Filter = ({ handleFilter, categories, onApplyFilter}) => {


  
  const [selectedCategory, setSelectedCategory] = useState("");



  


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative flex flex-col">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-[35px] font-bold mr-5"
            onClick={handleFilter}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-4">Filter Jobs</h3>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">Category</h1>
            <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    <button
                    key={index}
                    className={`px-3 py-1 rounded transition duration-200 ${
                      selectedCategory === category.name
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 hover:bg-gray-300"}`}

                    onClick={() => setSelectedCategory(category.name)}
                    type="button"
                    >
                    {category.name}
                    </button>
                ))}
              
                

            </div>

            <button
              href="#"
              className="text-white font-bold  bg-blue-500 px-5 py-2 text-center rounded-md hover:bg-blue-800 transition-all duration-200 "
              onClick={()=> onApplyFilter(selectedCategory)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
