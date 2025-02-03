import React, { useState } from "react";
import { FiMoreVertical, FiVideo, FiPhone } from "react-icons/fi";

const ChatHeader = ({ selectedUser, headline }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to generate a random color for the placeholder
  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-blue-600", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b dark:bg-gray-900 dark:text-white bg-gray-50">
      {/* Profile Picture or Placeholder */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
            selectedUser?.profilePic ? "" : getRandomColor()
          }`}
          style={{
            backgroundImage: selectedUser?.profilePic ? `url(${selectedUser.profilePic})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!selectedUser?.profilePic && selectedUser?.name[0].toUpperCase()}
        </div>

        {/* User Name */}
        <h2 className="ml-3 text-lg font-medium text-gray-800">{headline}</h2>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <FiVideo className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800" size={20} />
        <FiPhone className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800" size={20} />
        <div className="relative">
          <FiMoreVertical
            className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800"
            size={20}
            onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
          />
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 w-40 p-2 mt-2 bg-white border rounded-md shadow-md">
              <button className="w-full px-2 py-1 text-left hover:bg-gray-100">Option 1</button>
              <button className="w-full px-2 py-1 text-left hover:bg-gray-100">Option 2</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
