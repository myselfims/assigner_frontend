import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../../store/features/taskDetailsSlice";

const ItemCard = ({ task }) => {
  const { users } = useSelector((state) => state.users);
  const user = users?.filter((item) => item.id === task?.assignedById)[0];
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    // Dispatch an action to update the task status in the store
    // dispatch(updateTaskStatus({ taskId: task.id, status: newStatus }));
  };

  return (
    <div
      onClick={() => dispatch(setActiveTask(task))}
      className="p-4 my-2 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer border border-gray-200"
    >
      {/* Title Section */}
      <h1 className="text-lg font-bold text-gray-800">{task?.title}</h1>
      
      {/* Deadline and Status */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">
          Deadline: {new Date(task?.deadline).toDateString()}
        </p>

        {/* Status Select Dropdown */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className={`px-3 py-1 text-sm rounded-full border ${
            task.status === "Assigned"
              ? "bg-red-200 text-red-700"
              : task.status === "Done"
              ? "bg-green-200 text-green-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      
      {/* Assigned By */}
      <div className="flex items-center mt-4">
        <img
          src={user?.avatar}
          className="w-8 h-8 rounded-full border border-gray-300"
          alt={user?.name}
        />
        <p className="ml-3 text-gray-800 text-sm font-medium">
          Assigned by: {user?.name}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
