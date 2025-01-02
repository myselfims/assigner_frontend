import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchData } from "../api";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "./Loader";

const UserSearchBox = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change and fetch users
  const handleInputChange = async (event) => {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {
      // Start fetching after 2 characters
      try {
        setLoading(true);
        const response = await fetchData("/users/", {
          query: event.target.value,
        });
        setLoading(false);
        console.log(response);
        setUsers(response);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    } else {
      setUsers([]);
    }
  };

  // Handle user selection
  const handleSelectUser = (user) => {
    setselectedUsers([...selectedUsers, user]);
    setQuery(""); // Show the selected user's name in the input field
    setUsers([]); // Clear suggestions
    onSelect(selectedUsers); // Pass selected user back to parent component
  };

  const removeUser = (id) => {
    let removedList = selectedUsers?.filter((u) => u.id !== id);
    setselectedUsers(removedList);
  };

  return (
    <div className="flex border p-2 rounded items-center relative select-none flex-wrap">
      {selectedUsers.map((user) => (
        <p className="text-sm mr-1 text-nowrap flex-nowrap bg-gray-200 px-2 rounded-sm flex items-center">
          {user?.name}{" "}
          <IoCloseCircleOutline
            onClick={() => removeUser(user.id)}
            className="inline ml-1 cursor-pointer w-4 h-4"
          />{" "}
        </p>
      ))}

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a user..."
        className="outline-none"
      />
      {users.length > 0 && (
        <div className="suggestions left-0 absolute top-11 bg-gray-200 w-full border-1 border-black">
          {loading && (
            <div className="flex justify-center text-sm items-center mt-2">
              <Loader />
              <p className="ml-2">Fetching...</p>
            </div>
          )}
          {users
            .filter(
              (user) =>
                !selectedUsers.some(
                  (selectedUser) => selectedUser.id === user.id
                )
            )
            .map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="suggestion-item"
              >
                {user.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserSearchBox;
