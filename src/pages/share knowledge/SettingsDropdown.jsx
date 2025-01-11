import React from "react";

const SettingsDropdown = () => {
  return (
    <div className="settings-dropdown relative">
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        Settings
      </button>
      <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-10">
        <ul className="text-sm">
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            Share Publicly
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            Share in Organization
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            Private Sharing
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            Advanced Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsDropdown;
