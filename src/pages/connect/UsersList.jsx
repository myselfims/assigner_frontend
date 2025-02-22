import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "@/api";

const UsersList = ({ users, setSelectedUser, unreadCounts, setUnreadCounts }) => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  // Function to generate random color
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-600",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleClick = (user) => {
    setSelectedUser(user);
    postData(`/chat/mark-as-read/${user?.id}`).then((res) => {
      console.log(res);
      setUnreadCounts({ ...unreadCounts, [user.id]: null });
    });
    navigate(`/${workspaceId}/connect/${user?.id}`);
  };

  return (
    <div className="overflow-y-scroll h-full">
      {users?.length == 0 && (
        <h1 className="text-center my-4 font-semibold">Users not found!</h1>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className="flex relative items-center p-4  cursor-pointer dark:hover:bg-gray-700 active:bg-gray-200 hover:bg-gray-100 border-b"
          onClick={() => handleClick(user)}
        >
          {/* const isOnline = true; // Change this dynamically based on user status */}
          <Avatar
            className={`cursor-pointer border-[3px] ${
              true ? "border-green-500" : "border-gray-400"
            }`}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* User Details */}
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              {user.recentMessage || "No recent messages"}
            </p>
          </div>
          {unreadCounts && unreadCounts[user?.id] && (
            <span className="absolute right-8 text-xs bg-blue-400 p-1 rounded-full font-semibold w-5 h-5 flex items-center justify-center">
              {unreadCounts[user?.id]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
