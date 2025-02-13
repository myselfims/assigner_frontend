import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "./Loader";
import { fetchData } from "../api";

const UserSearchBox = ({ onSelect, allowMultiple = false, passedUsers=null }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(passedUsers?passedUsers : []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef()

  // Handle input change and fetch users
  const handleInputChange = async (event) => {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {

      if (passedUsers){
        const filtered = passedUsers?.filter((item) => {
          // Convert search query to lowercase for case-insensitive search
          const query = searchQuery.toLowerCase();
    
          // Check if any property matches the search query
          return (
            item.name.toString().includes(query) || // Search by ID
            item.email.toLowerCase().includes(query)
          );
        });
        setSelectedUsers(filtered)
      }

      else{
        try {
          setLoading(true);
          const response = await fetchData("/users/", {
            query: event.target.value,
          });
          setLoading(false);
          setUsers(response);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching users:", error);
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
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  // Handle user selection
  const handleSelectUser = (user) => {
    let newList = allowMultiple
      ? [...selectedUsers, user]
      : [user]; // Allow only one user if `allowMultiple` is false

    setSelectedUsers(newList);
    setQuery("");
    setUsers([]);
    onSelect(newList);

    // If single user selection is allowed, hide the input field
    if (!allowMultiple) setQuery("");
  };

  const removeUser = (id) => {
    let removedList = selectedUsers.filter((u) => u.id !== id);
    setSelectedUsers(removedList);
    onSelect(removedList);
  };

  return (
    <div ref={ref} className="relative z-30 flex border p-2 rounded items-center flex-wrap bg-white shadow-sm w-52">
      {selectedUsers.map((user) => (
        <p
          key={user.id}
          className="text-sm mr-1 text-nowrap bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center"
        >
          {user?.name}{" "}
          
            <IoCloseCircleOutline
              onClick={() => removeUser(user.id)}
              className="inline ml-1 cursor-pointer w-4 h-4 text-red-700 hover:text-blue-500"
            />
            
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

      {users.length > 0 && (
        <div className="absolute max-h-40 overflow-y-scroll left-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md w-full z-10">
          {loading ? (
            <div className="flex justify-center text-sm items-center py-2">
              <Loader />
              <p className="ml-2">Fetching...</p>
            </div>
          ) : (
            users
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
                  className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <span className="text-sm text-blue-500 font-medium">
                    Select
                  </span>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchBox;
