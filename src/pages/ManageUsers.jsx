import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/features/appGlobalSlice";
import { fetchData, updateData } from "../api";
import Loader from "../components/Loader";
import { setAddUserModal, setUsers } from "../store/features/usersSlice";
import UserRow from "../components/UserRow";
import SearchBar from "../components/SearchBar";
import AddUserModal from "../components/AddUserModal";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import MemberTable from "./team_members/MemberTable";
import { useIsWorkspaceOwner } from "@/customHooks";

const ManageUsers = () => {
  const { confModal } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { users, loading, addUserModal } = useSelector((state) => state.users);
  const isOwner = useIsWorkspaceOwner();

  const search = (query) => {
    fetchData("/users/").then((res) => {
      let searched = res.data.filter((item) => {
        return (
          String(item.name).toLowerCase().includes(query.toLowerCase()) ||
          String(item.email).toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log(searched);
      dispatch(setUsers(searched));
    });
  };

  useEffect(() => {
    dispatch(setCurrentPage("Manage Users"));
    fetchData("/users").then((res) => {
      console.log(res.data);
      dispatch(setUsers(res.data));
    });
  }, []);

  return (
    <div className="w-full">
      <div className="head flex max-sm:flex-col justify-between items-center">
        <h1 className="text-nowrap text-lg">
          <span className="font-semibold">All users </span>
          {users?.length}20
        </h1>
        <div className="flex relative w-full justify-center">
          <div className="flex items-center w-6/12 bg-gray-100 px-3 py-2 rounded-md">
            <AiOutlineSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search team members..."
              className="bg-transparent outline-none w-8/12"
              value={"searchQuery"}
              onChange={(e) => console.log(e)}
            />
          </div>
        </div>

          {isOwner && (
            <button
              // onClick={handleAddMember}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-nowrap"
            >
              <AiOutlineUserAdd className="mr-2" />
              Add Member
            </button>
          )}
      </div>
      <div className="flex flex-col mt-8">
        <MemberTable />
        {users?.length == 0 ? (
          <div className="flex my-10 flex-col w-full items-center justify-center bg-">
            <h1 className="text-2xl font-bold">No records found!</h1>
          </div>
        ) : null}
        {loading ? (
          <div className="flex my-3 justify-center">
            <Loader />
          </div>
        ) : null}
      </div>
      {addUserModal ? <AddUserModal /> : null}
    </div>
  );
};

export default ManageUsers;
