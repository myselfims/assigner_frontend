import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSend,
  FiSearch,
  FiMoreVertical,
  FiVideo,
  FiPhone,
} from "react-icons/fi";
import UsersList from "./UsersList";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import { fetchData, postData } from "@/api";
import { setUser } from "@/store/features/userDetailsSlice";

const Connect = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentWorkspace } = useSelector((state) => state.workspaceState);
  const { members } = useSelector((state) => state.actionItems);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [unreadCounts, setUnreadCounts] = useState(null);

  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const getMessages = async () => {
    console.log("fetching messages for ", selectedUser?.id);
    try {
      let res = await fetchData(`/chat/${selectedUser?.id}`);
      console.log(res);
      setMessages(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedUser?.id]);

  useEffect(() => {
    dispatch(setCurrentPage("Connect"));
    setFilteredUsers(members);
  }, [members]);

  useEffect(() => {
    // Filter items based on multiple criteria
    const filtered = members?.filter((item) => {
      // Convert search query to lowercase for case-insensitive search
      const q = query.toLowerCase();

      // Check if any property matches the search query
      return (
        item.email.toString().includes(q) || // Search by ID
        item.name.toLowerCase().includes(q)
      );
    });

    setFilteredUsers(filtered);
  }, [query]);

  useEffect(() => {
    fetchData(`/chat/unread-counts`).then((res) => {
      console.log(res);
      setUnreadCounts(res);
    });
  }, []);

  return (
    <div className="flex  dark:bg-transparent h-[100%] overflow-hidden">
      {/* Users List Sect
      ion */}
      <div className="w-1/3 border-r border-gray-300 dark:">
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900">
          <div className="relative">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-900 dark:text-white"
            />
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <UsersList
          setUnreadCounts={setUnreadCounts}
          unreadCounts={unreadCounts}
          users={filteredUsers}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-2/3 bg-white">
        {selectedUser ? (
          <div className="h-full flex flex-col">
            <ChatHeader selectedUser={selectedUser} />

            {/* Render Chat Body */}
            <div className="flex-1 overflow-y-auto bg-red-900">
              <ChatBody
                messages={messages}
                setMessages={setMessages}
                onSend={(message) => setMessages([...messages, message])}
                setUnreadCounts={setUnreadCounts}
              />
            </div>
          </div>
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
