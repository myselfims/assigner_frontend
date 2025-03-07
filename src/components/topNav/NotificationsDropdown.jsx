import React, { useEffect, useState } from "react";
import { fetchData, updateData } from "../../api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiBell } from "react-icons/bi";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {formatChatTimestamp} from '../../globalFunctions'
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { setModal } from "@/store/features/appGlobalSlice";

const socket = io("http://localhost:3000");

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [notiDropdown, setNotiDropdown] = useState(false);
  const { user } = useSelector((state) => state.globalState);
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) return; // Ensure user?.id is available

    socket.connect();

    // Join the notification room
    socket.emit("join:notifications", user?.id);

    // Fetch existing notifications from API
    fetchData("/notifications").then((res) =>{
      console.log(res)
      setNotifications(res?.notifications || [])
      setUnreadCount(res?.unread)
    
    });

    // Listen for new notifications
    socket.on("notification", (newNotification) => {
      console.log("Received notification:", newNotification);
      setNotifications([newNotification,...notifications]);
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [user?.id]); // Reconnect when user?.id changes

  const handleClick = (id, redirectUrl)=>{
    updateData(`/notifications/${id}/read`).then((res)=>{
      let notification = res?.notification;
      let updatedData =  notifications?.map((n) =>
        n.id === id ? notification : n
      );
      setNotifications(updatedData)
      setUnreadCount(updatedData.filter((n)=>!n.isRead).length)
    })

    if (redirectUrl) {
      if (redirectUrl.includes("showModal")) {
        const modalName = redirectUrl.split("showModal=")[1];
        console.log(modalName)
        setSearchParams({ showModal: modalName }, { replace: true });
        dispatch(setModal({ modalName: modalName, value: true }));
      } else {
        navigate(redirectUrl);
      }
    }
    
  }


  return (
    <DropdownMenu open={notiDropdown} onOpenChange={setNotiDropdown}>
      <DropdownMenuTrigger asChild>
        <div className="relative w-[30px] h-[30px] cursor-pointer">
          <BiBell className="w-full h-full p-1 rounded-full hover:bg-slate-200" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 text-xs bg-red-500 p-1 rounded-full w-2 h-2"></span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 max-h-96 overflow-y-auto scrollbar-none"
      >
        {notifications?.length > 0 ? (
          notifications?.map((notification, index) => (
            <DropdownMenuItem key={index} className="border-b px-4 py-2">
              <div onClick={()=>handleClick(notification?.id, notification?.redirectUrl)} className="w-full">
                <p className={`${!notification?.isRead && 'font-semibold'}`}>
                  {notification?.message?.length > 90
                    ? notification?.message.slice(0, 90) + "..."
                    : notification?.message}
                </p>
                <p className="text-xs text-slate-500 text-end">
                  {formatChatTimestamp(notification?.createdAt)}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="px-4 py-2 text-center">
            No notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
