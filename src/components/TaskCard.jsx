import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../store/features/taskDetailsSlice";

const TaskCard = ({task}) => {
    const {users} = useSelector(state=>state.users)
    const user = users.filter((item)=>item.id==task.assignedById)[0]
    const dispatch = useDispatch()
  return (
    <div onClick={()=>dispatch(setActiveTask(task))}  className="task-card border rounded-md my-4 p-2 w-full">
      <h1 className="font-bold text-xl">{task.title}</h1>
      <div className="flex my-1">
        <img
          src={user.avatar}
          className="w-6 h-6 rounded-full"
          alt=""
        />
        <p className="mx-2 text-slate-600">{user.name}</p>
      </div>
      <div className="flex my-2 justify-between">
        <p>{new Date(task.deadline).toDateString()}</p>
        <p className="text-center border rounded-full p-1">{task.status}</p>
      </div>
    </div>
  );
};

export default TaskCard;
