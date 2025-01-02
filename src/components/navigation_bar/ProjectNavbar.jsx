import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTasks, FaUsersCog } from "react-icons/fa";
import { LuMessageSquare, LuSettings, LuClipboard } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";

const ProjectNavBar = () => {
  const { currentPage, sidebar, auth_info } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  //   return () => setIsMounted(false);
  // }, []);

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
        <div className="flex items-start flex-col justify-between p-2 rounded-md bg-slate-700  shadow-md">
          <Link
            to="/projects"
            className="flex items-center text-md font-semibold text-blue-400 hover:text-blue-700"
          >
            <IoIosArrowBack />
            Back
          </Link>
          <h1 className="text-2xl font-semibold">ViziSmart</h1>
        </div>

        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/overview"}
          className={`flex ${
            currentPage === "Overview" ? "font-bold border rounded-xl" : null
          } p-2 items-center transition-all`}
        >
          <AiOutlineDashboard className="w-[20px] h-[20px] mr-[15px]" />
          Overview
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/project/2/action-items"}
          className={`flex ${
            currentPage === "Action Items"
              ? "font-bold border rounded-xl"
              : null
          } p-2 items-center transition-all`}
        >
          <FaTasks className="w-[20px] h-[20px] mr-[15px]" />
          Action Items
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/team-members"}
          className={`flex ${
            currentPage === "Team Members"
              ? "font-bold border rounded-xl"
              : null
          } p-2 items-center transition-all`}
        >
          <FaUsersCog className="w-[20px] h-[20px] mr-[15px]" />
          Team Members
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/chat"}
          className={`flex ${
            currentPage === "Chat Group" ? "font-bold border rounded-xl" : null
          } p-2 items-center transition-all`}
        >
          <LuMessageSquare className="w-[20px] h-[20px] mr-[15px]" />
          Chat Group
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/project/2/calendar"}
          className={`flex ${
            currentPage === "Calendar" ? "font-bold border rounded-xl" : null
          } p-2 items-center transition-all`}
        >
          <IoIosCalendar className="w-[20px] h-[20px] mr-[15px]" />
          Calendar
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/settings"}
          className={`flex ${
            currentPage === "Settings" ? "font-bold border rounded-xl" : null
          } p-2 items-center transition-all`}
        >
          <LuSettings className="w-[20px] h-[20px] mr-[15px]" />
          Settings
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects/reports"}
          className={`flex ${
            currentPage === "Reports" ? "font-bold border rounded-xl" : null
          } p-2 items-center transition-all`}
        >
          <LuClipboard className="w-[20px] h-[20px] mr-[15px]" />
          Reports
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectNavBar;
