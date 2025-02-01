import React from "react";
import Tooltip from "../../components/Tooltip";

const MessageCard = ({ self = false, message }) => {
  return (
    <div
      className={`flex items-start mb-4 flex-col ${self && "items-end"} w-full my-4`}
    >
      {!self && (
        <div className="text-xs select-none flex my-1 items-center">
          <Tooltip content="online">
            <div className="w-6 h-6 mr-2 border-2 border-green-500 bg-gray-700 text-white flex justify-center items-center rounded-full text-sm font-semibold">
              {message?.sender?.name?.charAt(0).toUpperCase()}
            </div>
          </Tooltip>
          <p className="text-xs font-medium">{message?.sender?.name}</p>
        </div>
      )}
      <div
        className={`p-3 rounded-lg shadow-md ${
          self ? "bg-gray-200 text-black" : "bg-blue-600 text-white"
        } relative`}
      >
        {message?.content}
        {/* Timestamp */}
        <span className="absolute bottom-[-18px] text-nowrap right-1 text-xs text-gray-500">
          2:22 PM
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
