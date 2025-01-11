import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../../store/features/taskDetailsSlice";
import Dropdown from "../../components/Dropdown";
import { AiOutlineSortAscending } from "react-icons/ai";
import { setAlert } from "../../store/features/appGlobalSlice";
import { updateData } from "../../api";

const TaskRow = ({ task }) => {
  const { users } = useSelector((state) => state.users);
  const user = useMemo(
    () => users?.filter((item) => item.id == task?.assignedById)[0],
    [users, task?.assignedById]
  );

  const [item, setItem] = useState(task);
  const dispatch = useDispatch();

  const updateStatus = (status) => {
    status = status[0];
    updateData(`/tasks/${task.id}/`, { status }).then((res) => {
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
    <tr key={item.id} className="hover:bg-slate-100 cursor-pointer relative">
      <td className="text-center py-2">
        <h1>{item?.id}</h1>
      </td>
      <td onClick={() => dispatch(setActiveTask(item))} className="">
        <h1 className="font-semibold">{item?.title}</h1>
      </td>
      <td className="">
        <p>{new Date(item?.deadline).toDateString()}</p>
      </td>
      <td className="">
        <Dropdown
          label={item?.status}
          selectedColor={"bg-white"}
          showCount={false}
          options={[
            { label: "In Progress", value: "in progress" },
            { label: "To Do", value: "to-do" },
            { label: "To Do", value: "to-do" },
          ]}
          onSelect={updateStatus}
          className={'py-[5px]'}
        />
      </td>
      <td className="">
        <div className="flex items-center">
          <img src={user?.avatar} className="w-6 h-6 rounded-full" alt="" />
          <p className="text-center mx-1">{task?.createdBy}</p>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(TaskRow);
