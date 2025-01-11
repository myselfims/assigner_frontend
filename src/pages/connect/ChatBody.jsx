import React, { useState } from "react";
import { FiPlus, FiSend } from "react-icons/fi";

const ChatBody = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message Sent:", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="flex items-start mb-4">
          <div className="p-2 bg-blue-600 text-white rounded-md">Hello, how are you?</div>
        </div>
        <div className="flex items-end justify-end mb-4">
          <div className="p-2 bg-gray-200 rounded-md">I'm good, thank you!</div>
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center p-4 bg-gray-100 border-t">
        <button className="p-2 text-gray-500 hover:text-blue-500">
          <FiPlus size={20} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
