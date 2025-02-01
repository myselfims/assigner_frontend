import React, { useState, useEffect } from "react";
import { FiChevronDown, FiPlus, FiSend } from "react-icons/fi";
import MessageCard from "./MessageCard";
import { postData } from "../../api";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import TypingIndicator from "./TypingIndicator";
import { debounce } from "lodash";

const socket = io("http://localhost:3000"); // Replace with your server URL

const ChatBody = ({ onSend, messages }) => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState(messages || []);
  const { user } = useSelector((state) => state.globalState);
  const { projectId } = useParams();
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    console.log('joingi chat')
    socket.emit("join:chat", projectId);

    const handleMessage = (newMessage) => {
      console.log("Received:", newMessage);
      setMessagesList((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleTyping = (name) => {
      console.log("Typing:", name);
      setTypingUsers((prev) => (!prev.includes(name) ? [...prev, name] : prev));

      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((username) => username !== name));
      }, 3000);
    };

    // Remove old listeners before adding new ones
    socket.off("message", handleMessage);
    socket.off("typing", handleTyping);

    // Attach new listeners
    socket.on("message", handleMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.emit("leave:chat", projectId);
      socket.off("message", handleMessage);
      socket.off("typing", handleTyping);
    };
  }, [projectId]);

  const handleSendMessage = async () => {
    if (!message) return;

    try {
      const data = {
        type: "text",
        projectId: parseInt(projectId),
        content: message,
        senderId: user?.id,
        sender: user,
      };

      // Save message to the server via HTTP API (optional)
      let res = await postData("/chat", data);
      console.log(res);

      // Clear the input field
      setMessage("");

      // Call the `onSend` prop if necessary
      onSend(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Install lodash if not installed: npm install lodash

  const sendTypingStatus = debounce(() => {
    if (message?.length > 0) {
      socket.emit("typing", { name: user?.name, projectId });
    }
  }, 500); // Delay of 500ms

  return (
    <div className="flex flex-col flex-grow h-full">
      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 relative">
        <div className="flex items-start mb-4 flex-col">
          {messagesList?.map((m, i) => (
            <MessageCard
              key={m?.id}
              self={m?.sender?.id === user?.id}
              message={m}
            />
          ))}
        </div>
        <button className="fixed bottom-28 right-16 bg-blue-600 text-white px-4 py-2 flex items-center gap-2 rounded-full shadow-lg hover:bg-blue-700 transition">
          New Message <FiChevronDown />
        </button>
      </div>

      {/* Input Box */}
      <div className="flex relative items-center p-4 bg-gray-100 border-t">
        <TypingIndicator typingUsers={typingUsers} />
        <button className="p-2 text-gray-500 hover:text-blue-500">
          <FiPlus size={20} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            sendTypingStatus();
          }}
          className="flex-grow p-2 mx-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-600"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBody;
