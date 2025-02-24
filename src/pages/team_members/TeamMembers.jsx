import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineSearch, AiOutlineMail } from "react-icons/ai";
import MemberTable from "./MemberTable";
import AddTeamMemberModal from "./AddTeamMemberModal";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import { useIsWorkspaceOwner } from "@/customHooks";
import { setMembers } from "@/store/features/actionItemsSlice";

const TeamMembers = ({ }) => {
  const dispatch = useDispatch()
  const {members, project} = useSelector(state=>state.actionItems)
  const {currentWorkspace} = useSelector(state=>state.workspaceState)
  const [filteredMembers, setFilteredMember] = useState(members);
  const [addModal, setAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState([])
  const isOwner = useIsWorkspaceOwner();
  const {workspaceId} = useParams()

  // Filtered team members

  useEffect(()=>{
    setFilteredMember(members)
  },[members])

  const handleAddMember = () => {
    setAddModal(true)
  };

  useEffect(()=>{
    dispatch(setCurrentPage('Team Members'))
    fetchData('/global/roles').then((res)=>{
      console.log(res)
      const formattedroles = res.map((role) => ({
        name: role.name,
        value: role.slug || role.id,
        description : role.description,
        id: role.id,
      }));
      setRoles(formattedroles)
    })

  },[])

  
    useEffect(() => {
      console.log("Search Query:", searchQuery);
  
      // Filter items based on multiple criteria
      const filtered = members?.filter((item) => {
        // Convert search query to lowercase for case-insensitive search
        const query = searchQuery.toLowerCase();
  
        // Check if any property matches the search query
        return (
          item?.id?.toString().includes(query) || // Search by ID
          item.name.toLowerCase().includes(query) || // Search by name
          item.email?.toString().includes(query)
        );
      });
      setFilteredMember(filtered);
    }, [searchQuery]);


  return (
    <div className="p-6">
      {/* Project Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{workspaceId ? currentWorkspace?.name : project?.name}</h1>
        {!workspaceId && <p className="text-gray-600">{project?.description}</p>}
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
        <h1 className="mr-8 text-lg"><span className="font-semibold">All users</span> {members?.length}</h1>
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

        </div>
        {isOwner &&
        <button
          onClick={handleAddMember}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <AiOutlineUserAdd className="mr-2" />
          Add Member
        </button>}
      </div>

      <MemberTable roles={roles} filteredMembers={filteredMembers}/>

      {/* No results */}
      {filteredMembers.length === 0 && (
        <div className="text-gray-500 text-center mt-8">No members found</div>
      )}
      {addModal &&
      <AddTeamMemberModal roles={roles} setModal={setAddModal}/>}
    </div>
  );
};

export default TeamMembers;
