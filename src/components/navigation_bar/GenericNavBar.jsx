import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { AiOutlineDashboard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaTasks } from "react-icons/fa";
import { LuMessageSquare, LuSettings } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { RxActivityLog } from "react-icons/rx";
import { setCurrentWorkspace, setWorkspaces } from "../../store/features/workspaceSlice";
import { LuUserCog } from "react-icons/lu";
import WorkspaceSelector from "./WorkspaceSelector";
import { CiLock } from "react-icons/ci";
import { fetchData } from "@/api";

const GenericNavBar = () => {
  const { currentPage, auth_info } = useSelector((state) => state.globalState);
  const { workspaces, currentWorkspace } = useSelector((state) => state.workspaceState);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    fetchData('/workspaces').then((res)=>{
      console.log(res)
      dispatch(setWorkspaces(res))
      dispatch(setCurrentWorkspace(res[0]))
    })
  },[])
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
        exit={{ x: 200, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
        className="btns relative my-[60px] flex text-normal justify-between flex-col"
      >
        {/* Workspace Selection Dropdown */}
        <div className="mb-8">
          <WorkspaceSelector workspaces={workspaces} currentWorkspace={currentWorkspace}/>
        </div>


        {!currentWorkspace &&
        <div className="locked flex items-center justify-center absolute top-0 backdrop-blur-md w-full flex-col rounded-lg h-full px-4 text-center">
          <CiLock  className="w-10 h-10" />
          <h1>Create a new workspace to get started.</h1>
        </div>}

        <Link onClick={() => dispatch(setSidebar(false))} to="/dashboard" className={`flex my-2 ${currentPage === "Dashboard" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
          <AiOutlineDashboard className="w-[18px] h-[18px] mr-[20px]" />
          Dashboard
        </Link>
        <Link onClick={() => dispatch(setSidebar(false))} to="/projects" className={`flex my-2 ${currentPage === "Projects" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
          <FaTasks className="w-[18px] h-[18px] mr-[20px]" />
          Projects
        </Link>
        {auth_info.isAdmin && (
          <Link onClick={() => dispatch(setSidebar(false))} to="/mnjusers" className={`flex my-2 ${currentPage === "Manage Users" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
            <LuUserCog className="w-[18px] h-[18px] mr-[20px]" />
            Manage Users
          </Link>
        )}
        <Link onClick={() => dispatch(setSidebar(false))} to="/connect" className={`flex my-2 ${currentPage === "Connect" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
          <LuMessageSquare className="w-[18px] h-[18px] mr-[20px]" />
          Connect
        </Link>
        <Link onClick={() => dispatch(setSidebar(false))} to="/activity-logs" className={`flex my-2 ${currentPage === "Activity Logs" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
          <RxActivityLog className="w-[18px] h-[18px] mr-[20px]" />
          Activity Logs
        </Link>
        {auth_info.isAdmin && (
          <Link onClick={() => dispatch(setSidebar(false))} to="/mnjusers" className={`flex my-2 ${currentPage === "Manage Users" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
            <LuUserCog className="w-[18px] h-[18px] mr-[20px]" />
            Billing & Subscription
          </Link>
        )}
        <Link onClick={() => dispatch(setSidebar(false))} to="/settings" className={`flex my-2 ${currentPage === "Settings" ? "font-bold border rounded-xl" : ""} p-2 items-center`}>
          <LuSettings className="w-[18px] h-[18px] mr-[20px]" />
          Settings
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenericNavBar;
