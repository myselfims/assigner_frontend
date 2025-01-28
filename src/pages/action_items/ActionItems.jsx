import React, { useEffect, useState } from "react";
import { fetchData, getAuthInfo } from "../../api";
import TaskRow from "./TaskRow";
import noDataImage from "../../assets/no data.png";
import Loader from "../../components/Loader";
import Modal from "./TaskDetailsModal";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import {  setStatuses, setTasks } from "../../store/features/actionItemsSlice";
import { setAlert, setCurrentPage } from "../../store/features/appGlobalSlice";
import { AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import SprintTable from "./SprintTable";
import SprintTableSkeleton from "./skeletons/SprintTableSkeleton";
import AddSprintModal from "./AddSprintModal";
import StatusModal from "./StatusModal";

const ActionItems = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.actionItems);
  const detailsModal = useSelector((state) => state.taskDetails.modal);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentSprint, setCurrentSprint] = useState(null)
  const [addSprintModal, setAddSprintModal] = useState(false)
  const [sprints, setSprints] = useState([])
  const [customStatusModal, setCustomStatusModal] = useState(false)

  const handleModal = (task) => {
    setModal(true);
    console.log(task);
    setActiveTask(task);
  };


  useEffect(() => {
    console.log(getAuthInfo());
    dispatch(setCurrentPage("Action Items"));
    setLoading(true);
  
    const fetchProjectData = async () => { // Renamed to avoid conflict
      try {
        let sprints = await fetchData(`/sprints/project/${projectId}/`);
        let statuses = await fetchData(`/projects/statuses/${projectId}`);
        const formattedStatuses = statuses.map(status => ({
          name : status.name,               // Assuming `name` contains the display name
          // icon: AiOutlineSortAscending,    // Set the icon for all
          value: status.slug || status.id, // Use `slug` or `id` as value
          id : status.id
        }));
        console.log(statuses);
        setSprints(sprints);
        dispatch(setStatuses(formattedStatuses))
        setLoading(false)
      } catch (err) {
        console.log(err);
        dispatch(setAlert({ alert: true, message: err.error, type: "danger" }));
        dispatch(setTasks([]));
      }
    };
  
    fetchProjectData();
  }, [dispatch, projectId]);
  

  return (
    <div className="w-full">
      <div className="head max-sm:flex-col z-40 sticky top-0 flex justify-between items-center w-full">
        <div className="flex max-sm:w-full items-center justify-between max-sm:mb-3">
         
            <button
              onClick={() => setAddSprintModal(true)}
              className="p-2 max-sm:flex hidden right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
            >
              Start Sprint
            </button>

        </div>
        <FilterBar tasks={tasks} setAddTask={setAddSprintModal} setCustomStatusModal={setCustomStatusModal} />
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
        : sprints?.map((sprint, index) => (
          <SprintTable key={sprint.id} sprint={sprint} handleModal={handleModal} setCurrentSprint={setCurrentSprint}/>
          ))}

      <AnimatePresence>
        {detailsModal && <Modal />}
        {addSprintModal && <AddSprintModal setModal={setAddSprintModal} />}
        {customStatusModal && <StatusModal closeModal={()=>setCustomStatusModal(false)}/>}
      </AnimatePresence>
    </div>
  );
};

export default ActionItems;
