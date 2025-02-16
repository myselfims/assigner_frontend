import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import TaskRow from "./TaskRow";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/button";
import TaskCard from "./TaskCard";
import { formatDate } from "../../globalFunctions";
import { FaPlusCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion"; // Import framer-motion
import AddTaskModal from "./AddTaskModal";
import {
  setEditSprintModal,
  setSelectedSprint,
  setTasks,
  updateTask,
} from "../../store/features/actionItemsSlice";

const SprintTable = ({ sprint, handleModal, localTasks }) => {
  const { selectedStatusOptions, searchQuery, tasks } = useSelector(
    (state) => state.actionItems
  );
  const [items, setItems] = useState(localTasks);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [isOpen, setIsOpen] = useState(true); // State to control collapse/expand
  const [addtask, setAddTask] = useState(false);
  const dispatch = useDispatch();

  const updateItem = (id, updatedData) => {
    // Find the tasks associated with the sprintId
    const updatedTasks = { ...tasks };
    const sprintId = sprint?.id;
    console.log(id, sprintId);
    if (updatedTasks[sprintId]) {
      updatedTasks[sprintId] = updatedTasks[sprintId].map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      );
    }

    dispatch(setTasks(updatedTasks));

    setFilteredItems((prevFilteredItems) =>
      prevFilteredItems.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    // Filter items based on selectedStatusOptions
    let filtered = items?.filter(
      (item) =>
        selectedStatusOptions.length === 0 ||
        selectedStatusOptions.includes(parseInt(item.status))
    );

    // Perform any state updates or operations with the filtered items
    setFilteredItems(filtered); // Assuming you have a state like `filteredItems`
  }, [selectedStatusOptions, items]); // Add `items` as a dependency if it can change

  useEffect(() => {
    // Filter items based on multiple criteria
    const filtered = items?.filter((item) => {
      // Convert search query to lowercase for case-insensitive search
      const query = searchQuery.toLowerCase();

      // Check if any property matches the search query
      return (
        item.id.toString().includes(query) || // Search by ID
        item.title.toLowerCase().includes(query) || // Search by title
        item.assignedById?.toString().includes(query) || // Search by assignedById
        item.assignedToId?.toString().includes(query) || // Search by assignedToId
        item.description?.toLowerCase().includes(query) // Search by description (optional)
      );
    });

    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const handleAddItem = () => {
    dispatch(setSelectedSprint(sprint));
    setAddTask(true);
  };

  const toggleTable = () => {
    setIsOpen(!isOpen); // Toggle the open/close state
  };

  const addTask = (task) => {
    setItems([...items, task]);
  };

  return (
    <div className="flex flex-col my-6 px-4 bg-slate-200 rounded-lg border border-gray-300">
      <div className="w-full h-full py-3 font-semibold flex justify-between items-center relative">
        <div className="flex flex-col w-full mx-auto text-start">
          <h1 className="font-semibold">{sprint?.title}</h1>
          <p className="text-sm text-slate-700">{sprint?.description}</p>
        </div>

        {/* Button placed after text content */}
        <Button
          onClick={handleAddItem}
          className="px-1 h-8 bg-white text-black hover:bg-blue-100"
          type="filled"
        >
          <FaPlusCircle className="mr-1" />
          Add Item
        </Button>
        <Button
          onClick={() => {dispatch(setSelectedSprint(sprint)); dispatch(setEditSprintModal(true))}}
          className="px-1 h-8 ml-2 bg-white text-black hover:bg-blue-100"
          type="filled"
        >
          <MdEdit className="" />
          Edit
        </Button>

        {/* Collapsible Icon */}
        <button
          onClick={toggleTable}
          className="ml-4 text-gray-600 hover:text-gray-800"
        >
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
      </div>

      {/* Collapsible Content with Smooth Transition */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ stiffness: 300, duration: 0.1 }}
        className={`overflow-hidden ${isOpen ? "overflow-visible" : ""}`}
      >
        <table className="table-auto max-sm:hidden max-sm:text-xs w-full text-start border border-gray-300">
          <thead className="static rounded-md">
            <tr className="bg-blue-100 border border-b border-gray-300">
              <th className="border-slate-400 w-[0px] text-start"></th>
              <th className="border-slate-400 p-2 w-[20px] text-start">ID</th>
              <th className="border-slate-400 p-2 w-[600px] text-start">
                Title
              </th>
              <th className="border-slate-400 p-2 w-[150px] text-start">
                Deadline
              </th>
              <th className="border-slate-400 p-2 w-[150px] text-start">
                Status
              </th>
              {/* <th className="border-slate-400 p-2 w-[150px] text-start">
                Created By
              </th> */}
              <th className="border-slate-400 p-2 w-[150px] text-start">
                Assigned To
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {[...filteredItems]
              ?.sort((a, b) => a.rank - b.rank) // Sort tasks by rank (ascending order)
              .map((item) => (
                <TaskRow
                  updateItem={updateItem}
                  handleModal={handleModal}
                  key={item.id}
                  task={item}
                />
              ))}
          </tbody>
        </table>

        {items?.length === 0 && !loading ? (
          <div className="flex py-4 flex-col w-full items-center justify-center bg-white">
            <h1 className="text-2xl font-bold">No records found!</h1>
          </div>
        ) : null}

        {/* For Mobile */}
        <div className="max-sm:flex flex-col hidden">
          {filteredItems?.map((task) => {
            return <TaskCard key={task?.id} task={task} />;
          })}
        </div>
      </motion.div>

      {/* For loading indicator */}
      {loading ? (
        <div className="flex my-3 justify-center">
          <Loader />
        </div>
      ) : null}

      <p className="text-sm py-2 text-end text-gray-600">
        Created at {formatDate(sprint.createdAt)}
      </p>
      {addtask && (
        <AddTaskModal setModal={setAddTask} sprint={sprint} addTask={addTask} />
      )}
    </div>
  );
};

export default SprintTable;
