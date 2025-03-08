import React, { useState } from "react";
import { FiMoreVertical, FiVideo, FiPhone } from "react-icons/fi";
import TypingIndicator from "./TypingIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import UserInfoCard from "./UserInfoCard";
import GroupInfoCard from "../group_chat/GroupInfoCard";
import CustomAvatar from "@/components/Avatar";
import { getInitials } from "@/globalFunctions";

const ChatHeader = ({ selectedUser, heading, typingUsers }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b dark:bg-gray-900 dark:text-white bg-gray-50">
      {/* Profile Picture or Placeholder */}
      <div className="flex items-center">
        <CustomAvatar src={selectedUser?.avatar} fallback={heading ? getInitials(heading) : getInitials(selectedUser?.name)}/>

        {/* User Name */}
        <div className="ml-3 justify-between relative">
          <h2
            onClick={() => setShowInfo(true)}
            className="font-medium text-lg text-gray-800 cursor-pointer"
          >
            {heading ? heading : selectedUser?.name}
          </h2>
          {typingUsers?.length > 0 && (
            <TypingIndicator typingUsers={typingUsers} />
          )}
          {showInfo && (
            heading ?
            <GroupInfoCard onClose={()=>setShowInfo(false)}/>
           : 
            <UserInfoCard
              user={selectedUser}
              onClose={() => setShowInfo(false)}
            />
          )}
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <FiVideo
          className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800"
          size={20}
        />
        <FiPhone
          className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800"
          size={20}
        />
        <div className="relative">
          <FiMoreVertical
            className="text-gray-600 dark:text-gray-100 cursor-pointer hover:text-gray-800"
            size={20}
            onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
          />
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 w-40 p-2 mt-2 bg-white border rounded-md shadow-md">
              <button className="w-full px-2 py-1 text-left hover:bg-gray-100">
                Option 1
              </button>
              <button className="w-full px-2 py-1 text-left hover:bg-gray-100">
                Option 2
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
