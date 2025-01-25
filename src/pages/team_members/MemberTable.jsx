
import { useEffect, useState } from "react";
import { fetchData } from "../../api";
import MemberRow from "./MemberRow";

const MemberTable = ({roles, filteredMembers }) => {


  return (
    <div className="">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Permissions</th>
            <th className="px-4 py-2 text-left">Assigned Tasks</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers?.map((member) => (
            <MemberRow key={member?.id} member={member} roles={roles}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Function to handle the removal of a user (you'll need to implement this logic)
const handleRemoveUser = (id) => {
  console.log(`Removing user with ID: ${id}`);
  // Here you can add logic to remove the user from the project, such as an API call or Redux action.
};

export default MemberTable;
