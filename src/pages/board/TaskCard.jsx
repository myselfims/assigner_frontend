import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TaskCard = ({ task, onDragStart }) => {

  console.log(task)
  return (
    <div
      className="bg-white shadow rounded p-3 cursor-pointer"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex items-center text-xs">
        <Avatar className="w-5 h-5 mr-1">
          <AvatarImage src={''} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{task?.assignedTo?.name}</p>
      </div>
      <h4 className="font-semibold text-sm text-blue-500">{task.title}</h4>
      <p className="text-xs text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskCard;
