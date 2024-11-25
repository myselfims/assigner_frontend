import React from 'react'
import { FaUsers } from "react-icons/fa";

const ProjectCard = () => {
  return (
    <div className="border-2 w-72 p-2 rounded-lg hover:shadow-blue-300 cursor-pointer shadow-lg">
    <div className="header flex justify-between">
      <div className="">
        <h1 className='font-semibold text-2xl'>ViziSmart</h1>
        <div className="flex">
          <div className="w-5 h-5 hover:border-2 border-black bg-red-700 mx-1 p-2 flex justify-center rounded-full items-center text-xs">
              M
            </div>
            <p className="text-sm">Karan Khan</p>
        </div>
      </div>
      <button className='flex justify-center items-center'><FaUsers className='w-5 h-5 mr-1'/> 22</button>
    </div>
  </div>
  )
}

export default ProjectCard
