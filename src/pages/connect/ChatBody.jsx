import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiPlus, FiSend } from "react-icons/fi";
import MessageCard from "./MessageCard";
import { postData } from "../../api";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import TypingIndicator from "./TypingIndicator";
import { debounce } from "lodash";
import { getRoomId } from "@/globalFunctions";
import socketService from "@/api/socket";
import { hasPermission } from "@/access/role_permissions";

// const socket = io("http://localhost:3000"); // Replace with your server URL

const ChatBody = ({ onSend, messages, setMessages, setTypingUsers, setUnreadCounts=null}) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.globalState);
  const {role} = useSelector((state)=>state.actionItems)
  const { projectId, userId } = useParams();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showNewMessageButton, setShowNewMessageButton] = useState(false);
  const [inputRows, setInputRows] = useState(1);
  const socket = socketService.connect();
  const {workspaceId} = useParams()

  const removeMessage = (id) => {
    setMessages(messages?.filter((m) => m.id !== id));
    setMessages(messages?.filter((m) => m.id !== id));
  };

  useEffect(() => {
    // if (!projectId || !userId) return;
    console.log("Joining chat");
    let joiningId;
    if (userId) {
      joiningId = getRoomId(userId, user?.id);
    } else {
      joiningId = projectId;
    }
    console.log("joiningId", joiningId);
    socket.emit("join:chat", joiningId);

    const handleMessage = (newMessage) => {
      console.log("Received:", newMessage);
      let senderId = newMessage?.senderId
      setUnreadCounts && setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [senderId]: (prevCounts?.[senderId] || 0) + 1
      }));
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleTyping = (name) => {
      setTypingUsers((prev) => (!prev.includes(name) ? [...prev, name] : prev));

      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((username) => username !== name));
      }, 3000);
    };

    socket.off("message", handleMessage);
    socket.off("typing", handleTyping);

    socket.on("message", handleMessage);
    socket.on("typing", handleTyping);
    socket.on("all_messages_seen", ()=>{
      console.log('all Messages seen')
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({ ...msg, isRead: true }))
      );
      
    });
    socket.on("message:seen", ({ messageId, userId }) => {
      console.log('Message seen', messageId)
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    });
  

    return () => {
      console.log('Leaving the chat')
      socket.emit("leave:chat", joiningId);
      socket.off("message", handleMessage);
      socket.off("typing", handleTyping);
      socket.off("message:seen" );
      socketService.disconnect();
    };
  }, [projectId, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setShowNewMessageButton(scrollTop + clientHeight < scrollHeight - 50);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const data = {
        type: "text",
        projectId: parseInt(projectId),
        receiverId: parseInt(userId),
        workspaceId: parseInt(workspaceId),
        content: message,
        senderId: user?.id,
        sender: user,
      };

      let res = await postData("/chat", data);
      console.log(res);
      setMessage("");
      onSend(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter → Move to a new line
        setInputRows((prev) => prev + 1);
      } else {
        // Enter (without Shift) → Send message
        e.preventDefault();
        handleSendMessage();
      }
    } else if (e.key === "Backspace") {
      const { selectionStart, selectionEnd, value } = e.target;

      // If entire text is selected (Ctrl+A) and Backspace is pressed, reset to 1 row
      if (selectionStart === 0 && selectionEnd === value.length) {
        setInputRows(1);
      }
      // Reduce rows when deleting a newline at the end
      else if (value.endsWith("\n")) {
        setInputRows((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
      }
    }
  };

  const sendTypingStatus = debounce(() => {
    if (message?.length > 0) {
      socket.emit("typing", { name: user?.name, projectId });
    }
  }, 500);

  const handleSeenMessage = (messageId) => {
    if (!messageId) return;
    console.log('Sending seen update message to room')
    socket.emit("message:seen", {
      messageId,
      roomId: getRoomId(userId, user?.id),
      userId: user?.id,
    });
  };

  return (
    <div className="flex w-full flex-col flex-grow h-full">
      <div
        className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-transparent relative"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <div className="flex items-start mb-4 flex-col">
          {messages?.map((m, i) => (
            <MessageCard
              key={m?.id}
              self={m?.sender?.id === user?.id}
              message={m}
              removeMessage={removeMessage}
              handleSeenMessage={handleSeenMessage}
            />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        {showNewMessageButton && (
          <button
            className="fixed bottom-28 right-16 bg-blue-600 text-white px-4 py-2 flex items-center gap-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            onClick={() =>
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            New Message <FiChevronDown />
          </button>
        )}
      </div>
      <div className="flex relative items-center p-4 dark:bg-gray-900 bg-gray-100 border-t">
        <button className="p-2 text-gray-500 hover:text-blue-500">
          <FiPlus size={20} />
        </button>
        <textarea
          disabled={!hasPermission(role?.name, "send:message")}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            sendTypingStatus();
          }}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 mx-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={inputRows}
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
