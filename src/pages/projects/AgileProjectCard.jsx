import { formatDate } from "../../globalFunctions";
import React from "react";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const AgileProjectCard = ({ project }) => {
  const {
    id,
    name,
    lead,
    teamSize,
    startDate,
    status,
    sprintInfo,
    tasks,
    priority,
  } = project;

  const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/project/${id}/action-items`)} className="w-[90%] p-4 my-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg cursor-pointer">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <div className="flex my-2 justify-between">
        <div className="flex ">
            <div className="w-5 h-5 hover:border-2 border-black bg-red-700 mr-1 p-2 flex justify-center rounded-full items-center text-xs">
            M
            </div>
            <p className="text-sm">Karan Khan</p>

        </div>

         </div>
      <div className="flex justify-between">
        <p className="text-gray-600 text-sm">Team Size: {teamSize}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p
            className={`text-sm font-medium ${
            status === "Ongoing" ? "text-blue-500" : "text-green-500"
            }`}
        >
            Status: {status}
        </p>
        <p
            className={`text-sm font-medium ${
            priority === "High"
                ? "text-red-500"
                : priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
        >
            Priority: {priority}
        </p>

      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Current Sprint Info:</h3>
        <p className="text-gray-600 text-sm">{sprintInfo}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Tasks:</h3>
        <p className="text-gray-600 text-sm">
          {/* {tasks.completed} completed / {tasks.total} total */}
        </p>
        <p className="text-gray-600 text-sm text-end">{formatDate(startDate)}</p>
      </div>
    </div>
  );
};

export default AgileProjectCard;
