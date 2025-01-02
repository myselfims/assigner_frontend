import React from 'react';
import { FiSearch, FiFilter, FiUser } from 'react-icons/fi';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { BsCalendar, BsChevronDown } from 'react-icons/bs';
import { getAuthInfo } from '../../api';

const FilterBar = ({
  search,
  handleDateFilter,
  handleSort,
  handleAssignFilter,
  tasks,
  setAddTask
}) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between bg-white p-4 shadow-md rounded-md">
      {/* Left Section: Task Count */}
      <div className="flex items-center space-x-4">
        <h1 className="flex items-center">
          <strong className="text-xl font-bold mr-2">{tasks?.length}</strong>
          Task{tasks?.length > 1 ? "s" : ""}
        </h1>
      </div>

    

    

        {/* Middle Section: Search and Filters */}

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
              <a className="hover:text-blue-700 text-xs text-slate-700">3 Items in progress</a>
            </div>
          </div>
          <div className="group relative cursor-pointer">
            <div className="w-8 h-8 hover:border-2 border-black bg-red-700 p-2 flex justify-center rounded-full items-center">
              M
            </div>
            <div className="absolute hidden group-hover:flex bg-white shadow-lg rounded-md p-2 flex-col">
              <h1 className="text-sm">Shubham S</h1>
              <a className="hover:text-blue-700 text-xs text-slate-700">3 Items in progress</a>
            </div>
          </div>
        </div>
      </div>
      
        {/* Search Bar */}
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md flex-grow max-w-xs">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search stories..."
            onChange={search}
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

        {/* Sorting Options */}
        <div className="relative">
          <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:shadow-md">
            <AiOutlineSortAscending />
            <span>Sort</span>
            <BsChevronDown />
          </button>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 z-10">
            <button
              onClick={() => handleSort('asc')}
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              <AiOutlineSortAscending className="inline-block mr-2" /> Ascending
            </button>
            <button
              onClick={() => handleSort('desc')}
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              <AiOutlineSortDescending className="inline-block mr-2" /> Descending
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Assigned To Filter */}
      <div className="relative">
        <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:shadow-md">
          <FiUser />
          <span>Assigned To</span>
          <BsChevronDown />
        </button>
        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 z-10">
          <button
            onClick={() => handleAssignFilter('Imran S')}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Imran S
          </button>
          <button
            onClick={() => handleAssignFilter('Shubham S')}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Shubham S
          </button>
        </div>
      </div>

      <div className="mx-2">
      {getAuthInfo()?.isAdmin && (
          <button
            onClick={() => setAddTask(true)}
            className="px-2 h-full py-1 font-bold bg-[#4285F4] text-white rounded hover:opacity-70"
          >
            Add Task
          </button>
        )}
      </div>

    </div>
  );
};

export default FilterBar;
