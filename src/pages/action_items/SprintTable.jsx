import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getAuthInfo } from "../../api";
import { setAlert, setCurrentPage } from "../../store/features/appGlobalSlice";
import { useParams } from "react-router-dom";
import { setTasks } from "../../store/features/tasksSlice";
import TaskRow from "./TaskRow";
import noDataImage from "../../assets/no data.png";
import Loader from "../../components/Loader";
import TaskCard from "./TaskCard";

const SprintTable = ({handleModal}) => {
    const dispatch = useDispatch();
    const {selectedStatusOptions} = useSelector(state => state.tasks)
    const {projectId} = useParams();
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [filteredItems, setFilteredItems] = useState(items)

    useEffect(() => {
      console.log("selectedStatusOptions", selectedStatusOptions);
    
      // Filter items based on selectedStatusOptions
      let filtered = items.filter((item) => 
        selectedStatusOptions.length === 0 || selectedStatusOptions.includes(item.status.toLowerCase())
      );
    
      // Perform any state updates or operations with the filtered items
      setFilteredItems(filtered); // Assuming you have a state like `filteredItems`
    }, [selectedStatusOptions, items]); // Add `items` as a dependency if it can change
    

useEffect(() => {
    console.log(getAuthInfo());
    setLoading(true);
    fetchData(`/tasks/${projectId}`)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setItems(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({alert: true, message : err.error, type:"danger"}))
        setItems([]);
      });
  }, []);


  return (
    <div className="flex flex-col my-6 p-4 bg-slate-200 rounded-lg">
      <table className="table-auto max-sm:hidden max-sm:text-xs w-full text-start">
        <thead className="static rounded-md ">
          <tr>
            <th className="rounded-lg font-semibold" colSpan={6}>
              <div className="w-full h-full font-semibold">
                <h1>Sprint 1</h1>
              </div>
            </th>
          </tr>
          <tr className="bg-blue-100">
            <th className=" border-slate-400 p-2 w-[20px] text-start">Id</th>
            <th className=" border-slate-400 p-2 w-[600px] text-start">
              Title
            </th>
            <th className=" border-slate-400  p-2 w-[150px] text-start">
              Deadline
            </th>
            <th className=" border-slate-400  p-2 w-[150px] text-start">
              Status
            </th>
            <th className=" border-slate-400  p-2 w-[150px] text-start">
              Created By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredItems?.map((item) => {
            return (
              <TaskRow handleModal={handleModal} key={item.id} task={item} />
            );
          })}
        </tbody>
      </table>
      {items?.length == 0 ? (
        <div className="flex my-10 flex-col w-full items-center justify-center bg-">
          <img className="w-40 h-40" src={noDataImage} />

          <h1 className="text-2xl font-bold">No records found!</h1>
        </div>
      ) : null}
      {/* For Mobile */}
      <div className="max-sm:flex flex-col hidden">
        {items?.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
      {/* For Mobile */}
      {loading ? (
        <div className="flex my-3 justify-center">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

export default SprintTable;
