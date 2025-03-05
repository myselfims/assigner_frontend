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
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/globalFunctions";
import { setAlert } from "@/store/features/appGlobalSlice";

const MemberRow = ({ member, roles }) => {
  const [selectedRole, setSelectedRole] = useState(member?.role);
  const { user } = useSelector((state) => state.globalState);
  const { onlineUsers } = useSelector((state) => state.connectState);
  const [pendingRole, setPendingRole] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const { projectId, workspaceId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false); // Fixed delete modal state
  const dispatch = useDispatch()

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
      let url = workspaceId
        ? `/workspaces/${workspaceId}/members/${member?.id}`
        : `/projects/team/${projectId}/${member?.id}`;
      updateData(url, {
        roleId: pendingRole.value,
      }).then((res) => {
        dispatch(
          setAlert({
            alert: true,
            type: "success",
            message: "Successfully updated!",
          })
        );
      });
    } catch (err) {
      console.log(err);
    }
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
    <TableRow className="relative">
      <TableCell>
        <Avatar
          className={`border-[2px] ${
            onlineUsers[member?.id]?.status
              ? "border-green-500"
              : "border-red-500"
          }`}
        >
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
          className={"z-30"}
        />
      </TableCell>
      <TableCell>{member?.taskCounts?.totalTasks}</TableCell>
      <TableCell>
        <h1>
          {onlineUsers[member?.id]?.status ? "Online" : member?.lastActive}
        </h1>
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
