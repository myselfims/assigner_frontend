import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksAPI, updateTaskStatusAPI } from "./dummyAPIs";
import TaskCard from "./TaskCard";
import { formatDate } from "../../globalFunctions";
import { updateData } from "../../api";
import { setCurrentPage } from "@/store/features/appGlobalSlice";

const Board = () => {
  const { statuses, sprints, tasks } = useSelector(
    (state) => state.actionItems
  ); // Fetch statuses and sprints from Redux store
  const dispatch = useDispatch();

  const [localTasks, setLocalTasks] = useState([]);
  const [currentSprintIndex, setCurrentSprintIndex] = useState(0);

  useEffect(() => {
    dispatch(setCurrentPage('Board'))
    if (sprints.length > 0) {
      setLocalTasks(tasks[sprints[currentSprintIndex].id]);
    }
  }, [currentSprintIndex, sprints, tasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = async (e, statusValue) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = localTasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, status: statusValue } : task
    );
    setLocalTasks(updatedTasks);
    await updateData(`/tasks/${taskId}/`, { status: statusValue }).then(
      (res) => {
        dispatch(
          setAlert({
            alert: true,
            type: "success",
            message: "Successfully updated!",
          })
        );
      }
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const goToPreviousSprint = () => {
    if (currentSprintIndex > 0) {
      setCurrentSprintIndex((prev) => prev - 1);
    }
  };

  const goToNextSprint = () => {
    if (currentSprintIndex < sprints.length - 1) {
      setCurrentSprintIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 flex flex-col scrollbar-none h-full">
      {/* Sprint Navigation */}
      {sprints.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousSprint}
            disabled={currentSprintIndex === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-black">
              {sprints[currentSprintIndex].title}
            </h2>
            <p className="text-gray-600">
              {sprints[currentSprintIndex].description}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(sprints[currentSprintIndex].startDate)} -{" "}
              {formatDate(sprints[currentSprintIndex].endDate)}
            </p>
          </div>

          <button
            onClick={goToNextSprint}
            disabled={currentSprintIndex === sprints.length - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto flex-1">
        {statuses.map((status) => (
          <div
            key={status.value}
            className="bg-gray-200 rounded-lg p-4 min-w-[300px] flex-1 shadow-md"
            onDrop={(e) => handleDrop(e, status.value)}
            onDragOver={handleDragOver}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-4">{status.name}</h3>
              <span className="font-semibold mb-4 border-2 rounded-full w-5 h-5 flex justify-center items-center text-sm text-gray-700">
                {
                  localTasks?.filter(
                    (task) => parseInt(task.status) === parseInt(status.value)
                  ).length
                }
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {localTasks
                ?.filter(
                  (task) => parseInt(task.status) === parseInt(status.value)
                )
                ?.map((task) => (
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
    </div>
  );
};

export default Board;
