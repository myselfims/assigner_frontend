import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import Dropdown from "../../components/Dropdown";
import { LuMessagesSquare } from "react-icons/lu";
import ConfirmModal from "../../components/ConfirmModal";
import { updateData, deleteData } from "../../api"; // Import deleteData function
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";
import { formatDate } from "@/globalFunctions";

const MemberRow = ({ member, roles }) => {
  const [selectedRole, setSelectedRole] = useState(member?.role);
  const { user } = useSelector((state) => state.globalState);
  const [pendingRole, setPendingRole] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const { projectId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false); // Fixed delete modal state

  const handleRoleUpdate = (value) => {
    const role = roles?.find((r) => r?.value === value[0]);
    setPendingRole(role);
    setConfirmModal(true);
  };

  const handleConfirm = (isConfirmed) => {
    setConfirmModal(false);
    if (isConfirmed && pendingRole) {
      setSelectedRole(pendingRole.name);
      onUpdateRole(member.id, pendingRole.value);
    }
    setPendingRole(null);
  };

  const onUpdateRole = () => {
    try {
      updateData(`/projects/team/${projectId}/${member?.id}`, {
        roleId: pendingRole.value,
      }).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveUser = (userId) => {
    setDeleteModal(true);
  };

  const confirmRemoveUser = (isConfirmed) => {
    setDeleteModal(false);
    if (isConfirmed) {
      deleteData(`/projects/team/${projectId}/${member?.id}`)
        .then((res) => {
          console.log("User removed successfully:", res);
          // Optionally, refresh the list or update state to remove the user from UI
        })
        .catch((err) => {
          console.error("Error removing user:", err);
        });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={member?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <h1 className="font-semibold mb-1">{member?.name}</h1>
          <p className="text-[12px] text-gray-500">Frontend Developer</p>
          <a
            href={`mailto:${member?.email}`}
            className="text-blue-600 text-[12px] hover:underline"
          >
            <AiOutlineMail className="inline-block mr-1" />
            {member?.email}
          </a>
        </div>
      </TableCell>
      <TableCell>
        <Dropdown
          allowMultiple={false}
          showCount={false}
          name={selectedRole ? selectedRole : "Not set"}
          options={roles}
          onSelect={handleRoleUpdate}
          disabled={member?.id === user?.id}
        />
      </TableCell>
      <TableCell>{member?.taskCounts?.totalTasks}</TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>{formatDate(member?.createdAt)}</TableCell>
      {confirmModal && (
        <ConfirmModal
          onSelect={handleConfirm}
          open={confirmModal}
          message={`Are you sure you want to change the role to "${pendingRole?.name}"?`}
        />
      )}
      {deleteModal && (
        <ConfirmModal
          onSelect={confirmRemoveUser}
          open={deleteModal}
          message={`Are you sure you want to remove the user "${member.name}" from the project?`}
        />
      )}
    </TableRow>
  );
};

export default MemberRow;
