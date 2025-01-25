import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const StatusCard = ({ status, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(status?.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdate(index, { ...status, id:status.value, name: editedName });
  };


  return (
    <li className="flex justify-between py-1 items-center">
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      ) : (
        <span>{editedName}</span>
      )}
      {!status.isDefault && (
        <div className="flex items-center">
          {isEditing ? (
            <FaCheck
              className="w-5 h-5 mr-4 cursor-pointer hover:text-green-500"
              onClick={handleSaveClick}
            />
          ) : (
            <FaEdit
              className="w-5 h-5 mr-4 cursor-pointer hover:text-blue-500"
              onClick={handleEditClick}
            />
          )}
          <MdDelete
            className="w-6 h-6 cursor-pointer hover:text-red-500"
            onClick={() => onDelete(index)}
          />
        </div>
      )}
    </li>
  );
};

export default StatusCard;
