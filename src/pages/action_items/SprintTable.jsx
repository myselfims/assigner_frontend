import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getAuthInfo } from "../../api";
import { setAlert, setCurrentPage } from "../../store/features/appGlobalSlice";
import { useParams } from "react-router-dom";
import TaskRow from "./TaskRow";
import noDataImage from "../../assets/no data.png";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import TaskCard from "./TaskCard";
import { formatDate } from "../../globalFunctions";
import { FaPlusCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion"; // Import framer-motion
import AddTaskModal from "./AddTaskModal";

const SprintTable = ({ sprint, handleModal, setCurrentSprint }) => {
  const dispatch = useDispatch();
  const { selectedStatusOptions, searchQuery, statuses } = useSelector(
    (state) => state.actionItems
  );
  const { projectId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [isOpen, setIsOpen] = useState(true); // State to control collapse/expand
  const [addtask, setAddTask] = useState(false);

  useEffect(() => {
    console.log("selectedStatusOptions", selectedStatusOptions);

    // Filter items based on selectedStatusOptions
    let filtered = items?.filter(
      (item) =>
        selectedStatusOptions.length === 0 ||
        selectedStatusOptions.includes(item.status.toLowerCase())
    );

    // Perform any state updates or operations with the filtered items
    setFilteredItems(filtered); // Assuming you have a state like `filteredItems`
  }, [selectedStatusOptions, items]); // Add `items` as a dependency if it can change

  useEffect(() => {
    console.log("Search Query:", searchQuery);

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

  useEffect(() => {
    setLoading(true);
    fetchData(`/sprints/${sprint?.id}/tasks/`)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setLoading(false);
          
          setItems(res);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        const { message } = error.response.data;
        // dispatch(setAlert({ alert: true, message: message, type: "danger" }));
        setLoading(false);
        setItems([]);
      });
  }, []);

  const handleAddItem = () => {
    setCurrentSprint(sprint);
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
          className="py-0 px-1 hover:bg-blue-100"
          type="outlined"
        >
          <FaPlusCircle className="mr-1" />
          Add Item
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
              <th className="border-slate-400 p-2 w-[150px] text-start">
                Created By
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredItems?.map((item) => {
              return (
                <TaskRow handleModal={handleModal} key={item.id} task={item} />
              );
            })}
          </tbody>
        </table>

        {items?.length === 0 && !loading ? (
          <div className="flex py-4 flex-col w-full items-center justify-center bg-white">
            <h1 className="text-2xl font-bold">No records found!</h1>
          </div>
        ) : null}

        {/* For Mobile */}
        <div className="max-sm:flex flex-col hidden">
          {items?.map((task) => {
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
