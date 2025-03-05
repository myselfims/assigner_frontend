import React, { useState } from "react";
import { FiSearch, FiFilter, FiUser } from "react-icons/fi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsCalendar, BsChevronDown } from "react-icons/bs";
import { getAuthInfo } from "../../api";
import Dropdown from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedStatusOptions,
} from "../../store/features/actionItemsSlice";
// import Button from "../../components/Button";
import { Button } from "../../components/ui/button";
import { useIsWorkspaceOwner } from "@/customHooks";
import { hasPermission } from "@/access/role_permissions";
import { getInitials } from "@/globalFunctions";

const FilterBar = ({
  handleDateFilter,
  setCustomStatusModal,
  tasks,
  setAddTask,
}) => {
  const dispatch = useDispatch();
  const { searchQuery, statuses, role, members } = useSelector(
    (state) => state.actionItems
  );
  const { currentWorkspace } = useSelector((state) => state.workspaceState);
  const { user } = useSelector((state) => state.globalState);
  const isOwner = useIsWorkspaceOwner();

  const handleFilterByStatus = (selectedOptions) => {
    dispatch(setSelectedStatusOptions(selectedOptions));
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="flex z-30 w-full flex-wrap items-center justify-between bg-white p-4 shadow-md rounded-md">
      {/* Left Section: Task Count */}
      <div className="flex items-center space-x-4">
        <h1 className="flex items-center">
          <strong className="font-semibold mr-1">{tasks?.length}</strong>
          Item{tasks?.length > 1 ? "s" : ""}
        </h1>
      </div>

      <div className="flex flex-grow items-center justify-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {/* Assigned Users */}
            {members?.map((m) => (
              <div className="group relative cursor-pointer">
                <div className="w-8 h-8 hover:border-2 border-black text-white bg-purple-700 p-2 flex justify-center rounded-full items-center">
                  {getInitials(m?.name)}
                </div>
                <div className="absolute text-nowrap hidden group-hover:flex bg-white shadow-lg rounded-md p-2 flex-col">
                  <h1 className="text-sm">{m?.name}</h1>
                  {m?.taskCounts && (
                    <>
                      {Object.keys(m?.taskCounts).map((key) => (
                        <>
                          {key.includes("totalTasks") ? (
                            <a className="hover:text-blue-700 text-xs text-slate-700 flex justify-between">
                              Total tasks <span>{m?.taskCounts[key]}</span>
                            </a>
                          ) : (
                            <a className="hover:text-blue-700 text-xs text-slate-700 flex justify-between">
                              {key} <span>{m?.taskCounts[key]}</span>
                            </a>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md flex-grow max-w-xs">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search items..."
            onChange={handleSearch}
            value={searchQuery}
            className="bg-transparent outline-none text-sm flex-grow"
          />
        </div>

        {/* Filter by Date */}
        <div className="flex items-center space-x-2">
          <BsCalendar className="text-gray-500" />
          <input
            type="date"
            onChange={handleDateFilter}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 outline-none"
          />
        </div>
      </div>

      <Dropdown
        name={"Status"}
        allowMultiple={true}
        options={statuses}
        onSelect={handleFilterByStatus}
        children={
          <button
            onClick={() => setCustomStatusModal(true)}
            className="text-center px-4 py-1 text-blue-500 w-full hover:bg-slate-100"
          >
            Custom
          </button>
        }
      />

      <div className="mx-2">
        {(isOwner || hasPermission(role?.name, "create:sprints")) && (
          <Button className="py-1" onClick={() => setAddTask(true)}>
            Start Sprint
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
