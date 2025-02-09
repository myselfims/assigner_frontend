import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiBell } from "react-icons/bi";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [notiDropdown, setNotiDropdown] = useState(false);

  useEffect(() => {
    fetchData("/notifications").then((res) => setNotifications(res || []));
  }, []);

  return (
    <DropdownMenu open={notiDropdown} onOpenChange={setNotiDropdown}>
      <DropdownMenuTrigger asChild>
        <div className="relative w-[30px] h-[30px] cursor-pointer">
          <BiBell className="w-full h-full p-1 rounded-full hover:bg-slate-200" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 text-xs bg-red-500 p-1 rounded-full w-2 h-2"></span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <DropdownMenuItem key={index} className="border-b">
              <div>
                {notification.text.length > 90
                  ? notification.text.slice(0, 90) + "..."
                  : notification.text}
                <p className="text-xs text-slate-500">{notification.timeAgo}</p>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
