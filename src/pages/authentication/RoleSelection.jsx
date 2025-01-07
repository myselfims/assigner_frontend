import React, { useState } from "react";
import { FaUser, FaUsers, FaBuilding } from "react-icons/fa"; // React icons for roles
import { postData } from "../../api"; // Assuming you have a postData function for API calls
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: "individual", label: "Individual", icon: <FaUser /> },
    { id: "team", label: "Team", icon: <FaUsers /> },
    { id: "organization", label: "Organization", icon: <FaBuilding /> },
  ];

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    setLoading(true);
    setTimeout(() => {
        setLoading(false)
        navigate('/industry-selection')
    }, 3000);
    // try {
    //   await postData("/api/role-selection", { role }); // Replace with your actual API endpoint
    // //   alert(`Role ${role} selected successfully!`);
    // } catch (error) {
    //   console.error("Error selecting role:", error);
    // //   alert("Failed to select role. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-6">Select Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`flex flex-col items-center justify-center w-48 h-48 p-4 border-2 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ${
              selectedRole === role.id
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleRoleSelect(role.id)}
            disabled={loading}
          >
            <div className="text-4xl mb-3">{role.icon}</div>
            {role.label}
          </button>
        ))}
      </div>
      <div className="h-10">
      {loading && <p className="mt-4 text-blue-500 flex items-center"><Loader className={'mr-2'} />Saving your selection...</p>}

      </div>
    </div>
  );
};

export default RoleSelection;
