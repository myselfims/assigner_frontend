import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "./Loader";
import { fetchData } from "../api";

const UserSearchBox = ({ onSelect, allowMultiple = false, passedUsers = null, selected = [], disabled = false }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(passedUsers ? passedUsers : []);
  const [selectedUsers, setSelectedUsers] = useState(selected);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleInputChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      setOpen(true)
      if (passedUsers) {
        const filtered = passedUsers.filter((item) => {
          const queryLower = searchQuery.toLowerCase();
          return item.name.toLowerCase().includes(queryLower) || item.email.toLowerCase().includes(queryLower);
        });
        setUsers(filtered);
      } else {
        try {
          setLoading(true);
          const response = await fetchData("/users/", { query: searchQuery });
          setUsers(response);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setUsers([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (user) => {
    if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) return;
    const newList = allowMultiple ? [...selectedUsers, user] : [user];
    setSelectedUsers(newList);
    setQuery("");
    setUsers([]);
    onSelect(newList);
    !allowMultiple && setOpen(false);
  };

  const removeUser = (id) => {
    console.log(selectedUsers)
    const updatedList = selectedUsers.filter((u) => u?.id !== id);
    setSelectedUsers(updatedList);
    onSelect([{id : null}]);
    setUsers([...users, passedUsers.find((u)=>u?.id==id)])
    setOpen(true)
  };

  return (
    <div ref={ref} className="relative z-30 flex border p-1 rounded items-center flex-wrap bg-white shadow-sm w-52 h-full">
      {selectedUsers.map((user) => (
        <p key={user.id} className="text-sm mr-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center">
          {user.name}
          {!disabled && (
            <IoCloseCircleOutline
              onClick={() => removeUser(user?.id)}
              className="ml-1 cursor-pointer w-4 h-4 text-red-700 hover:text-blue-500"
            />
          )}
        </p>
      ))}

      {(allowMultiple || selectedUsers.length === 0) && (
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a user..."
          className="outline-none flex-grow bg-transparent text-sm px-2"
        />
      )}

      {open && (
        <div className="absolute max-h-40 overflow-y-scroll left-0 top-full mt-1 bg-white shadow-lg border-gray-200 rounded-md w-full z-10 scrollbar-none">
          {loading ? (
            <div className="flex justify-center text-sm items-center py-2">
              <Loader />
              <p className="ml-2">Fetching...</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <span className="text-sm text-blue-500 font-medium">Select</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchBox;
