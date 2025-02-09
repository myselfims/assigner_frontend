import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTasks, FaUsersCog } from "react-icons/fa";
import { LuMessageSquare, LuSettings, LuClipboard } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import { PiKanbanDuotone } from "react-icons/pi";
import { fetchData } from "../../api";
import {setMembers, setProject, setRole} from "../../store/features/actionItemsSlice"


const ProjectNavBar = () => {
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {project} = useSelector(state => state.actionItems)

  const isActive = (path) => pathname.includes(path);

  useEffect(()=>{
    const fetchProject = async ()=>{
      try{
        let res = await fetchData(`/projects/${projectId}`)
        let members = await fetchData(`/projects/team/${projectId}`)
        let role = await fetchData(`/projects/${projectId}/member/role/`)
        dispatch(setMembers(members))
        console.log(role)
        dispatch(setRole(role))
        dispatch(setProject(res))
      }catch(error){
        console.log(error)
      }
    }
    fetchProject()
  },[projectId])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeInOut" }, // Smooth animation
        }}
        exit={{
          x: 400,
          opacity: 0, // Ensure opacity also transitions to 0 on exit
          transition: { duration: 0.5, ease: "easeInOut" }, // Smooth exit transition
        }}
        className={`btns my-[60px] h-auto flex text-sm justify-between flex-col space-y-4`}
      >
        <div className="flex items-start flex-col justify-between p-2 rounded-md bg-slate-700 shadow-md">
          <Link
            to="/projects"
            className="flex items-center text-md font-semibold text-blue-400 hover:text-blue-700"
          >
            <IoIosArrowBack />
            Back
          </Link>
          <h1 className="text-xl font-semibold">{project?.name}</h1>
        </div>

        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/overview"}
          className={`flex ${
            isActive("/projects/overview") ? "font-bold border rounded-xl" : ""
          } p-2 items-center `}
        >
          <AiOutlineDashboard className="w-[20px] h-[20px] mr-[15px]" />
          Overview
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={`/project/${projectId}/action-items`}
          className={`flex ${
            isActive(`/project/${projectId}/action-items`)
              ? "font-bold border rounded-xl"
              : ""
          } p-2 items-center `}
        >
          <FaTasks className="w-[20px] h-[20px] mr-[15px]" />
          Action Items
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={`/project/${projectId}/board`}
          className={`flex ${
            isActive(`/project/${projectId}/board`)
              ? "font-bold border rounded-xl"
              : ""
          } p-2 items-center `}
        >
          <PiKanbanDuotone className="w-[20px] h-[20px] mr-[15px]" />
          Board
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={`/project/${projectId}/team-members`}
          className={`flex ${
            isActive(`/project/${projectId}/team-members`)
              ? "font-bold border rounded-xl"
              : ""
          } p-2 items-center `}
        >
          <FaUsersCog className="w-[20px] h-[20px] mr-[15px]" />
          Team Members
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={`/project/${projectId}/group-chat`}
          className={`flex ${
            isActive("/group-chat") ? "font-bold border rounded-xl" : ""
          } p-2 items-center `}
        >
          <LuMessageSquare className="w-[20px] h-[20px] mr-[15px]" />
          Group Chat
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={`/project/${projectId}/calendar`}
          className={`flex ${
            isActive(`/project/${projectId}/calendar`)
              ? "font-bold border rounded-xl"
              : ""
          } p-2 items-center `}
        >
          <IoIosCalendar className="w-[20px] h-[20px] mr-[15px]" />
          Calendar
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/settings"}
          className={`flex ${
            isActive("/projects/settings") ? "font-bold border rounded-xl" : ""
          } p-2 items-center `}
        >
          <LuSettings className="w-[20px] h-[20px] mr-[15px]" />
          Activity Logs
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/settings"}
          className={`flex ${
            isActive("/projects/settings") ? "font-bold border rounded-xl" : ""
          } p-2 items-center `}
        >
          <LuSettings className="w-[20px] h-[20px] mr-[15px]" />
          Settings
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/reports"}
          className={`flex ${
            isActive("/projects/reports") ? "font-bold border rounded-xl" : ""
          } p-2 items-center `}
        >
          <LuClipboard className="w-[20px] h-[20px] mr-[15px]" />
          Reports
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectNavBar;
