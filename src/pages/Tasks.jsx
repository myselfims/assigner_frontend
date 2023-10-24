import React, { useEffect, useState } from "react";
import { fetchData, getAuthInfo } from "../api";
import TaskRow from "../components/TaskRow";
import { BsSearch } from "react-icons/bs";
import Loader from "../components/Loader";
import Modal from "../components/TaskDetailsModal";
import AddTaskModal from "../components/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTasks } from "../store/features/tasksSlice";
import { setCurrentPage } from "../store/features/appGlobalSlice";
import SearchBar from "../components/SearchBar";
import TaskCard from "../components/TaskCard";

const Tasks = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const detailsModal = useSelector((state) => state.taskDetails.modal);
  const [addtask, setAddTask] = useState(false);

  const handleModal = (task) => {
    setModal(true);
    console.log(task);
    setActiveTask(task);
  };

  const search = (query) => {
    fetchData("/tasks/").then((res) => {
      let searched = res.data.filter((item) => {
        return (
          String(item.title).toLowerCase().includes(query.toLowerCase()) ||
          String(item.description)
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          String(item.assignedById).toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log(searched);
      dispatch(setTasks(searched));
    });
  };

  useEffect(() => {
    console.log(tasks);
    dispatch(setCurrentPage("Tasks"));
    dispatch(setLoading(true));
    fetchData("/tasks/")
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setTasks(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full">
      <div className="head max-sm:flex-col flex justify-between items-center">
        <div className="flex max-sm:w-full items-center justify-between max-sm:mb-3">
          <h1>
            You have total <strong>{tasks?.length}</strong> tasks
          </h1>
          {getAuthInfo().isAdmin ? (
            <button
              onClick={() => setAddTask(true)}
              className="p-2 max-sm:flex hidden right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
            >
              Add task
            </button>
          ) : null}
        </div>
        <div className="flex relative w-full justify-center">
          <div className="taskSearch flex items-center">
            <SearchBar handler={search} />
          </div>
          {getAuthInfo().isAdmin ? (
            <button
              onClick={() => setAddTask(true)}
              className="p-2 max-sm:hidden absolute right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
            >
              Add task
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col my-4">
        <table className="table-auto max-sm:hidden max-sm:text-xs w-full">
          <thead className="static">
            <tr className="bg-blue-100">
              <th className="border-2 border-slate-400 p-2 w-[600px]">Title</th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                Deadline
              </th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                Status
              </th>
              <th className="border-2 border-slate-400  p-2 w-[150px]">
                Created By
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((item) => {
              return (
                <TaskRow handleModal={handleModal} key={item.id} task={item} />
              );
            })}
          </tbody>
        </table>
        <div className="max-sm:flex hidden">
          {tasks?.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
        {loading ? (
          <div className="flex my-3 justify-center">
            <Loader />
          </div>
        ) : null}
      </div>
      {detailsModal ? <Modal /> : null}
      {addtask ? <AddTaskModal setModal={setAddTask} /> : null}
    </div>
  );
};

export default Tasks;
