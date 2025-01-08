import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../../store/features/taskDetailsSlice";
import Dropdown from "../../components/Dropdown";
import { AiOutlineSortAscending } from "react-icons/ai";
import { setAlert } from "../../store/features/appGlobalSlice";
import { updateData } from "../../api";

const TaskRow = ({ task }) => {
  const { users } = useSelector((state) => state.users);
  const user = users?.filter((item) => item.id == item?.assignedById)[0];
  const [item, setItem] = useState(task);
  const dispatch = useDispatch();
  console.log(item)

  const updateStatus = (status) => {
    status = status[0];
    console.log(status);
    updateData(`/tasks/${task.id}/`, {"status" : status}).then((res) => {
      dispatch(
        setAlert({
          alert: true,
          type: "success",
          message: "Successfully updated!",
        })
      )
      setItem({ ...item, status: status });
    });
  };

  return (
    <tr className="hover:bg-slate-100 cursor-pointer">
      <td className=" p-2">
        <h1 className="">{item?.id}</h1>
      </td>
      <td onClick={() => dispatch(setActiveTask(item))} className=" p-2">
        <h1 className="font-semibold">{item?.title}</h1>
      </td>
      <td className=" p-2">
        <p className="">{new Date(item?.deadline).toDateString()}</p>
      </td>
      <td className=" p-2">
        {/* <p className={`text-center border rounded-full ${task.status=='Assigned'?'bg-red-300':task.status=='Done'?'bg-green-300':'bg-yellow-300'}`}>
          {item?.status}
        </p> */}
        <Dropdown
          label={item?.status}
          selectedColor={"bg-white"}
          showCount={false}
          options={[
            { label: "In Progress", value: "in progress" },
            { label: "To Do", value: "to-do" },
            { label: "To Do", value: "to-do" },
          ]}
          onSelect={(e)=>updateStatus(e)}
        />
      </td>
      <td className=" p-2">
        <div className="flex items-center">
          <img src={user?.avatar} className="w-6 h-6 rounded-full" alt="" />
          <p className="text-center mx-1">{user?.name}</p>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
