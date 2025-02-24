import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUnreadCount,
  setSelectedUser,
} from "@/store/features/connectSlice";
import { truncateText } from "@/globalFunctions";

const UsersList = ({ users }) => {
  const navigate = useNavigate();
  const { workspaceId, userId } = useParams();
  const dispatch = useDispatch();
  const { unreadCounts, recentMessages, onlineUsers } = useSelector(
    (state) => state.connectState
  );
  const selfUser = useSelector(state => state.globalState.user)

  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
    postData(`/chat/mark-as-read/${user?.id}`).then((res) => {
      console.log(res);
      // setUnreadCounts({ ...unreadCounts, [user.id]: null });
      dispatch(resetUnreadCount(user?.id));
    });
    navigate(`/${workspaceId}/connect/${user?.id}`);
  };

  console.log(unreadCounts);
  console.log(recentMessages);
  console.log(onlineUsers);

  return (
    <div className="overflow-y-scroll h-full">
      {users?.length == 0 && (
        <h1 className="text-center my-4 font-semibold">Users not found!</h1>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className="flex relative overflow-x-hidden items-center p-4  cursor-pointer dark:hover:bg-gray-700 active:bg-gray-200 hover:bg-gray-100 border-b"
          onClick={() => handleClick(user)}
        >
          {/* const isOnline = true; // Change this dynamically based on user status */}
          <Avatar
            className={`cursor-pointer border-[3px] ${
              onlineUsers[user?.id]?.status
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* User Details */}
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              {user?.name} {user?.id === selfUser?.id && <span className="font-light">(You)</span>}
            </h2>
            <p className="text-sm text-gray-500 w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {truncateText(recentMessages[user?.id]?.content, 35) || "No recent messages"}
            </p>
          </div>
          {unreadCounts && unreadCounts[user?.id] > 0 && userId != user?.id && (
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
