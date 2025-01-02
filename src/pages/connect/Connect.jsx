import React, { useEffect, useState } from "react";
import { FiPlus, FiSend, FiSearch, FiMoreVertical, FiVideo, FiPhone } from "react-icons/fi";
import UsersList from "./UsersList";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";

const Connect = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch()
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Brown" },
  ];

  useEffect(()=>{
     dispatch(setCurrentPage("Connect"));
  },[])

  return (
    <div className="flex bg-gray-100 h-[90%]">
      {/* Users List Section */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <div className="p-4 border-b bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <UsersList users={users} setSelectedUser={setSelectedUser} />
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-2/3 bg-white">
        {/* Chat Header */}
        {selectedUser && (
          <ChatHeader selectedUser={selectedUser} />
        )}

        {/* Chat Body */}
        {selectedUser ? (
          <ChatBody />
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-400">
            Select a user to start a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Connect;
