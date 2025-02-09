import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersList = ({ users, setSelectedUser }) => {
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

  return (
    <div className="overflow-y-scroll h-full">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4  cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100 border-b"
          onClick={() => setSelectedUser(user)}
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
        </div>
      ))}
    </div>
  );
};

export default UsersList;
