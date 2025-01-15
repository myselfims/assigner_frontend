import React from "react";
import { Link } from "react-router-dom";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { AiOutlineDashboard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaTasks } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { LuMessageSquare, LuSettings } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion"; // Importing AnimatePresence and motion

const GenericNavBar = () => {
  const { currentPage, sidebar, auth_info } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -200, opacity: 0 }} // Slide from left and fade in
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        exit={{
          x: 200, // Slide to the right on exit
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="btns my-[60px] h-56 flex text-lg justify-between flex-col"
      >
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/dashboard"}
          className={`flex ${
            currentPage == "Dashboard" ? "font-bold border rounded-xl" : null
          } p-2 items-center`}
        >
          <AiOutlineDashboard className="w-[18px] h-[18px] mr-[20px]" />
          Dashboard
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/projects"}
          className={`flex ${
            currentPage == "Projects" ? "font-bold border rounded-xl" : null
          } p-2 items-center`}
        >
          <FaTasks className="w-[18px] h-[18px] mr-[20px]" />
          Projects
        </Link>
        {auth_info.isAdmin ? (
          <Link
            onClick={() => dispatch(setSidebar(false))}
            to={"/mnjusers"}
            className={`flex ${
              currentPage == "Manage Users"
                ? "font-bold border rounded-xl"
                : null
            } p-2 items-center`}
          >
            <FaUserGear className="w-[18px] h-[18px] mr-[20px]" />
            Manage Users
          </Link>
        ) : null}
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/connect"}
          className={`flex ${
            currentPage == "Connect" ? "font-bold border rounded-xl" : null
          } p-2 items-center`}
        >
          <LuMessageSquare className="w-[18px] h-[18px] mr-[20px]" />
          Connect
        </Link>
        <Link
          onClick={() => dispatch(setSidebar(false))}
          to={"/settings"}
          className={`flex ${
            currentPage == "Settings" ? "font-bold border rounded-xl" : null
          } p-2 items-center`}
        >
          <LuSettings className="w-[18px] h-[18px] mr-[20px]" />
          Settings
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenericNavBar;
