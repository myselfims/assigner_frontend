import React, { useEffect, useState } from "react";
import { FiMoreVertical, FiEye, FiTrash, FiMessageSquare } from "react-icons/fi";
import Tooltip from "../../components/Tooltip";
import { formatChatTimestamp, getInitials } from "../../globalFunctions";
import { BsPinAngleFill, BsPinAngle } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { BsReplyAll } from "react-icons/bs";
import { deleteData, postData, updateData } from "../../api"; // Import postData for pinning
import { useMatch, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import CustomAvatar from "@/components/Avatar";

const MessageCard = ({ self = false, message, removeMessage, receiverId, handleSeenMessage}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(message?.pinned || false); // Track pinned status
  const {projectId} = useParams()
  const isGroupChat = useMatch('/:workspaceId/project/:projectId/group-chat')
  const [edit, setEdit] = useState(false)
  const [messageText, setMessageText] = useState(message?.content)
  const {onlineUsers} = useSelector(state=>state.connectState)
  const isOnline = onlineUsers[message?.sender?.id]?.status

  console.log(onlineUsers)
  console.log('sender', message?.sender?.id)
  console.log('sender', isOnline)

  useEffect(() => {
    if (!self && message && !message.isRead) {
      handleSeenMessage(message.id);
    }
  }, [message]);

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
      setIsPinned(!isPinned); // Update UI on success
    } catch (error) {
      console.error("Error pinning message:", error);
    }
  };

  const handleEdit = ()=>{
    updateData(`/chat/${message?.id}/`, {message : messageText}).then((res)=>{
      setEdit(false)
    })
  }


  return (
    <div className={`flex items-start mb-4 flex-col relative w-full my-4 ${self && "items-end"}`}>
      {/* Sender Info */}
      {!self && isGroupChat && (
        <div className="text-xs select-none flex my-1 items-center">
          <Tooltip content={isOnline}>
            <CustomAvatar className={'w-5 h-5 mr-2 text-xs'} src={message?.sender?.avatar} fallback={getInitials(message?.sender?.name)} />
          </Tooltip>
          <p className="text-xs font-medium">{message?.sender?.name}</p>
        </div>
      )}

      {/* Message Content */}
      <div
        className={`${edit ? 'min-w-96' : 'min-w-28'} max-w-72 text-sm rounded-lg shadow-md relative ${self ? "bg-gray-200 text-black" : "bg-blue-600 text-white"}`}
      >
        {edit?
        <div>
          <input onChange={(e)=>setMessageText(e.target.value)} className="text-black rounded-lg h-full w-full p-2" value={messageText}/>
          <div className="absolute bg-white flex items-center rounded-md mt-1 shadow-md">
          <GiCheckMark onClick={handleEdit} className="p-2 w-8 h-8 hover:text-blue-600 cursor-pointer"/>
          <MdClose onClick={()=>setEdit(false)} className="w-6 h-6 hover:text-red-600 cursor-pointer"/>
          </div>
        </div>
        :
        <div onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)} className="p-2">{messageText}
        
           {/* Hover Actions */}
           {showOptions && (
          <div className={`absolute -top-8 ${self ? 'right-0' : 'left-0'} flex space-x-2 text-black bg-white p-1 shadow-lg rounded-md`}>
            {isGroupChat &&
            <button className="p-1 text-xs text-nowrap flex hover:bg-gray-200 rounded">
              12
              <FiEye size={16} title="Seen by Users" className="ml-1" />
            </button>}
            <button className="p-1 hover:bg-gray-200 rounded" onClick={pinMessage}>
              {isPinned ? <BsPinAngleFill size={16} title="Pinned" /> : <BsPinAngle size={16} title="Pin Message" />}
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <BsReplyAll size={16} title="Reply" />
            </button>
            {self && (
              <>
                <button onClick={()=>setEdit(true)} className="p-1 hover:bg-gray-200 rounded">
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
        }
        {/* Timestamp */}
        <span className="absolute text-nowrap bottom-[-18px] right-1 text-[10px] text-gray-500 flex items-center">
          {formatChatTimestamp(message?.createdAt)}
          {self && (message?.isRead ? <FaRegEye className=" right-1 bottom-1 text-black text-sm ml-1 mt-1 w-3 h-3"/> : <IoCheckmarkDoneSharp className=" right-1 bottom-1 text-black text-sm ml-1 mt-1 w-3 h-3"/>)}
        </span>
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
