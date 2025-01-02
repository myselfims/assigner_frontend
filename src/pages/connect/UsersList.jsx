import React from "react";

const UsersList = ({ users, setSelectedUser }) => {
  // Function to generate random color
  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-100 border-b"
          onClick={() => setSelectedUser(user)}
        >
          {/* Profile Picture or Placeholder */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold ${
              user.profilePic ? "" : getRandomColor()
            }`}
            style={{
              backgroundImage: user.profilePic ? `url(${user.profilePic})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!user.profilePic && user.name[0].toUpperCase()}
          </div>

          {/* User Details */}
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user.recentMessage || "No recent messages"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
