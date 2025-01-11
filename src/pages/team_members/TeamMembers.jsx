import React, { useState } from "react";
import { AiOutlineUserAdd, AiOutlineSearch, AiOutlineMail } from "react-icons/ai";
import MemberTable from "./MemberTable";

const TeamMembers = ({ projectName = "Project Alpha" }) => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      email: "john.doe@example.com",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      email: "jane.smith@example.com",
      avatar: "https://via.placeholder.com/50",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filtered team members
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    // Logic to add a member
    alert("Add member logic here!");
  };

  return (
    <div className="p-6">
      {/* Project Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{projectName}</h1>
        <p className="text-gray-600">A detailed view of your project team.</p>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <AiOutlineSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search team members..."
            className="bg-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddMember}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <AiOutlineUserAdd className="mr-2" />
          Add Member
        </button>
      </div>

      <MemberTable filteredMembers={filteredMembers}/>

      {/* No results */}
      {filteredMembers.length === 0 && (
        <div className="text-gray-500 text-center mt-8">No members found</div>
      )}
    </div>
  );
};

export default TeamMembers;
