import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for Remove User action
import Dropdown from "../../components/Dropdown";
import { LuMessagesSquare } from "react-icons/lu";
import ConfirmModal from "../../components/ConfirmModal";
import Tooltip from "../../components/Tooltip";

const MemberRow = ({ member, roles, onUpdateRole }) => {
  const [selectedRole, setSelectedRole] = useState(member.role);
  const [pendingRole, setPendingRole] = useState(null); // To store the role selected before confirmation
  const [confirmModal, setConfirmModal] = useState(false);

  // Handle dropdown selection
  const handleRoleUpdate = (value) => {
    const role = roles?.find((r) => r?.value === value[0]);
    setPendingRole(role); // Save the pending role
    setConfirmModal(true); // Show confirmation modal
  };

  // Handle confirmation
  const handleConfirm = (isConfirmed) => {
    setConfirmModal(false);
    if (isConfirmed && pendingRole) {
      setSelectedRole(pendingRole.label); // Update the role in UI
      onUpdateRole(member.id, pendingRole.value); // Callback to update role in parent or backend
    }
    setPendingRole(null); // Clear pending role
  };

  return (
    <tr key={member?.id} className="border-b">
      <td className="px-4 py-2">
        <img
          src={member?.avatar}
          alt={member?.name}
          className="w-12 h-12 rounded-full"
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <h1>{member?.name}</h1>
          <p className="text-sm text-gray-500">Frontend Developer</p>
          <a
            href={`mailto:${member?.email}`}
            className="text-blue-600 text-sm hover:underline"
          >
            <AiOutlineMail className="inline-block mr-1" />
            {member?.email}
          </a>
        </div>
      </td>
      <td className="px-4 py-2">
          <div>
            <Dropdown
              allowMultiple={false}
              showCount={false}
              label={selectedRole}
              options={roles}
              onSelect={handleRoleUpdate}
            />
          </div>
      </td>
      <td className="px-4 py-2">{member?.assignedTasksCount}</td>
      <td className="px-4 py-2">
        <div className="flex">
          <button className="bg-blue-600 text-white rounded-lg p-2 hover:opacity-70 flex items-center justify-center mr-2">
            <LuMessagesSquare className="w-[18px] h-[18px] mr-1" />
            Connect
          </button>
          <button
            className="text-red-600 hover:text-red-800 flex items-center"
            onClick={() => handleRemoveUser(member?.id)}
          >
            <FaTrashAlt className="mr-2" />
            Remove
          </button>
        </div>
      </td>
      {confirmModal && (
        <ConfirmModal
          onSelect={handleConfirm}
          message={`Are you sure you want to change the role to "${pendingRole?.label}"?`}
        />
      )}
    </tr>
  );
};

export default MemberRow;
