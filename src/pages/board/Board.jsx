import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksAPI, updateTaskStatusAPI } from "./dummyAPIs"; // Dummy API functions
import TaskCard from "./TaskCard";

const Board = () => {
  const { statuses } = useSelector((state) => state.actionItems); // Fetch statuses from Redux store
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      const fetchedTasks = await fetchTasksAPI();
      setTasks(fetchedTasks);
    };

    fetchTasks();

    console.log("board page")
  }, []);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = async (e, statusValue) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, status: statusValue } : task
    );
    setTasks(updatedTasks);

    // Dummy API call to update task status
    await updateTaskStatusAPI(taskId, statusValue);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 flex gap-6 overflow-x-auto h-screen">
      {statuses.map((status) => (
        <div
          key={status.value}
          className="bg-gray-100 rounded-lg p-4 min-w-[300px] flex-1 shadow-md"
          onDrop={(e) => handleDrop(e, status.value)}
          onDragOver={handleDragOver}
        >
          <h3 className="text-lg font-semibold mb-4">{status.name}</h3>
          <div className="flex flex-col gap-3">
            <h1>Hello</h1>
            {tasks
              .filter((task) => task.status === status.value)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
