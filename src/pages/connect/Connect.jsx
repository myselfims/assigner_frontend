import React, { useEffect, useState } from "react";
import { FiPlus, FiSend, FiSearch, FiMoreVertical, FiVideo, FiPhone } from "react-icons/fi";
import UsersList from "./UsersList";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import { fetchData } from "@/api";
import { setUser } from "@/store/features/userDetailsSlice";

const Connect = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Imran Brown" },
  ])
  const dispatch = useDispatch()

  useEffect(()=>{
     dispatch(setCurrentPage("Connect"));
    fetchData('/users').then((res)=>{
      setUsers(res)
    })


  },[])

  return (
    <div className="flex  dark:bg-transparent h-[100%] overflow-hidden">
      {/* Users List Sect
      ion */}
      <div className="w-1/3 border-r border-gray-300 dark:">
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-900 dark:text-white"
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
         <ChatBody />
        {selectedUser ? (
          <></>
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
