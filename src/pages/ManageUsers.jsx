import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/features/appGlobalSlice";
import { fetchData, updateData } from "../api";
import Loader from "../components/Loader";
import { setAddUserModal, setUsers } from "../store/features/usersSlice";
import UserRow from "../components/UserRow";
import SearchBar from "../components/SearchBar";
import AddUserModal from "../components/AddUserModal";
import { AiOutlineUserAdd } from "react-icons/ai";

const ManageUsers = () => {
  const { confModal } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { users, loading, addUserModal } = useSelector((state) => state.users);

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
        <h1>
          You have total <strong>{users.length}</strong> Users
        </h1>
        <div className="flex relative w-full justify-center">
          <SearchBar handler={search} />
          <button
            onClick={() => dispatch(setAddUserModal(true))}
            className="p-2 float-right absolute right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
          >
            <AiOutlineUserAdd />
          </button>

        </div>
      </div>
      <div className="flex flex-col my-4">
        <table className="table-auto max-sm:text-xs w-full">
          <thead>
            <tr className="bg-blue-100">
              <th className="border-2 border-slate-400 p-2 w-[600px]">Name</th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                Email
              </th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                Assigned Tasks
              </th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                isAdmin
              </th>
            </tr>
          </thead>
          <tbody className="overflow-scroll h-40 bg-red">
            {users?.map((item) => {
              return <UserRow key={item.id} user={item} />;
            })}
            
          </tbody>
        </table>
        {users.length==0?
            <div className="flex my-10 flex-col w-full items-center justify-center bg-">
              <img className="w-40 h-40" src={noDataImage}/>

              <h1 className="text-2xl font-bold">No records found!</h1>

            </div>
            :null
          }
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
