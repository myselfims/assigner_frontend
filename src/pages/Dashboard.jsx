import React, { useEffect } from "react";

import PieChart from "../components/PieChart";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../store/features/appGlobalSlice";
import { useDispatch } from "react-redux";
import { fetchData } from "../api";
import { setUsers } from "../store/features/usersSlice";
import { setTasks } from "../store/features/tasksSlice";
import { setUser } from "../store/features/userDetailsSlice";

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setCurrentPage('Dashboard'))
    fetchData('/users/').then((res)=>{
      dispatch(setUsers(res.data))
    })
    fetchData('/tasks/').then((res)=>{
      dispatch(setTasks(res.data))
    })
    fetchData('/users/self').then((res)=>{
      dispatch(setUser(res.data))
      console.log(res.data)
    })
  },[])
  
  return (

      <div className="body  py-4 w-full h-full text-black">
        <div className="charts shadow-slate-200 shadow-lg h-fit rounded-[20px] border-2 p-5">
          <div className="">
            <h1 className="font-bold">Activities</h1>
          </div>
          <div >
          </div>
            {/* <PieChart/> */}
        </div>
      </div>

  );
};

export default Dashboard;
