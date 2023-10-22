import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../store/features/taskDetailsSlice";

const TaskRow = ({ task }) => {
  const {users} = useSelector(state=>state.users)
  const dispatch = useDispatch()

  return (
    <tr onClick={()=>dispatch(setActiveTask(task))} className="hover:bg-slate-100 cursor-pointer">
      <td className="border-2 p-2">
        <h1 className="font-bold">{task.title}</h1>
      </td>
      <td className="border-2 p-2">
        <p className="text-center">{task.deadline}</p>
      </td>
      <td className="border-2 p-2">
        <p className={`text-center border rounded-full bg-${task.status=='Assigned'?'red':task.status=='In Progress'?'yellow':'green'}-300`}>
          {task.status}
        </p>
      </td>
      <td className="border-2 p-2">
        <p className="text-center">{users.filter((item)=>item.id==task.assignedById)[0]?.name}</p>
      </td>
    </tr>
  );
};

export default TaskRow;
