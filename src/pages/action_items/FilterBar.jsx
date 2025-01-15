import React, { useState } from "react";
import { FiSearch, FiFilter, FiUser } from "react-icons/fi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsCalendar, BsChevronDown } from "react-icons/bs";
import { getAuthInfo } from "../../api";
import Dropdown from "../../components/Dropdown";
import {useDispatch, useSelector} from 'react-redux'
import { setSearchQuery, setSelectedStatusOptions } from "../../store/features/actionItemsSlice";
import Button from "../../components/Button";

const FilterBar = ({
  handleDateFilter,
  handleSort,
  handleAssignFilter,
  tasks,
  setAddTask,
}) => {
  const dispatch = useDispatch()
  const {searchQuery} = useSelector(state => state.actionItems) 

  const handleFilterByStatus = (selectedOptions) => {
    dispatch(setSelectedStatusOptions(selectedOptions))
  }

  const handleSearch = (e)=>{
    let query = e.target.value;
    dispatch(setSearchQuery(query))
  }

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
          <div className="flex space-x-4">
            {/* Assigned Users */}
            <div className="group relative cursor-pointer">
              <div className="w-8 h-8 hover:border-2 border-black bg-purple-700 p-2 flex justify-center rounded-full items-center">
                R
              </div>
              <div className="absolute text-nowrap hidden group-hover:flex bg-white shadow-lg rounded-md p-2 flex-col">
                <h1 className="text-sm">Imran S</h1>
                <a className="hover:text-blue-700 text-xs text-slate-700">
                  3 Items in progress
                </a>
              </div>
            </div>
            <div className="group relative cursor-pointer">
              <div className="w-8 h-8 hover:border-2 border-black bg-red-700 p-2 flex justify-center rounded-full items-center">
                M
              </div>
              <div className="absolute text-nowrap hidden group-hover:flex bg-white shadow-lg rounded-md p-2 flex-col">
                <h1 className="text-sm">Shubham S</h1>
                <a className="hover:text-blue-700 text-xs text-slate-700">
                  3 Items in progress
                </a>
              </div>
            </div>
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
        label={"Status"}
        allowMultiple={true}
        options={[
          { label: "In Progress", icon: AiOutlineSortAscending, value : "in progress" },
          { label: "To Do", icon: AiOutlineSortAscending, value : "to-do" }
        
        ]}
        onSelect={handleFilterByStatus}
      />

      <div className="mx-2">
 
          <Button className={'py-1'} onClick={() => setAddTask(true)} > Start Sprint</Button>

      </div>
    </div>
  );
};

export default FilterBar;
