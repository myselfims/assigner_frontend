import React, { useState } from "react";
import { FiMoreVertical, FiEye, FiTrash, FiMessageSquare } from "react-icons/fi";
import Tooltip from "../../components/Tooltip";
import { formatChatTimestamp } from "../../globalFunctions";
import { BsPinAngleFill, BsPinAngle } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { BsReplyAll } from "react-icons/bs";
import { deleteData, postData } from "../../api"; // Import postData for pinning
import { useParams } from "react-router-dom";

const MessageCard = ({ self = false, message, removeMessage, receiverId }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(message?.isPinned || false); // Track pinned status
  const {projectId} = useParams()

  const deleteMessage = async () => {
    try {
      let res = await deleteData(`/chat/${message?.id}`);
      console.log(res);
      removeMessage(message?.id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const pinMessage = async () => {
    try {
      let res = await postData(`/chat/pin/${message?.id}`, {
        projectId: projectId || null,
        receiverId: receiverId || null,
      });
      console.log(res);
      setIsPinned(true); // Update UI on success
    } catch (error) {
      console.error("Error pinning message:", error);
    }
  };

  return (
    <div className={`flex items-start mb-4 flex-col relative w-full my-4 ${self && "items-end"}`}>
      {/* Sender Info */}
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

      {/* Message Content */}
      <div
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className={`p-3 min-w-28 rounded-lg shadow-md relative ${self ? "bg-gray-200 text-black" : "bg-blue-600 text-white"}`}
      >
        {message?.content}

        {/* Timestamp */}
        <span className="absolute text-nowrap bottom-[-18px] right-1 text-xs text-gray-500">
          {formatChatTimestamp(message?.createdAt)}
        </span>

        {/* Hover Actions */}
        {showOptions && (
          <div className={`absolute -top-8 ${self ? 'right-0' : 'left-0'} flex space-x-2 text-black bg-white p-1 shadow-lg rounded-md`}>
            <button className="p-1 text-xs text-nowrap flex hover:bg-gray-200 rounded">
              12
              <FiEye size={16} title="Seen by Users" className="ml-1" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" onClick={pinMessage}>
              {isPinned ? <BsPinAngleFill size={16} title="Pinned" /> : <BsPinAngle size={16} title="Pin Message" />}
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <BsReplyAll size={16} title="Reply" />
            </button>
            {self && (
              <>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <MdOutlineEdit size={16} title="Edit Message" />
                </button>
                <button onClick={deleteMessage} className="p-1 hover:bg-gray-200 rounded text-red-600">
                  <FiTrash size={16} title="Delete Message" />
                </button>
              </>
            )}

            {/* Three-dot menu */}
            <button className="p-1 hover:bg-gray-200 rounded" onClick={() => setMenuOpen(!menuOpen)}>
              <FiMoreVertical size={16} title="More Actions" />
            </button>
          </div>
        )}
      </div>

      {/* Dropdown Menu on Three-dot Click */}
      {menuOpen && (
        <div className="absolute top-[-30px] right-0 bg-white shadow-lg rounded-md p-2">
          <button className="block text-sm px-2 py-1 hover:bg-gray-100 w-full">Forward</button>
          <button className="block text-sm px-2 py-1 hover:bg-gray-100 w-full">Edit</button>
          <button className="block text-sm px-2 py-1 hover:bg-gray-100 w-full">Translate</button>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
