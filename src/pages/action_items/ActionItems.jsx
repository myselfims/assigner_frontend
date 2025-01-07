import React, { useEffect, useState } from "react";
import { fetchData, getAuthInfo } from "../../api";
import TaskRow from "./TaskRow";
import noDataImage from "../../assets/no data.png";
import Loader from "../../components/Loader";
import Modal from "./TaskDetailsModal";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTasks } from "../../store/features/tasksSlice";
import { setAlert, setCurrentPage } from "../../store/features/appGlobalSlice";
import { AnimatePresence } from "motion/react";
import TaskCard from "./TaskCard";
import { Link, useParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import ItemCard from "./ItemCard";
import SprintTable from "./SprintTable";
import SprintTableSkeleton from "./skeletons/SprintTableSkeleton";

const ActionItems = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const detailsModal = useSelector((state) => state.taskDetails.modal);
  const [addtask, setAddTask] = useState(false);
  const { auth_info } = useSelector((state) => state.globalState);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleModal = (task) => {
    setModal(true);
    console.log(task);
    setActiveTask(task);
  };

  const search = (query) => {
    fetchData(`/tasks/${projectId}`).then((res) => {
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
    console.log(getAuthInfo());
    dispatch(setCurrentPage("Action Items"));
    setLoading(true);
    fetchData(`/tasks/${projectId}`)
      .then((res) => {
        console.log(res);
        dispatch(setTasks(res));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({ alert: true, message: err.error, type: "danger" }));
        dispatch(setTasks([]));
      });
  }, []);

  return (
    <div className="w-full">
      <div className="head max-sm:flex-col sticky top-0 flex justify-between items-center w-full">
        <div className="flex max-sm:w-full items-center justify-between max-sm:mb-3">
          {auth_info?.user?.isAdmin ? (
            <button
              onClick={() => setAddTask(true)}
              className="p-2 max-sm:flex hidden right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
            >
              Start Sprint
            </button>
          ) : null}
        </div>
        <FilterBar tasks={tasks} setAddTask={setAddTask} />
      </div>

      {loading && (
        <>
          <SprintTableSkeleton />
          <SprintTableSkeleton />
        </>
      )}

      {loading
        ? Array(3)
            .fill()
            .map((_, index) => <SprintTableSkeleton key={index} />)
        : [0]?.map((project, index) => (
          <SprintTable handleModal={handleModal} />
          ))}

      <AnimatePresence>
        {detailsModal && <Modal />}
        {addtask && <AddTaskModal setModal={setAddTask} />}
      </AnimatePresence>
    </div>
  );
};

export default ActionItems;
