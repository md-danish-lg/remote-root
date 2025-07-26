import React from 'react'

const Filter = ({handleFilter}) => {
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

                
                </div>
              </div>
    </>
  )
}

export default Filter