import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSend,
  FiSearch,
  FiMoreVertical,
  FiVideo,
  FiPhone,
  FiMessageSquare,
  FiFileText,
  FiUsers,
} from "react-icons/fi";
import UsersList from "../connect/UsersList";
import ChatHeader from "../connect/ChatHeader";
import ChatBody from "../connect/ChatBody";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import FileGallery from "./files/FileGallery";
import { fetchData } from "../../api";
import { useParams } from "react-router-dom";
import { TiPinOutline } from "react-icons/ti";
import { FaGripLines } from "react-icons/fa6";
import PinnedMessages from "./pinned_messages/PinnedMessages";

const GroupChat = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const { projectId } = useParams();
  const { project } = useSelector((state) => state.actionItems);
  const [typingUsers, setTypingUsers] = useState([])

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Brown" },
  ];

  const files = [
    {
      id: 1,
      name: "Vacation Photo 1",
      type: "image",
      date: "2024-01-15T08:30:00Z",
      url: "https://via.placeholder.com/150",
      size: "2 MB",
    },
    {
      id: 2,
      name: "Project Proposal.pdf",
      type: "pdf",
      date: "2024-01-10T14:30:00Z",
      url: "https://via.placeholder.com/150",
      size: "1.5 MB",
    },
    {
      id: 3,
      name: "Budget Report.xlsx",
      type: "excel",
      date: "2024-02-20T09:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "500 KB",
    },
    {
      id: 4,
      name: "Team Meeting Video.mp4",
      type: "video",
      date: "2024-02-25T16:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "15 MB",
    },
    {
      id: 5,
      name: "Monthly Newsletter.pdf",
      type: "pdf",
      date: "2024-03-01T11:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "3 MB",
    },
    {
      id: 6,
      name: "Design Mockups.jpg",
      type: "image",
      date: "2024-03-10T10:30:00Z",
      url: "https://via.placeholder.com/150",
      size: "2.5 MB",
    },
    {
      id: 7,
      name: "Invoice 12345.pdf",
      type: "pdf",
      date: "2024-03-15T13:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "1 MB",
    },
    {
      id: 8,
      name: "Client Feedback.txt",
      type: "text",
      date: "2024-04-05T14:30:00Z",
      url: "https://via.placeholder.com/150",
      size: "250 KB",
    },
    {
      id: 9,
      name: "Conference Slides.pptx",
      type: "pptx",
      date: "2024-04-10T12:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "10 MB",
    },
    {
      id: 10,
      name: "Team Outing Photos",
      type: "image",
      date: "2024-05-15T08:00:00Z",
      url: "https://via.placeholder.com/150",
      size: "5 MB",
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage("GroupChat"));
    getMessages();
  }, [dispatch]);

  const getMessages = async () => {
    try {
      let res = await fetchData(`/chat/project/${projectId}`);
      console.log(res)
      setMessages(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const tabs = {
    "files" : <FileGallery files={files}/>,
    "pins" : <PinnedMessages />
  }

  return (
    <div className="flex h-full">
      {/* Left Section: Group Info, Search, and Tabs */}
      <div className="w-1/4 border-r border-gray-300 bg- p-">
        {/* <div className="group-info mb-4">
          <p>5 Active Members</p>
        </div> */}

        {/* Search Bar */}
        <div className="relative px-2 mt-4">
          <input
            type="text"
            placeholder="Search in group..."
            className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute top-3 left-4 text-gray-400" />
        </div>

        {/* Tabs/Buttons */}
        <div className="mt-4 text-sm">
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex w-full items-center py-4 p-4 cursor-pointer hover:bg-gray-100 border-b ${
              activeTab === "messages" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <FiMessageSquare className="inline-block mr-2 w-6 h-6" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`flex w-full items-center py-4 p-4 cursor-pointer hover:bg-gray-100 border-b ${
              activeTab === "members" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <FiUsers className="inline-block mr-2 w-6 h-6" />
            Members
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`flex w-full items-center py-4 p-4 cursor-pointer hover:bg-gray-100 border-b ${
              activeTab === "files" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <FiFileText className="inline-block mr-2 w-6 h-6" />
            Files
          </button>
          <button
            onClick={() => setActiveTab("pins")}
            className={`flex w-full items-center py-4 p-4 cursor-pointer hover:bg-gray-100 border-b ${
              activeTab === "pins" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <TiPinOutline className="inline-block mr-2 w-6 h-6" />
            Pinned Messages
          </button>
          <button
            onClick={() => setActiveTab("statements")}
            className={`flex w-full items-center py-4 p-4 cursor-pointer hover:bg-gray-100 border-b ${
              activeTab === "statements" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <FaGripLines className="inline-block mr-2 w-6 h-6" />
            Statements
          </button>
        </div>
      </div>

      {/* Right Section: Chat Content */}
      <div className="flex flex-col w-3/4">
        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto ">
          {activeTab === "messages" && (
            <div className="h-full flex flex-col">
              {/* Render Chat Header */}
              <ChatHeader
                headline={`${project?.name} - Chat`}
                selectedUser={selectedUser}
                typingUsers={typingUsers}
              />

              {/* Render Chat Body */}
              <div className="flex-1 overflow-y-auto bg-red-900">
                <ChatBody
                  setMessages={setMessages}
                  messages={messages}
                  onSend={addMessage}
                  setTypingUsers={setTypingUsers}
                />
              </div>
            </div>
          )}
          {activeTab === "members" && (
            <div>
              {/* Render list of group members */}
              <ul>
                {users.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
