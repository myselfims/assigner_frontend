import React, { useEffect, useState } from "react";
import { fetchData, getAuthInfo } from "../../api";
import TaskRow from "./TaskRow";
import noDataImage from "../../assets/no data.png";
import Loader from "../../components/Loader";
import Modal from "./task_details_modal/TaskDetailsModal";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddSprintModal,
  setEditSprintModal,
  setSelectedSprint,
  setSprints,
  setStatuses,
  setTasks,
} from "../../store/features/actionItemsSlice";
import { setAlert, setCurrentPage } from "../../store/features/appGlobalSlice";
import { useParams, useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import SprintTable from "./SprintTable";
import SprintTableSkeleton from "./skeletons/SprintTableSkeleton";
import AddSprintModal from "./AddSprintModal";
import StatusModal from "./StatusModal";
import { setActiveTask } from "@/store/features/taskDetailsSlice";

const ActionItems = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const { tasks, sprints, selectedSprint, addSprintModal, editSprintModal } =
    useSelector((state) => state.actionItems);
  const detailsModal = useSelector((state) => state.taskDetails.modal);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [customStatusModal, setCustomStatusModal] = useState(false);
  const [searchParams] = useSearchParams()
  const selectedItem = searchParams.get('selectedItem');


  useEffect(() => {
    if (selectedItem) {
      let task;
  
      // Iterate through all sprints and find the task
      Object.values(tasks)?.some((sprintTasks) => {
        task = sprintTasks?.find((t) => t.id == selectedItem);
        return task; // Stop iteration if task is found
      });
  
      if (task) {
        dispatch(setActiveTask(task));
      }
    }
  }, [selectedItem, tasks]);
  

  const handleModal = (task) => {
    setModal(true);
    console.log(task);
    setActiveTask(task);
  };

  const updateSprint = (sprintId, updatedData) => {
    let updatedSprints = sprints.map((sprint) =>
      sprint.id === sprintId ? { ...sprint, ...updatedData } : sprint
    );
    dispatch(setSprints(updatedSprints));
  };


  useEffect(() => {
    dispatch(setCurrentPage("Action Items"));
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Fetch sprints and statuses
        let sprints = await fetchData(`/sprints/project/${projectId}/`);
        let statuses = await fetchData(`/projects/statuses/${projectId}`);

        // Format statuses (unchanged)
        const formattedStatuses = statuses.map((status) => ({
          name: status.name,
          value: status.slug || status.id,
          id: status.id,
        }));

        dispatch(setSprints(sprints));
        dispatch(setStatuses(formattedStatuses));

        const tasksResponses = await Promise.all(
          sprints.map(async (sprint) => {
            try {
              return await fetchData(`/sprints/${sprint.id}/tasks/`);
            } catch (error) {
              if (error.response?.status === 404) {
                return []; // Return an empty array if no tasks found
              }
              throw error; // Throw error for other issues (500, 403, etc.)
            }
          })
        );

        // Map tasks to sprint IDs
        const tasksData = sprints.reduce((acc, sprint, index) => {
          acc[sprint.id] = tasksResponses[index];
          return acc;
        }, {});
        console.log(tasksData);

        dispatch(setTasks(tasksData)); // Store all tasks in Redux or state
        setLoading(false);
      } catch (err) {
        console.log(err);
        dispatch(setAlert({ alert: true, message: err.error, type: "danger" }));
        dispatch(setTasks({})); // Reset tasks on error
        setLoading(false);
      }
    };
    console.log(sprints.lenght);
    if (sprints?.lenght == 0 || sprints) {
      fetchProjectData();
    }
  }, [dispatch, projectId]);

  return (
    <div className="w-full">
      <div className="head max-sm:flex-col z-40 sticky top-0 flex justify-between items-center w-full">
        <div className="flex max-sm:w-full items-center justify-between max-sm:mb-3">
          <button
            onClick={() => dispatch(setAddSprintModal(true))}
            className="p-2 max-sm:flex hidden right-0 font-bold bg-[#4285F4] rounded text-white hover:opacity-70"
          >
            Start Sprint
          </button>
        </div>
        <FilterBar
          tasks={tasks}
          setAddTask={() => dispatch(setAddSprintModal(true))}
          setCustomStatusModal={setCustomStatusModal}
        />
      </div>

      <div className="h-full">
        {loading && (
          <>
            <SprintTableSkeleton />
            <SprintTableSkeleton />
          </>
        )}

        {!loading && sprints?.length == 0 && (
          <h1 className="text-3xl select-none font-semibold text-center my-8">
            No records found
          </h1>
        )}

        {loading
          ? Array(3)
              .fill()
              .map((_, index) => <SprintTableSkeleton key={index} />)
          : sprints?.map((sprint) => (
              <SprintTable
                key={sprint.id}
                sprint={sprint}
                handleModal={handleModal}
                localTasks={tasks[sprint.id] || []}
              />
            ))}
      </div>

      {detailsModal && <Modal />}
      {addSprintModal && (
        <AddSprintModal
          addSprint={(sprint) => dispatch(setSprints([...sprints, sprint]))}
          setModal={() => dispatch(setAddSprintModal(false))}
        />
      )}
      {customStatusModal && (
        <StatusModal closeModal={() => setCustomStatusModal(false)} />
      )}

      {selectedSprint && editSprintModal && (
        <AddSprintModal
          selectedSprint={selectedSprint}
          setModal={() => dispatch(setEditSprintModal(false))}
          updatedSprint={updateSprint}
        />
      )}
    </div>
  );
};

export default ActionItems;
