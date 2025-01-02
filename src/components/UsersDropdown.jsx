import React, { useState } from 'react';

const UsersDropdown = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (userId) => {
    setIsOpen(false); // Close dropdown
    onChange(userId); // Return the selected user ID
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full text-left"
      >
        Select User
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {/* Search Field */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-300 outline-none"
          />

          {/* User List */}
          <ul className="max-h-40 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelect(user.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {user.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No users found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UsersDropdown;
