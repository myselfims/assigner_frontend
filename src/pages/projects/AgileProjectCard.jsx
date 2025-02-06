import { formatDate } from "../../globalFunctions";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

const AgileProjectCard = ({ project }) => {
  const { id, name, leadUser, teamSize, startDate, status, priority, budget, deadline, description, role } = project;
  const navigate = useNavigate();

  // Status colors
  const statusColors = {
    Ongoing: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
  };

  // Priority colors
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  // Get initials from leadUser name
  const getInitials = (name) => name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "?";

  return (
    <div
      onClick={() => navigate(`/project/${id}/action-items`)}
      className="w-[90%] p-5 my-4 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl cursor-pointer transition-all duration-300"
    >
      {/* Project Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {/* Lead User & Role */}
      <div className="flex items-center mt-2">
        <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full text-sm font-semibold mr-2">
          {getInitials(leadUser?.name)}
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">{leadUser?.name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>

      {/* Team Size & Priority */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-600 flex items-center">
          <PiUsersThreeDuotone className="text-gray-500 mr-1" /> Team: {teamSize}
        </p>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
          Priority: {priority}
        </span>
      </div>

      {/* Budget & Deadline (Conditionally Rendered) */}
      <div className="mt-3 flex justify-between">
        {role === "Created by You" && (
          <p className="text-sm text-gray-600 flex items-center">
            <MdAttachMoney className="text-green-500 mr-1" /> Budget: ${budget}
          </p>
        )}
        {deadline && (
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <FaRegCalendarAlt className="text-red-500 mr-1" /> Deadline: {formatDate(deadline)}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-800">Description:</h3>
        <p className="text-xs text-gray-600 truncate">{description || "No description provided."}</p>
      </div>

      {/* Start Date */}
      <p className="text-xs text-gray-500 text-end mt-4">
        Start Date: {formatDate(startDate)}
      </p>
    </div>
  );
};

export default AgileProjectCard;
