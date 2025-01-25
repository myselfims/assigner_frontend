import React from "react";

const TaskCard = ({ task, onDragStart }) => {
  return (
    <div
      className="bg-white shadow rounded p-3 cursor-pointer"
      draggable
      onDragStart={onDragStart}
    >
      <h4 className="font-semibold text-sm">{task.title}</h4>
      <p className="text-xs text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskCard;
