import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../store/features/appGlobalSlice";
import {
  setCurrentWorkspace,
  setWorkspaces,
} from "../../store/features/workspaceSlice";
import { fetchData } from "@/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { LuMessageSquare, LuSettings, LuUserCog } from "react-icons/lu";
import { RxActivityLog } from "react-icons/rx";
import { FaRegCreditCard } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import WorkspaceSelector from "./WorkspaceSelector";

const GenericNavBar = () => {
  const { currentPage, auth_info, user } = useSelector(
    (state) => state.globalState
  );
  const { workspaces, currentWorkspace } = useSelector(
    (state) => state.workspaceState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{
        x: 200,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="w-64 mt-8 h-screen p-4 flex flex-col"
    >
      {/* Workspace Selection */}
      <Card className="mb-4 p-3 shadow-md">
        <WorkspaceSelector
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
        />
      </Card>

      {!currentWorkspace? (
        <div className="flex flex-col items-center justify-center backdrop-blur-md w-full  text-white rounded-lg p-4 text-center">
          <CiLock className="w-10 h-10" />
          <h1 className="text-sm mt-2">
            Create a new workspace to get started.
          </h1>
        </div>
      ) 
      :

      (<div className="space-y-2">
        {[
          { to: "/dashboard", label: "Dashboard", icon: AiOutlineDashboard },
          { to: "/projects", label: "Projects", icon: FaTasks },
          { to: "/connect", label: "Connect", icon: LuMessageSquare },
          { to: "/activity-logs", label: "Activity Logs", icon: RxActivityLog },
          { to: "/settings", label: "Settings", icon: LuSettings },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition  ${
              currentPage === label ? "bg-[#f1f5f9] text-black" : "hover:bg-gray-100 hover:text-slate-700"
            }`}
            
            onClick={() => dispatch(setSidebar(false))}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
        {auth_info.isAdmin && (
          <Link
            to="/mnjusers"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-slate-700 text-black"
            onClick={() => dispatch(setSidebar(false))}
          >
            <LuUserCog className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Manage Users</span>
          </Link>
        )}
        {currentWorkspace?.owner?.id === user?.id && (
          <Link
            to="/billing"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-slate-700 text-white"
            onClick={() => dispatch(setSidebar(false))}
          >
            <FaRegCreditCard className="w-5 h-5" />
            <span className="font-medium">
              Billing & Subscription
            </span>
          </Link>
        )}
      </div>)}

    </motion.div>
  );
};

export default GenericNavBar;
