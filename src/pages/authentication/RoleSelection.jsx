import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaBuilding } from "react-icons/fa"; // React icons for roles
import * as Icons from "react-icons/fa"; // React icons for roles
import { fetchData, postData, updateData } from "../../api"; // Assuming you have a postData function for API calls
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([])
  const navigate = useNavigate();


  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  const handleRoleSelect = async (typeId) => {
    setSelectedRole(typeId);
    setLoading(true);
    updateData('/users/self', {accountTypeId : typeId}).then((res)=>{
      setLoading(false)
      console.log(res)
      navigate('/industry-selection')
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
    })
    // try {
    //   await postData("/api/type-selection", { type }); // Replace with your actual API endpoint
    // //   alert(`Role ${type} selected successfully!`);
    // } catch (error) {
    //   console.error("Error selecting type:", error);
    // //   alert("Failed to select type. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(()=>{
    fetchData('/global/account-types').then((res)=>{
      console.log(res)
      setTypes(res)
    })
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-6">Select Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {types.map((type) => (
          <button
            key={type.id}
            className={`flex flex-col items-center justify-center w-48 h-48 p-4 border-2 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ${
              selectedRole === type.id
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleRoleSelect(type.id)}
            disabled={loading}
          >
            <div className="text-4xl mb-3">{getIcon(type.icon)}</div>
            {type.type}
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
