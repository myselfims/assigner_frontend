import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../../store/features/taskDetailsSlice";
import Dropdown from "../../components/Dropdown";
import { AiOutlineSortAscending } from "react-icons/ai";
import { setAlert } from "../../store/features/appGlobalSlice";
import { updateData } from "../../api";
import { GoGrabber } from "react-icons/go";

const TaskRow = ({ task, updateItem }) => {
  const { users } = useSelector((state) => state.users);
  const {statuses, role} = useSelector(state=>state.actionItems)
  const user = useMemo(
    () => users?.filter((item) => item.id == task?.assignedById)[0],
    [users, task?.assignedById]
  );
  console.log(role)

  const [item, setItem] = useState(task);
  const dispatch = useDispatch();

  const updateStatus = (status) => {
    console.log(status[0])
    status = status[0]
    
    updateData(`/tasks/${task.id}/`, { status }).then((res) => {
      updateItem(task?.id, {status})
      dispatch(
        setAlert({
          alert: true,
          type: "success",
          message: "Successfully updated!",
        })
      );
      setItem({ ...item, status });
    });
  };

  return (
    <tr key={item.id} className="hover:bg-slate-100 text-sm  cursor-pointer relative">
      <td>
      <GoGrabber className="text-xl cursor-grabbing"/>
      </td>
      <td className="text-center py-2">
        <h1>{item?.index}</h1>
      </td>
      <td onClick={() => dispatch(setActiveTask(item))} className="">
        <h1 className="font-">{item?.title}</h1>
      </td>
      <td className="text-gray-500 text-sm">
        <p>{new Date(item?.deadline).toDateString()}</p>
      </td>
      <td className="py-2 relative">
        <Dropdown
          name={statuses?.find((s) => s.id == item?.status)?.name}
          selectedColor={"bg-white"}
          showCount={false}
          options={statuses}
          onSelect={updateStatus}
          className={'py-[5px]'}
          disabled={role?.roleId === 4}
        />
      </td>
      {/* <td className="">
        <div className="flex items-center">
          <img src={user?.avatar} className="w-6 h-6 rounded-full" alt="" />
          <p className="text-center mx-1 text-sm">{task?.assignedBy?.name}</p>
        </div>
      </td> */}
      <td className="">
        <div className="flex items-center">
          <img src={user?.avatar} className="w-6 h-6 rounded-full" alt="" />
          <p className="text-center mx-1 text-sm">{task?.assignedTo?.name}</p>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(TaskRow);
